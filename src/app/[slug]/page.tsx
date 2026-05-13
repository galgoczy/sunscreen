import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getRelated, getSubpage, subpages } from "@/lib/subpages";

export function generateStaticParams() {
  return subpages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

interface Params {
  params: { slug: string };
}

export function generateMetadata({ params }: Params): Metadata {
  const page = getSubpage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      type: "article",
      url: `/${page.slug}`,
    },
  };
}

export default function SubPage({ params }: Params) {
  const page = getSubpage(params.slug);
  if (!page) notFound();
  const related = getRelated(params.slug);
  return <ArticleLayout page={page} related={related} />;
}
