import { prependForwardSlash } from '@astrojs/internal-helpers/path';
/* empty css                          */
import { A as AstroError, I as InvalidImageService, E as ExpectedImageOptions, a as ExpectedImage, c as createAstro, b as createComponent, d as ImageMissingAlt, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, r as renderTemplate, f as renderComponent, F as Fragment, U as UnknownContentCollectionError, g as renderUniqueStylesheet, h as renderScriptElement, i as createHeadAndContent, u as unescapeHTML, j as renderSlot, k as renderHead, l as defineScriptVars } from '../astro_hiSW7D_K.mjs';
import 'reading-time';
import { clsx } from 'clsx';
import 'kleur/colors';
/* empty css                           */
import { twMerge } from 'tailwind-merge';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_DO4MHcjt.mjs';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '@astrojs/netlify/image-service.js'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$d = createAstro("https://platinex.in/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/components/Image.astro", void 0);

const $$Astro$c = createAstro("https://platinex.in/");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"@astrojs/netlify/image-service.js","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///C:/Users/Harshal/.cursor/platinex-netlify/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const siteConfig = {
  // Write here your website url
  author: "Platinex Industries Private Limited",
  // Site author
  title: "Platinex Industries - Best Electroplating Service in India",
  // Site title.
  description: "Copper, Zinc, Tin, Nickel & Silver Plating service for components in Electrical, Automobile, Capacitor and Electronics Industries. ",
  // Message to share a post on social media
  paginationSize: 6
  // Number of posts per page
};

