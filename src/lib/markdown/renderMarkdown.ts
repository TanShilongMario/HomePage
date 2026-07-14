function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/==([^=]+)==/g, "<mark>$1</mark>");
  out = out.replace(/\+\+([^+]+)\+\+/g, '<span class="sketch-underline">$1</span>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

/** Minimal markdown → HTML for foreword intro copy. */
export function renderMarkdown(source: string): string {
  const blocks = source.trim().split(/\n\n+/);
  const html: string[] = [];

  for (const block of blocks) {
    const lines = block.split("\n");

    if (lines[0].startsWith("### ")) {
      html.push(`<h3>${inlineMarkdown(lines[0].slice(4))}</h3>`);
      continue;
    }
    if (lines[0].startsWith("## ")) {
      html.push(`<h2>${inlineMarkdown(lines[0].slice(3))}</h2>`);
      continue;
    }
    if (lines[0].startsWith("# ")) {
      html.push(`<h1>${inlineMarkdown(lines[0].slice(2))}</h1>`);
      continue;
    }
    if (lines.every((line) => line.startsWith("- "))) {
      const items = lines.map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`).join("");
      html.push(`<ul>${items}</ul>`);
      continue;
    }
    if (lines[0].startsWith("---")) {
      html.push("<hr />");
      continue;
    }

    const paragraph = lines.map((line) => inlineMarkdown(line)).join("<br />");
    html.push(`<p>${paragraph}</p>`);
  }

  return html.join("\n");
}
