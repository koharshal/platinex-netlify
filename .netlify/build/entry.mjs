import * as adapter from '@astrojs/netlify/ssr-function.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_D86GFOY1.mjs';

const _page0  = () => import('./chunks/generic_CwdOD5FK.mjs');
const _page1  = () => import('./chunks/index_lvqknTXr.mjs');
const _page2  = () => import('./chunks/_page__DKFsh8qW.mjs');
const _page3  = () => import('./chunks/rss_58vfEjDF.mjs');
const _page4  = () => import('./chunks/index_DjJ2i1H7.mjs');
const _page5  = () => import('./chunks/_.._ClUrnINg.mjs');
const _page6  = () => import('./chunks/index_BUgxFseD.mjs');
const _page7  = () => import('./chunks/index_HvHY1o9-.mjs');const pageMap = new Map([["node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/category/[category]/[page].astro", _page2],["src/pages/rss.xml.ts", _page3],["src/pages/blog/index.astro", _page4],["src/pages/post/[...slug].astro", _page5],["src/pages/tags/index.astro", _page6],["src/pages/tags/[...tag]/index.astro", _page7]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {"middlewareSecret":"86fec988-60ec-4e28-be0a-ee99bc0df706"};

const _exports = adapter.createExports(_manifest, _args);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default, pageMap };