const $$Astro$b = createAstro("https://platinex.in/");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/node_modules/.pnpm/astro@4.0.8_typescript@5.9.2/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$a = createAstro("https://platinex.in/");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { title, description = siteConfig.description, ogImage, articleDate } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const socialImageURL = new URL(ogImage ? ogImage : "/open-graph.png", Astro2.url).href;
  const titleSeparator = "\u2022";
  const siteTitle = `${title} ${titleSeparator} ${siteConfig.title}`;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/png" href="/favicon.png"><link rel="shortcut icon" type="image/png" href="/favicon.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Fonts: Inter (body) and Montserrat (headings) --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet"><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${siteTitle}</title><!-- ViewTransitions  -->${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}<!-- SEO --><meta name="title"${addAttribute(siteTitle, "content")}><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(siteConfig.author, "content")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(articleDate ? "article" : "website", "content")}><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(socialImageURL, "content")}>${articleDate && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<meta property="article:author"${addAttribute(siteConfig.author, "content")}><meta property="article:published_time"${addAttribute(articleDate, "content")}>` })}`}<!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image"${addAttribute(socialImageURL, "content")}><!-- RSS auto-discovery --><link rel="alternate" type="application/rss+xml"${addAttribute(siteConfig.title, "title")} href="/rss.xml">`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/BaseHead.astro", void 0);

function sluglify(text) {
  return text.replace(/\s+/g, "-");
}
function unsluglify(text) {
  return text.replace(/-/g, " ");
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://platinex.in/", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection **${collection}** does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/electroplating process 101.mdx": () => import('../electroplating process 101_D16oJBbZ.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"electroplating-process-101":"/src/content/blog/electroplating process 101.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/electroplating process 101.mdx": () => import('../electroplating process 101_8eTY8bHX.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection$1 = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const CATEGORIES = [
  "Electroplating Process",
  "Quality Control",
  "Industry Insights",
  "Technical Guides",
  "Company News",
  "Case Studies",
  "Equipment & Technology",
  "Sustainability & Compliance"
];

const getCategories = async () => {
  const posts = await getCollection$1("blog");
  const categories = new Set(
    posts.filter((post) => !post.data.draft).map((post) => post.data.category)
  );
  return Array.from(categories).sort(
    (a, b) => CATEGORIES.indexOf(a) < CATEGORIES.indexOf(b) ? -1 : 1
  );
};
const getPosts = async (max) => {
  return (await getCollection$1("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, max);
};
const getTags = async () => {
  const posts = await getCollection$1("blog");
  const tags = /* @__PURE__ */ new Set();
  posts.filter((post) => !post.data.draft).forEach((post) => {
    post.data.tags.forEach((tag) => {
      if (tag != "") {
        tags.add(tag.toLowerCase());
      }
    });
  });
  return Array.from(tags);
};
const getPostByTag = async (tag) => {
  const posts = await getPosts();
  const lowercaseTag = tag.toLowerCase();
  return posts.filter((post) => !post.data.draft).filter((post) => {
    return post.data.tags.some((postTag) => postTag.toLowerCase() === lowercaseTag);
  });
};

const $$Astro$9 = createAstro("https://platinex.in/");
const $$HeaderLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(cn(isActive ? "text-opacity-100" : "text-opacity-60", className), "class")} rel="noopener noreferrer "${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/HeaderLink.astro", void 0);

const $$MenuIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M4 6l16 0"></path> <path d="M4 12l16 0"></path> <path d="M4 18l16 0"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/MenuIcon.astro", void 0);

const $$SearchIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg aria-label="search" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"> <path stroke="none" d="M0 0h24v24H0z"></path> <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/SearchIcon.astro", void 0);

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "site-search", "site-search", { "id": "search", "class": "ms-auto" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-open-modal class="flex items-center justify-center rounded-md gap-1"> ${renderComponent($$result, "SearchIcon", $$SearchIcon, {})} <!-- <span class='md:hidden text-2xl'> Search</span> --> </button> <dialog aria-label="search" class="h-full max-h-full w-full max-w-full border border-zinc-400 bg-white dark:bg-[#0a0910ec] shadow backdrop:backdrop-blur sm:mx-auto sm:mb-auto sm:mt-16 sm:h-max sm:max-h-[calc(100%-8rem)] sm:min-h-[15rem] sm:w-5/6 sm:max-w-[48rem] sm:rounded-md opacity-0"> <div class="dialog-frame flex flex-col gap-4 p-6 pt-12 sm:pt-6"> <button data-close-modal class="ms-auto cursor-pointer rounded-full bg-black text-white px-4 py-2 dark:bg-white dark:text-black">Close</button> <div class="search-container dark:text-white"> <div id="pagefind__search"></div> </div> </div> </dialog> ` })}  `;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Search.astro", void 0);

const $$SunIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun-high" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path> <path d="M6.343 17.657l-1.414 1.414"></path> <path d="M6.343 6.343l-1.414 -1.414"></path> <path d="M17.657 6.343l1.414 -1.414"></path> <path d="M17.657 17.657l1.414 1.414"></path> <path d="M4 12h-2"></path> <path d="M12 4v-2"></path> <path d="M20 12h2"></path> <path d="M12 20v2"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/SunIcon.astro", void 0);

const $$MoonIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/MoonIcon.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$ToggleTheme = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3([" ", " <script>\n	const button = document.getElementById('toggle-theme')\n\n	function setButtonPresssed() {\n		const bodyThemeIsDark = document.documentElement.classList.contains('dark')\n		button.setAttribute('aria-pressed', String(bodyThemeIsDark))\n	}\n	setButtonPresssed()\n<\/script>"])), renderComponent($$result, "theme-toggle", "theme-toggle", { "class": "relative h-6 w-6" }, { "default": () => renderTemplate` ${maybeRenderHead()}<button id="toggle-theme" class="group" aria-label="Toggle Theme"> <span class="absolute left-0 right-0 top-0 opacity-0 group-aria-pressed:opacity-100"> ${renderComponent($$result, "SunIcon", $$SunIcon, {})} </span> <span class="absolute left-0 right-0 top-0 opacity-0 group-aria-[pressed=false]:opacity-100"> ${renderComponent($$result, "MoonIcon", $$MoonIcon, {})} </span> </button> ` }));
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/ToggleTheme.astro", void 0);

const logoImage = new Proxy({"src":"/_astro/Platinex Email Footer Logo.zGknNUTH.png","width":500,"height":95,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$PlatinexLogo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-2"> <img${addAttribute(logoImage.src, "src")} alt="Platinex Industries Logo" class="h-8 w-auto object-contain"> </div>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/PlatinexLogo.astro", void 0);

const $$LinkedinIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!--?xml version="1.0" encoding="UTF-8" standalone="no"?-->${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="w-8 md:w-6" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <g transform="translate(-4,-3.5)"> <path d="M 20.499,11 C 17.708,11 17.228,12.018 17,13 v -2 h -4 v 14 h 4 v -8 c 0,-1.297 0.703,-2 2,-2 1.266,0 2,0.688 2,2 v 8 h 4 v -7 c 0,-4 -0.521,-7 -4.501,-7 z"></path> <rect height="14" width="4" x="7" y="11"></rect> <circle cx="9" cy="8" r="2"></circle> </g> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/LinkedinIcon.astro", void 0);

const $$WhatsappIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"> <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path> <path d="M17 10.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-3.8.9"></path> <path d="M10.5 17a8.38 8.38 0 0 1-3.8-.9 8.5 8.5 0 0 1 .9-3.8"></path> <path d="M17 10.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-3.8.9"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/WhatsappIcon.astro", void 0);

const $$LocationIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/LocationIcon.astro", void 0);

const SOCIALNETWORKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/platinex/",
    icon: $$LinkedinIcon
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/918600146841",
    icon: $$WhatsappIcon
  },
  {
    name: "Location",
    url: "#contact",
    icon: $$LocationIcon
  }
];

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="relative flex items-center h-16 font-semibold bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border-b border-stone-200 dark:border-white/10 px-6"> <a class="text-base md:text-lg mr-auto hover:text-accent transition-colors" href="/"> ${renderComponent($$result, "PlatinexLogo", $$PlatinexLogo, {})} </a> <a class="text-base md:text-lg ml-6 hover:text-accent transition-colors" href="/blog">Blog</a> <div id="astro-header-drawer" class="shadow rounded-l-lg md:bg-transparent dark:md:bg-transparent bg-white dark:bg-[#0a0910] md:shadow-none md:rounded-none md:border-none md:h-auto md:static absolute transition-transform duration-300 ease-in translate-x-96 md:translate-x-0 top-16 -right-5 pl-4 pt-6 pb-4 md:p-0 h-[200px] w-[200px] z-50"> <nav class="flex h-full flex-col justify-between gap-12 text-left md:flex-row md:w-full md:gap-5"> <div class="flex flex-col gap-4 md:flex-row md:border-r border-stone-200 dark:border-white/10 pr-4"> <!-- Tags link removed as requested --> </div> <div class="flex justify-center items-center md:justify-end gap-3 md:p-0"> ${SOCIALNETWORKS.map((network) => renderTemplate`${renderComponent($$result, "HeaderLink", $$HeaderLink, { "class": "hover:text-accent transition-colors", "href": network.url, "target": "_blank", "aria-label": network.name }, { "default": ($$result2) => renderTemplate` <span>${renderTemplate`${renderComponent($$result2, "network.icon", network.icon, {})}`} </span> ` })}`)} </div> </nav> </div> <div class="flex items-center gap-3 md:pl-3" data-astro-transition-persist="navbar"> <div> ${renderComponent($$result, "Search", $$Search, {})} </div> ${renderComponent($$result, "ToggleTheme", $$ToggleTheme, {})} <button id="astro-header-drawer-button" type="button" class="md:ml-6 md:hidden"> ${renderComponent($$result, "MenuIcon", $$MenuIcon, {})} <span class="sr-only">Show Menu</span> </button> </div> </header> `;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Header.astro", "self");

