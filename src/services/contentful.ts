export async function fetchContentful(query: string, variables: Record<string, any> = {}, preview = false) {
  const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const env = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
  const token = preview
    ? import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.VITE_CONTENTFUL_CDA_TOKEN;
  if (!space || !token) throw new Error('Missing Contentful env vars');
  const url = `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${env}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(`Contentful error: ${JSON.stringify(json.errors || res.statusText)}`);
  return json.data;
}

export type CFNewsItem = {
  sys: { id: string };
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  excerpt?: string | null;
  heroImage?: { url: string } | null;
  publishedAt?: string | null;
};

export async function fetchLatestNewsCards(limit = 3): Promise<{
  _id: string; title: string; image?: string; excerpt?: string; publishedAt?: string;
}[]> {
  const data = await fetchContentful(
    `query($limit:Int!){
      newsArticleCollection(limit:$limit, order:[publishedAt_DESC]){
        items{ sys{ id } title excerpt heroImage{ url } publishedAt }
      }
    }`,
    { limit }
  );
  const items: CFNewsItem[] = data?.newsArticleCollection?.items || [];
  return items.map(it => ({
    _id: it.sys.id,
    title: it.title,
    image: it.heroImage?.url,
    excerpt: it.excerpt || undefined,
    publishedAt: it.publishedAt || undefined,
  }));
}


