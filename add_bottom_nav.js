const fs = require("fs");
const path = require("path");

const BASE = "E:\\judicial";

const files = [
  "app\\dashboard\\page.js",
  "app\\cases\\new\\page.js",
  "app\\cases\\[id]\\page.js",
  "app\\clients\\page.js",
  "app\\clients\\new\\page.js",
  "app\\settings\\page.js",
];

const IMPORT = `import BottomNav from "@/components/BottomNav";\n`;
const NAV = `      <div className="pb-16 md:pb-0"><BottomNav /></div>\n    </main>`;

for (const f of files) {
  const filePath = path.join(BASE, f);
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("BottomNav")) {
    console.log(`SKIP: ${f} already has BottomNav`);
    continue;
  }

  content = content.replace(/(import .+;\n)/, `$1${IMPORT}`);
  content = content.replace(/\s*<\/main>(\s*)$/, `\n${NAV}\n`);

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`DONE: ${f}`);
}