const $$PlatinexFooterLogo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center gap-2"> <img${addAttribute(logoImage.src, "src")} alt="Platinex Industries Logo" class="h-8 w-auto object-contain"> </div>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/PlatinexFooterLogo.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const today = /* @__PURE__ */ new Date();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-stone-50 dark:bg-stone-900/50 border-t border-stone-200 dark:border-white/10"> <div class="max-w-6xl mx-auto px-6 py-12"> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <!-- Company Info --> <div class="space-y-4"> ${renderComponent($$result, "PlatinexLogo", $$PlatinexFooterLogo, {})} <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
Leading electrical, switchgear and automobile plating service provider in India,
					delivering quality and precision since inception.
</p> </div> <!-- Contact Information --> <div class="space-y-4"> <h3 class="font-heading font-semibold text-lg text-stone-900 dark:text-white">
Contact Us
</h3> <div class="space-y-3 text-sm"> <div class="flex items-start gap-3"> ${renderComponent($$result, "LocationIcon", $$LocationIcon, { "class": "w-5 h-5 text-accent mt-0.5 flex-shrink-0" })} <div> <p class="text-stone-900 dark:text-white font-medium">Platinex Industries</p> <p class="text-stone-600 dark:text-stone-400">Plot no. 156/3,</p> <p class="text-stone-600 dark:text-stone-400">Ambad-Vilholi MIDC Link Road,</p> <p class="text-stone-600 dark:text-stone-400">Vilholi, Nashik - 422010</p> </div> </div> <div class="flex items-center gap-3"> <div class="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0"> <span class="text-white text-xs">@</span> </div> <a href="mailto:platinexindustries@gmail.com" class="text-stone-600 dark:text-stone-400 hover:text-accent transition-colors">
platinexindustries@gmail.com
</a> </div> <div class="flex items-center gap-3"> ${renderComponent($$result, "WhatsappIcon", $$WhatsappIcon, { "class": "w-5 h-5 text-accent flex-shrink-0" })} <a href="tel:+918600146841" class="text-stone-600 dark:text-stone-400 hover:text-accent transition-colors">
(+91) 8600146841
</a> </div> </div> </div> <!-- Social Links --> <div class="space-y-4"> <h3 class="font-heading font-semibold text-lg text-stone-900 dark:text-white">
Connect With Us
</h3> <div class="flex gap-4"> <a href="https://www.linkedin.com/company/platinex/" target="_blank" class="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-accent hover:text-white transition-all duration-200"> ${renderComponent($$result, "LinkedinIcon", $$LinkedinIcon, { "class": "w-5 h-5" })} </a> <a href="https://wa.me/918600146841" target="_blank" class="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-accent hover:text-white transition-all duration-200"> ${renderComponent($$result, "WhatsappIcon", $$WhatsappIcon, { "class": "w-5 h-5" })} </a> <a href="#contact" class="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg hover:bg-accent hover:text-white transition-all duration-200"> ${renderComponent($$result, "LocationIcon", $$LocationIcon, { "class": "w-5 h-5" })} </a> </div> </div> </div> <!-- Bottom Bar --> <div class="border-t border-stone-200 dark:border-white/10 mt-8 pt-8 text-center"> <p class="text-stone-500 dark:text-stone-400 text-sm">
&copy; ${today.getFullYear()} Platinex Industries. All rights reserved.
</p> </div> </div> </footer>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Footer.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$ProviderTheme = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<script>\n	function getTheme() {\n		const storedTheme = typeof localStorage !== 'undefined' && localStorage.getItem('theme')\n\n		return (\n			storedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')\n		)\n	}\n\n	function setTheme(newTheme) {\n		const html = document.documentElement\n		const isDark = newTheme === 'dark'\n\n		html.classList.toggle('dark', isDark)\n		html.classList.toggle('light', !isDark)\n\n		localStorage.setItem('theme', newTheme)\n	}\n\n	// set initial theme\n	setTheme(getTheme())\n	document.addEventListener('astro:after-swap', () => setTheme(getTheme()))\n\n	document.addEventListener('theme-change', (e) => {\n		setTheme(e.detail.theme)\n	})\n<\/script>"])));
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/ProviderTheme.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$ProviderAnimations = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>\n	if (!('animations' in localStorage)) {\n		localStorage.setItem('animations', 'true')\n	} else {\n		localStorage.setItem('animations', 'false')\n	}\n<\/script>"])));
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/ProviderAnimations.astro", void 0);

const $$TwSizeIndicator = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${process.env.NODE_ENV === "development" && renderTemplate`${maybeRenderHead()}<div class="fixed top-0 left-0 z-50 flex w-[30px] items-center justify-center bg-gray-200 py-[2.5px] text-[12px] uppercase text-black sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200 2xl:bg-pink-200"><span class="block sm:hidden">all</span><span class="hidden sm:block md:hidden">sm</span><span class="hidden md:block lg:hidden">md</span><span class="hidden lg:block xl:hidden">lg</span><span class="hidden xl:block 2xl:hidden">xl</span><span class="hidden 2xl:block">2xl</span></div>`}`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/TwSizeIndicator.astro", void 0);

const $$EditBlog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${process.env.NODE_ENV === "development" && renderTemplate`${maybeRenderHead()}<a${addAttribute(`http://localhost:4321/admin/index.html`, "href")} target="_blank" class="fixed bottom-5 right-5 z-50 flex w-[120px] border-2 border-gray-500 rounded-full items-center justify-center py-[2.5px] font-bold text-[12px] uppercase text-black bg-white shadow-2xl">
Edit in CMS
</a>`}`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/editBlog.astro", void 0);

const $$Astro$8 = createAstro("https://platinex.in/");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, image, articleDate } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth" data-astro-cid-37fxchfa> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "ogImage": image, "articleDate": articleDate, "data-astro-cid-37fxchfa": true })}${renderComponent($$result, "ProviderTheme", $$ProviderTheme, { "data-astro-cid-37fxchfa": true })}${renderComponent($$result, "ProviderAnimations", $$ProviderAnimations, { "data-astro-cid-37fxchfa": true })}${renderHead()}</head> <body class="bg-white text-stone-950 dark:bg-[#0a0910] dark:text-white" data-astro-cid-37fxchfa> <main class="px-5 sm:mx-auto sm:max-w-2xl sm:px-8 lg:px-0 antialiased md:max-w-6xl grid gap-12 mt-4 overflow-hidden md:overflow-visible" data-astro-cid-37fxchfa> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-37fxchfa": true })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-37fxchfa": true })} </main> ${renderComponent($$result, "TwSizeIndicator", $$TwSizeIndicator, { "data-astro-cid-37fxchfa": true })} ${renderComponent($$result, "EditBlog", $$EditBlog, { "data-astro-cid-37fxchfa": true })}  </body> </html>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/layouts/BaseLayout.astro", void 0);

const $$CheckIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg class="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M5 12l5 5l10 -10"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/CheckIcon.astro", void 0);

const $$Astro$7 = createAstro("https://platinex.in/");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time class="text-sm font-bold text-opacity-60"${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/FormattedDate.astro", void 0);

const $$Astro$6 = createAstro("https://platinex.in/");
const $$Tag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Tag;
  const { tag } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/tags/${encodeURIComponent(tag.toLowerCase())}`, "href")}${addAttribute(tag, "aria-label")}> <span class="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent rounded-lg hover:bg-accent/20 dark:hover:bg-accent/30 transition-colors duration-200 border border-accent/20 dark:border-accent/30"> ${tag ?? "Blog Tag"} </span> </a>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Tag.astro", void 0);

const $$Astro$5 = createAstro("https://platinex.in/");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { data, readTime, headings, id } = Astro2.props;
  const { title, description, pubDate, heroImage, tags } = data;
  const articleDate = pubDate.toISOString();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "image": heroImage?.src, "articleDate": articleDate }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"> <article class="min-w-full"> <!-- Hero Header --> <header class="mb-8 text-center"> <div class="mb-6"> <div class="flex items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-6"> <span class="flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": pubDate })} </span> <span class="w-1 h-1 bg-stone-400 rounded-full"></span> <span class="flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ${readTime} read
</span> </div> <h1 class="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4 text-stone-900 dark:text-white font-heading"> ${title} </h1> <p class="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed"> ${description} </p> </div>  <div class="flex flex-wrap justify-center items-center gap-2 gap-y-2"> ${tags.map((tag) => renderTemplate`${renderComponent($$result2, "Tag", $$Tag, { "tag": tag })}`)} </div> </header>  ${heroImage && renderTemplate`<div class="mb-8"> ${renderComponent($$result2, "Image", $$Image, { "src": heroImage, "width": 1e3, "height": 500, "quality": 100, "format": "jpg", "loading": "eager", "class": "rounded-xl w-full max-h-[400px] md:max-h-[500px] object-cover shadow-lg", "alt": `Hero image for ${title}` })} </div>`}  <div class="prose prose-stone dark:prose-invert max-w-none prose-headings:text-stone-900 prose-headings:dark:text-white prose-p:text-stone-700 prose-p:dark:text-stone-300 prose-a:text-accent prose-a:dark:text-accent prose-strong:text-stone-900 prose-strong:dark:text-white prose-p:mb-3 prose-headings:mb-4 prose-h2:font-heading prose-h3:font-heading prose-h4:font-heading prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg"> ${renderSlot($$result2, $$slots["default"])} </div> </article> </div> ` })}`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/layouts/BlogPost.astro", void 0);

const disqusConfig = {
  enabled: false,
  shortname: ""
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", '<div class="mx-auto px-6 sm:px-6 max-w-3xl pt-8 md:pt-4 pb-12 md:pb-20"> <div id="disqus_thread"></div> <script>(function(){', "\n		var d = document,\n			s = d.createElement('script')\n		s.src = 'https://' + shortname + '.disqus.com/embed.js'\n		s.setAttribute('data-timestamp', String(new Date()))\n		s.setAttribute('data-theme', localStorage.getItem('theme') ?? 'light') // Pass the string value directly\n		;(d.head || d.body).appendChild(s)\n\n		// document.addEventListener('theme-change', (e) => {\n		//   todo: reload disqus\n		// })\n	})();<\/script> </div>"])), maybeRenderHead(), defineScriptVars({ shortname: disqusConfig.shortname }));
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Disqus.astro", void 0);

const $$Astro$4 = createAstro("https://platinex.in/");
const $$ListRelatedPosts = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ListRelatedPosts;
  const { posts } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(cn(`flex flex-col md:flex-row sm:justify-between gap-8`), "class")}> ${posts.length > 0 ? posts.map((post) => {
    return renderTemplate`<div class="flex flex-wrap gap-2"> <div class="min-h-full"> ${renderComponent($$result, "Image", $$Image, { "src": post.data.heroImage, "width": 200, "height": 200, "format": "webp", "class": "w-16 h-16 object-cover rounded-full  ", "alt": `img of ${post.data.title}` })} </div> <header class="flex justify-center items-center"> <a class="font-medium  hover:underline"${addAttribute(`/post/${post.slug}/`, "href")}> ${post.data.title} </a> </header> </div>`;
  }) : renderTemplate`<span class="text-gray-500">There are no related posts yet. 😢</span>`} </section>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/ListRelatedPosts.astro", void 0);

const $$Astro$3 = createAstro("https://platinex.in/");
const $$TabletOfContentsHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TabletOfContentsHeading;
  const { heading } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="flex flex-col"> <a${addAttribute("#" + heading.slug, "href")} class="text-sm py-1 transition-colors duration-200 first-letter:uppercase text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"> ${heading.text} </a> ${heading.subheadings.length > 0 && renderTemplate`<ul class="ml-3 mt-1 space-y-0.5"> ${heading.subheadings.map((subheading) => renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, { "heading": subheading })}`)} </ul>`} </li>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/TabletOfContentsHeading.astro", void 0);

