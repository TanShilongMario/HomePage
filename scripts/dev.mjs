import net from "node:net";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const DEFAULT_PORT = 3001;
const MAX_PORT = 3010;

function probePortInUse(host, port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    socket.setTimeout(400);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.once("error", () => resolve(false));
  });
}

async function isPortAvailable(port) {
  if (await probePortInUse("127.0.0.1", port)) {
    return false;
  }

  if (await probePortInUse("::1", port)) {
    return false;
  }

  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findAvailablePort(start, max) {
  for (let port = start; port <= max; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port between ${start} and ${max}`);
}

function parseExplicitPort(argv) {
  const portFlagIndex = argv.findIndex((arg) => arg === "-p" || arg === "--port");
  if (portFlagIndex !== -1) {
    const value = argv[portFlagIndex + 1];
    if (value && !value.startsWith("-")) {
      return Number(value);
    }
  }

  const portArg = argv.find((arg) => arg.startsWith("--port="));
  if (portArg) {
    return Number(portArg.slice("--port=".length));
  }

  return null;
}

function stripPortArgs(argv) {
  const nextArgs = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "-p" || arg === "--port") {
      i += 1;
      continue;
    }

    if (arg.startsWith("--port=")) {
      continue;
    }

    nextArgs.push(arg);
  }

  return nextArgs;
}

async function resolvePort(argv) {
  const explicitPort = parseExplicitPort(argv);

  if (explicitPort != null) {
    if (!Number.isInteger(explicitPort) || explicitPort <= 0) {
      throw new Error(`Invalid port: ${explicitPort}`);
    }

    if (!(await isPortAvailable(explicitPort))) {
      throw new Error(`Port ${explicitPort} is already in use.`);
    }

    return explicitPort;
  }

  const port = await findAvailablePort(DEFAULT_PORT, MAX_PORT);
  if (port !== DEFAULT_PORT) {
    console.log(
      `Port ${DEFAULT_PORT} is in use, starting dev server on http://localhost:${port} instead.`,
    );
  }

  return port;
}

async function main() {
  const argv = process.argv.slice(2);
  const port = await resolvePort(argv);
  const nextArgs = stripPortArgs(argv);
  const child = spawn(process.execPath, [nextBin, "dev", "-p", String(port), ...nextArgs], {
    cwd: projectRoot,
    stdio: "inherit",
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
