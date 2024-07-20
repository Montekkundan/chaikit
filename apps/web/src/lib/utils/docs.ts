import type { DocAspect, DocType } from "@/types/docs";
import { removeLastS } from "./string";

export const getDocTypeFromSlug = (slug?: string | string[]): DocType | undefined => {
  if (!slug) return undefined;
  if (Array.isArray(slug)) {
    const firstSlug = slug[0];
    return firstSlug ? (removeLastS(firstSlug) as DocType) : undefined;
  }
  const firstPart = slug.split("/")[0];
  return firstPart ? (removeLastS(firstPart) as DocType) : undefined;
};

export const getAspectFromType = (type: DocType): DocAspect => {
  switch (type) {
    case "hook":
    case "component":
      return "video";
    case "page":
    case "template":
    case "block":
      return "page";
    default:
      return "video";
  }
};
