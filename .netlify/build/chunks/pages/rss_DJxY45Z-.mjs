import rss from '@astrojs/rss';
import { n as getCollection, s as siteConfig } from './__C7OCMbDB.mjs';

async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `post/${post.slug}/`
    }))
  });
}

export { GET };
