import { useEffect } from "react";
import { site } from "@/data/site";

type PageMeta = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

const DEFAULT_IMAGE = "/images/kc/marble-foyer.webp";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

/**
 * Keeps document-level SEO metadata in sync with the current page.
 * Open Graph images are resolved to absolute URLs at runtime so social
 * crawlers receive a complete URL regardless of the deployment domain.
 */
export default function usePageMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
}: PageMeta) {
  useEffect(() => {
    const fullTitle =
      title === site.metaTitle ? title : `${title} | ${site.name}`;
    const url = `${window.location.origin}${window.location.pathname}`;
    const imageUrl = new URL(image, window.location.origin).href;

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", site.name);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:url", url);

    upsertCanonical(url);
  }, [title, description, image, type]);
}
