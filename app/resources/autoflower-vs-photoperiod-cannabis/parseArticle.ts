export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "em"; text: string }
  | { type: "link"; text: string; href: string };

export type ArticleBlock =
  | { type: "p"; lines: Inline[][] }
  | { type: "h2"; inlines: Inline[] }
  | { type: "h3"; inlines: Inline[] }
  | { type: "ul"; items: Inline[][] }
  | { type: "ol"; items: Inline[][] }
  | { type: "table"; headers: Inline[][]; rows: Inline[][][] }
  | { type: "hr" };

function parseInlines(text: string): Inline[] {
  const nodes: Inline[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push({ type: "text", text: text.slice(last, match.index) });
    if (match[1] !== undefined) nodes.push({ type: "link", text: match[1], href: match[2] });
    else if (match[3] !== undefined) nodes.push({ type: "strong", text: match[3] });
    else nodes.push({ type: "em", text: match[4] });
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push({ type: "text", text: text.slice(last) });
  return nodes;
}

function splitRow(line: string): string[] {
  let trimmed = line.trim();
  if (trimmed.startsWith("|")) trimmed = trimmed.slice(1);
  if (trimmed.endsWith("|")) trimmed = trimmed.slice(0, -1);
  return trimmed.split("|").map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const cells = splitRow(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function isStructural(line: string): boolean {
  return (
    line.startsWith("### ") ||
    line.startsWith("## ") ||
    line.startsWith("# ") ||
    line.startsWith("- ") ||
    /^\d+\. /.test(line) ||
    line.trim() === "---" ||
    line.trim().startsWith("|")
  );
}

export function parseArticle(markdown: string): { title: string; blocks: ArticleBlock[] } {
  const lines = markdown.replace(/\r\n/g, "\n").replace(/\n$/, "").split("\n");
  let title = "";
  const blocks: ArticleBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i += 1;
      continue;
    }
    if (line.trim() === "---") {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", inlines: parseInlines(line.slice(4)) });
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", inlines: parseInlines(line.slice(3)) });
      i += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      title = line.slice(2);
      i += 1;
      continue;
    }
    if (line.trim().startsWith("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitRow(line).map(parseInlines);
      i += 2;
      const rows: Inline[][][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && !isTableSeparator(lines[i])) {
        rows.push(splitRow(lines[i]).map(parseInlines));
        i += 1;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }
    if (line.startsWith("- ")) {
      const items: Inline[][] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(parseInlines(lines[i].slice(2)));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(parseInlines(lines[i].replace(/^\d+\. /, "")));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !isStructural(lines[i])) {
      paragraph.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: "p", lines: paragraph.map(parseInlines) });
  }

  if (!title) throw new Error("Article is missing an H1");
  return { title, blocks };
}

function inlineText(nodes: Inline[]): string {
  return nodes.map((node) => node.text).join("");
}

export function articlePlainText(markdown: string): string {
  const { title, blocks } = parseArticle(markdown);
  const parts = [title];
  for (const block of blocks) {
    if (block.type === "hr") continue;
    if (block.type === "h2" || block.type === "h3") parts.push(inlineText(block.inlines));
    else if (block.type === "p") parts.push(block.lines.map(inlineText).join("\n"));
    else if (block.type === "table") {
      parts.push([block.headers, ...block.rows].map((row) => row.map(inlineText).join(" | ")).join("\n"));
    } else parts.push(block.items.map(inlineText).join("\n"));
  }
  return parts.join("\n");
}

export function collectLinks(markdown: string): { text: string; href: string }[] {
  const { blocks } = parseArticle(markdown);
  const links: { text: string; href: string }[] = [];
  const visit = (nodes: Inline[]) => {
    for (const node of nodes) if (node.type === "link") links.push({ text: node.text, href: node.href });
  };
  for (const block of blocks) {
    if (block.type === "h2" || block.type === "h3") visit(block.inlines);
    else if (block.type === "p") block.lines.forEach(visit);
    else if (block.type === "ul" || block.type === "ol") block.items.forEach(visit);
    else if (block.type === "table") {
      block.headers.forEach(visit);
      block.rows.forEach((row) => row.forEach(visit));
    }
  }
  return links;
}
