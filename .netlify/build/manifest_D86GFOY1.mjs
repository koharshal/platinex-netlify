import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro_hiSW7D_K.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CiQV3oXf.js"}],"styles":[{"type":"external","src":"/_astro/index.Bt2a4JBL.css"},{"type":"external","src":"/_astro/_slug_.AEaTCOmG.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B0-qMLyI.js"}],"styles":[{"type":"external","src":"/_astro/index.Bt2a4JBL.css"},{"type":"external","src":"/_astro/_slug_.AEaTCOmG.css"}],"routeData":{"route":"/category/[category]/[page]","type":"page","pattern":"^\\/category\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"category","dynamic":false,"spread":false}],[{"content":"category","dynamic":true,"spread":false}],[{"content":"page","dynamic":true,"spread":false}]],"params":["category","page"],"component":"src/pages/category/[category]/[page].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CbqZwwqJ.js"}],"styles":[{"type":"external","src":"/_astro/index.Bt2a4JBL.css"},{"type":"external","src":"/_astro/_slug_.AEaTCOmG.css"}],"routeData":{"route":"/blog","type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DbEK2Nx4.js"}],"styles":[{"type":"external","src":"/_astro/index.Bt2a4JBL.css"},{"type":"external","src":"/_astro/_slug_.AEaTCOmG.css"}],"routeData":{"route":"/post/[...slug]","type":"page","pattern":"^\\/post(?:\\/(.*?))?\\/?$","segments":[[{"content":"post","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/post/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CiQV3oXf.js"}],"styles":[{"type":"external","src":"/_astro/index.Bt2a4JBL.css"},{"type":"external","src":"/_astro/_slug_.AEaTCOmG.css"}],"routeData":{"route":"/tags","type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B0-qMLyI.js"}],"styles":[{"type":"external","src":"/_astro/index.Bt2a4JBL.css"},{"type":"external","src":"/_astro/_slug_.AEaTCOmG.css"}],"routeData":{"route":"/tags/[...tag]","type":"page","pattern":"^\\/tags(?:\\/(.*?))?\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}],[{"content":"...tag","dynamic":true,"spread":true}]],"params":["...tag"],"component":"src/pages/tags/[...tag]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://platinex.in/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/utils/post.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/utils/index.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/components/HeaderLink.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/post/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/category/[category]/[page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/category/[category]/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/tags/[...tag]/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/[...tag]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/components/ListPosts.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Harshal/.cursor/platinex-netlify/src/components/ListRelatedPosts.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_lXUyqvA2.mjs","/src/pages/rss.xml.ts":"chunks/pages/rss_DJxY45Z-.mjs","\u0000@astrojs-manifest":"manifest_D86GFOY1.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CwdOD5FK.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_lvqknTXr.mjs","\u0000@astro-page:src/pages/category/[category]/[page]@_@astro":"chunks/_page__DKFsh8qW.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"chunks/rss_58vfEjDF.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"chunks/index_DjJ2i1H7.mjs","\u0000@astro-page:src/pages/post/[...slug]@_@astro":"chunks/_.._ClUrnINg.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"chunks/index_BUgxFseD.mjs","\u0000@astro-page:src/pages/tags/[...tag]/index@_@astro":"chunks/index_HvHY1o9-.mjs","C:/Users/Harshal/.cursor/platinex-netlify/src/content/blog/electroplating process 101.mdx?astroContentCollectionEntry=true":"chunks/electroplating process 101_D16oJBbZ.mjs","C:/Users/Harshal/.cursor/platinex-netlify/src/content/blog/electroplating process 101.mdx?astroPropagatedAssets":"chunks/electroplating process 101_8eTY8bHX.mjs","C:/Users/Harshal/.cursor/platinex-netlify/src/content/blog/electroplating process 101.mdx":"chunks/electroplating process 101_BbVk2j5x.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CbqZwwqJ.js","/astro/hoisted.js?q=1":"_astro/hoisted.DbEK2Nx4.js","C:/Users/Harshal/.cursor/platinex-netlify/node_modules/.pnpm/@pagefind+default-ui@1.3.0/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.CKIkl_th.js","/astro/hoisted.js?q=2":"_astro/hoisted.B0-qMLyI.js","/astro/hoisted.js?q=3":"_astro/hoisted.CiQV3oXf.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/PCB_copper_layer_electroplating_machine.B4dNSRKw.jpg","/_astro/banner.BelI91fy.jpg","/_astro/Platinex Email Footer Logo.zGknNUTH.png","/_astro/_slug_.AEaTCOmG.css","/_astro/index.Bt2a4JBL.css","/demo.gif","/favicon.png","/favicon.svg","/open-graph.png","/openblog-lighthouse-score.svg","/project.png","/robots.txt","/admin/index.html","/fonts/Manrope-Bold.woff2","/fonts/Manrope-ExtraBold.woff2","/fonts/Manrope-ExtraLight.woff2","/fonts/Manrope-Light.woff2","/fonts/Manrope-Medium.woff2","/fonts/Manrope-Regular.woff2","/fonts/Manrope-SemiBold.woff2","/_astro/hoisted.B0-qMLyI.js","/_astro/hoisted.CbqZwwqJ.js","/_astro/hoisted.CiQV3oXf.js","/_astro/hoisted.DbEK2Nx4.js","/_astro/ui-core.CKIkl_th.js"]});

export { manifest };
