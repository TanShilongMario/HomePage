import fs from "fs";
import path from "path";

export interface IntroductionContent {
  zh: string;
  en: string;
}

const FOREWORD_DIR = path.join(process.cwd(), "content/foreword");

export function loadIntroduction(): IntroductionContent {
  return {
    zh: fs.readFileSync(path.join(FOREWORD_DIR, "introduction.zh.md"), "utf-8"),
    en: fs.readFileSync(path.join(FOREWORD_DIR, "introduction.en.md"), "utf-8"),
  };
}
