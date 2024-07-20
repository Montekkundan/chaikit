import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import type { TableOfContents } from "@/types/toc";
import type { Node, Parent } from "unist";

const textTypes = ["text", "emphasis", "strong", "inlineCode"] as const;

function flattenNode(node: Node): string {
  const p: string[] = [];
  visit(node, (node: Node) => {
    if (!textTypes.includes(node.type as typeof textTypes[number])) return;
    p.push((node as any).value);
  });
  return p.join(``);
}

function getItems(node: Node | Parent | undefined, current: any): TableOfContents {
  if (!node) {
    return {};
  }

  if (node.type === "paragraph") {
    visit(node, (item: Node) => {
      if (item.type === "link") {
        current.url = (item as any).url;
        current.title = flattenNode(node);
      }

      if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === "list") {
    current.items = (node as any).children.map((i: Node) => getItems(i, {}));

    return current;
  } else if (node.type === "listItem") {
    const heading = getItems((node as any).children[0], {});

    if ((node as any).children.length > 1) {
      getItems((node as any).children[1], heading);
    }

    return heading;
  }

  return {};
}

const getToc = () => (node: Node, file: any) => {
  const table = toc(node as any);
  const items = getItems(table.map as Node | undefined, {});

  file.data = items;
};

export async function getTableOfContents(content: string): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return result.data as TableOfContents;
}