const $$Astro$2 = createAstro("https://platinex.in/");
const $$TableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TableOfContents;
  const { headings } = Astro2.props;
  const toc = buildToc(headings);
  function buildToc(headings2) {
    let toc2 = [];
    let parentHeadings = /* @__PURE__ */ new Map();
    headings2.forEach((h) => {
      let heading = { ...h, subheadings: [] };
      parentHeadings.set(heading.depth, heading);
      if (heading.depth === 1 || heading.depth === 2) {
        toc2.push(heading);
      } else {
        parentHeadings.get(heading.depth - 1).subheadings.push(heading);
      }
    });
    return toc2;
  }
  return renderTemplate`${maybeRenderHead()}<nav class="space-y-3"> <h3 class="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
Contents
</h3> <ul class="space-y-1"> ${toc.map((heading) => renderTemplate`${renderComponent($$result, "TableOfContentsHeading", $$TabletOfContentsHeading, { "heading": heading })}`)} </ul> </nav>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/TableOfContents.astro", void 0);

const $$CopyIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path> <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/CopyIcon.astro", void 0);

const $$Code = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<pre class="shiki shiki-themes relative bg-neutral-200/30 dark:shadow-2xl code"><button aria-label="copy-button" class="copy-button absolute  z-20 top-2 right-2  rounded-md transition-all ease-in max-w-full max-h-fit dark:text-gray-600 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400">${renderComponent($$result, "CopyIcon", $$CopyIcon, {})}</button><span class="check-span absolute z-10 top-2 right-2  rounded-md transition-all ease-in opacity-0 text-green-600 dark:text-green-400 max-w-full max-h-fit ">${renderComponent($$result, "CheckIcon", $$CheckIcon, {})}</span>${renderSlot($$result, $$slots["default"])}</pre> `;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/mdx/Code.astro", void 0);

