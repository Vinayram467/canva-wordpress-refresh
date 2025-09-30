const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const CONTENTFUL_CDA_TOKEN = process.env.CONTENTFUL_CDA_TOKEN;
const CONTENTFUL_USE = process.env.CONTENTFUL_USE === 'true';

function isContentfulEnabled() {
  return (
    CONTENTFUL_USE &&
    !!CONTENTFUL_SPACE_ID &&
    !!CONTENTFUL_CDA_TOKEN
  );
}

async function contentfulGraphQL(query, variables = {}) {
  if (!isContentfulEnabled()) {
    throw new Error('Contentful is not enabled');
  }
  const url = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONTENTFUL_CDA_TOKEN}`
    },
    body: JSON.stringify({ query, variables })
  });
  const json = await res.json();
  if (!res.ok || json.errors) {
    const err = json.errors ? JSON.stringify(json.errors) : `${res.status} ${res.statusText}`;
    throw new Error(`Contentful GraphQL error: ${err}`);
  }
  return json.data;
}

module.exports = {
  isContentfulEnabled,
  contentfulGraphQL,
  richTextToPlainText,
};

function richTextToPlainText(node) {
  if (!node) return '';
  if (Array.isArray(node)) return node.map(richTextToPlainText).join(' ');
  const { nodeType, value, content } = node;
  if (typeof value === 'string') return value;
  if (content && Array.isArray(content)) {
    return content.map(richTextToPlainText).join(' ');
  }
  return '';
}