const $$Astro$1 = createAstro("https://platinex.in/");
const $$SButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SButton;
  const props = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${spreadAttributes(props)} class="bg-purple-800 p-4 text-white rounded-full"> ${renderSlot($$result, $$slots["default"])} <!-- Be sure to add a \`<slot/>\` for child content! --> </button>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/mdx/SButton.astro", void 0);

const $$Astro = createAstro("https://platinex.in/");
async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const posts = await getCollection("blog");
  const post = Astro2.props;
  const MAX_POSTS = 3;
  const getRelatedPosts = (post2) => {
    const lowercaseTags = post2.data.tags.map((tag) => tag.toLowerCase());
    const relatedPosts2 = posts.filter(
      (p) => p.slug !== post2.slug && p.data.tags.some((t) => lowercaseTags.includes(t.toLowerCase()))
    );
    return relatedPosts2.slice(0, MAX_POSTS);
  };
  const relatedPosts = getRelatedPosts(post);
  const { Content, headings, remarkPluginFrontmatter } = await post.render();
  const disqusEnabled = disqusConfig.enabled;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BlogPost, { "id": post.id, "data": post.data, "headings": headings, "readTime": remarkPluginFrontmatter.minutesRead }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6 xl:gap-12 mt-4 max-w-7xl mx-auto"> <!-- Sidebar with Table of Contents --> <aside class="xl:flex flex-col gap-4 hidden"> <div class="sticky top-4 space-y-4 max-h-[calc(100vh-2rem)] overflow-hidden"> ${renderComponent($$result2, "Share", Share, {})} ${headings && headings.length > 0 && renderTemplate`<div class="overflow-y-auto max-h-[calc(100vh-8rem)]"> ${renderComponent($$result2, "TableOfContents", $$TableOfContents, { "headings": headings })} </div>`} </div> </aside> <!-- Main Content --> <main class="min-w-0"> <div class="prose prose-stone dark:prose-invert max-w-none mb-6 prose-p:text-base prose-p:leading-relaxed prose-p:mb-2 prose-headings:mb-3 prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-h2:font-heading prose-h3:font-heading prose-h4:font-heading"> ${renderComponent($$result2, "Content", Content, { "components": { pre: $$Code, SButton: $$SButton } })} </div>  ${relatedPosts.length > 0 && renderTemplate`<footer class="border-t border-stone-200 dark:border-stone-700 pt-6"> <h2 class="text-lg font-semibold text-stone-900 dark:text-white mb-4 font-heading">
Related Posts
</h2> ${renderComponent($$result2, "ListRelatedPosts", $$ListRelatedPosts, { "posts": relatedPosts })} </footer>`} </main> </div> ${disqusEnabled}` })}`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/pages/post/[...slug].astro", void 0);

const $$file = "C:/Users/Harshal/.cursor/platinex-netlify/src/pages/post/[...slug].astro";
const $$url = "/post/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, ____slug_ as _, $$FormattedDate as a, getPosts as b, cn as c, sluglify as d, $$BaseLayout as e, getConfiguredImageService as f, getCategories as g, $$CheckIcon as h, imageConfig as i, $$LocationIcon as j, $$WhatsappIcon as k, getTags as l, getPostByTag as m, getCollection$1 as n, siteConfig as s, unsluglify as u };
