/* empty css                          */
import { c as createAstro, b as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, f as renderComponent, j as renderSlot } from '../astro_hiSW7D_K.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Image, a as $$FormattedDate, c as cn, g as getCategories, b as getPosts, u as unsluglify, s as siteConfig, d as sluglify, e as $$BaseLayout } from './__C7OCMbDB.mjs';
import 'reading-time';

const $$Astro$7 = createAstro("https://platinex.in/");
const $$ArrowUp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ArrowUp;
  const { width = 24, height = 24 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg class="feather feather-arrow-up-right" fill="none"${addAttribute(height, "height")} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24"${addAttribute(width, "width")} xmlns="http://www.w3.org/2000/svg"><line x1="7" x2="17" y1="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/ArrowUp.astro", void 0);

const $$Astro$6 = createAstro("https://platinex.in/");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$PostCard;
  const {
    id,
    data: { title, description, pubDate, heroImage, category },
    readTime,
    slug
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="grid grid-rows-[300px_auto] md:grid-rows-[300px_220px] min-h-full group"> <a class="relative overflow-hidden"${addAttribute(`/post/${slug}/`, "href")}> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "width": 600, "height": 200, "format": "webp", "class": "h-full min-w-full object-cover hover:scale-[101%] transition-all duration-200 rounded-[2px]", "alt": `img of ${title}` })} <div class="z-30 absolute bottom-0 w-full h-20"> <div class="-z-10 absolute bottom-0 glass w-full min-h-full"></div> <div class="flex items-center justify-between gap-x-1 text-white px-6 py-4"> <div class="flex flex-col gap-1 items-center justify-center"> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": pubDate })} <span class="text-sm"> ${readTime}</span> </div> <span class="pb-4">${category}</span> </div> </div> </a> <div class="flex justify-between flex-col gap-4 md:gap-0 py-6 pl-1"> <div class="flex flex-col gap-3"> <div class="flex flex-col gap-2"> <a class="text-2xl font-semibold -tracking-wider"${addAttribute(`/post/${slug}/`, "href")}> ${title} </a> </div> <p class="overflow-hidden line-clamp-3 text-gray-700 dark:text-white mb-5 font-[400] md:pr-[15%]"> ${description} </p> </div> <footer class="flex justify-between items-center"> <a${addAttribute(`/post/${slug}/`, "href")} class="flex justify-center items-center dark:text-white rounded-full hover:translate-x-1 transition-transform duration-150 ease-in-out font-semibold gap-1 group"${addAttribute(`go to ${title}`, "aria-label")}>
Read Post <span class="mt-[1px] group-hover:rotate-45 transition-transform duration-250 ease-in-out">${renderComponent($$result, "ArrowUp", $$ArrowUp, { "width": "18", "height": "18" })}</span> </a> </footer> </div> </article> `;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/PostCard.astro", void 0);

const $$Astro$5 = createAstro("https://platinex.in/");
const $$ListPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ListPosts;
  const { posts, FirstBig = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(cn(
    `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 mt-3`,
    FirstBig && `md:[&>*:first-child]:col-span-2`
  ), "class")}> ${posts.map(async (post) => {
    const { remarkPluginFrontmatter } = await post.render();
    return renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "id": post.id, "data": post.data, "slug": post.slug, "readTime": remarkPluginFrontmatter.minutesRead })}`;
  })} </section>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/ListPosts.astro", void 0);

const $$Astro$4 = createAstro("https://platinex.in/");
const $$ArrowLeft = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ArrowLeft;
  const { width = 24, height = 24 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-left-filled"${addAttribute(width, "width")}${addAttribute(height, "height")} viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 2a10 10 0 0 1 .324 19.995l-.324 .005l-.324 -.005a10 10 0 0 1 .324 -19.995zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.048 1.048 0 0 0 -.083 .094l-.064 .092l-.052 .098l-.044 .11l-.03 .112l-.017 .126l-.003 .075l.004 .09l.007 .058l.025 .118l.035 .105l.054 .113l.043 .07l.071 .095l.054 .058l4 4l.094 .083a1 1 0 0 0 1.32 -1.497l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.586l2.293 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/ArrowLeft.astro", void 0);

const $$Astro$3 = createAstro("https://platinex.in/");
const $$ArrowRight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  const { width = 24, height = 24 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-right-filled"${addAttribute(width, "width")}${addAttribute(height, "height")} viewBox="0 0 24 24" stroke-width="1.25" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z" stroke-width="0" fill="currentColor"></path> </svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/ArrowRight.astro", void 0);

const $$Astro$2 = createAstro("https://platinex.in/");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-5 md:gap-1 justify-around md:justify-end"> <!-- Previous Button --> ${page.start > 0 && renderTemplate`<a${addAttribute(page.url.prev, "href")} class="flex items-center justify-center px-8 md:px-4 h-10 text-base font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> ${renderComponent($$result, "ArrowLeft", $$ArrowLeft, {})} </a>`} <!-- Next Button --> ${page.currentPage < page.lastPage && renderTemplate`<a${addAttribute(page.url.next, "href")} class="flex items-center justify-center px-8 md:px-4 h-10 ml-3 text-base font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-transparent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> ${renderComponent($$result, "ArrowRight", $$ArrowRight, {})} </a>`} </div>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Pagination.astro", void 0);

const $$Title = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1 class="text-5xl font-bold first-letter:uppercase"> ${renderSlot($$result, $$slots["default"])} </h1>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/Title.astro", void 0);

const $$Shape = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="SvgjsPath3009" d="M4 15.51a1 1 0 0 0 .71-.29L15.22 4.71a1 1 0 1 0-1.42-1.42L3.29 13.8a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L26.6 4.71a1 1 0 1 0-1.42-1.42L3.29 25.18a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.36a1 1 0 0 0 .71-.25L38 4.71a1 1 0 1 0-1.42-1.42L3.29 36.54a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zm0 11.38a1 1 0 0 0 .71-.29L49.34 4.71a1 1 0 1 0-1.42-1.42L3.29 47.92a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zM60.71 3.29a1 1 0 0 0-1.42 0l-56 56a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l56-56a1 1 0 0 0 0-1.42zm-1.42 11.37L14.66 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l44.63-44.63a1 1 0 0 0-1.42-1.42zm0 11.34L26 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l33.29-33.25A1 1 0 0 0 59.29 26zm0 11.4L37.4 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l21.89-21.89a1 1 0 0 0-1.42-1.42zm0 11.38L48.78 59.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L60.71 50.2a1 1 0 0 0-1.42-1.42z" data-name="Layer 9" fill="url(&quot;#SvgjsLinearGradient3010&quot;)"></path><defs><linearGradient gradientTransform="rotate(0 0.5 0.5)" id="SvgjsLinearGradient3010"><stop stop-opacity=" 1" stop-color="rgba(125, 81, 146)" offset="0"></stop><stop stop-opacity=" 1" stop-color="rgba(125, 81, 146)" offset="0.48"></stop><stop stop-opacity=" 1" stop-color="rgba(128, 5, 166)" offset="1"></stop></linearGradient></defs></svg>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/icons/Shape.astro", void 0);

const $$Astro$1 = createAstro("https://platinex.in/");
const $$TitlePage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TitlePage;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-start items-center gap-2 title"> ${renderComponent($$result, "Shape", $$Shape, {})} ${renderComponent($$result, "Title", $$Title, {}, { "default": ($$result2) => renderTemplate`${title}` })} </div>`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/components/TitlePage.astro", void 0);

const $$Astro = createAstro("https://platinex.in/");
async function getStaticPaths({ paginate }) {
  const categories = await getCategories();
  const allPosts = await getPosts();
  return categories.flatMap((category) => {
    const unsluglifyNameCategory = unsluglify(category.toLowerCase());
    const filteredPosts = allPosts.filter(
      (post) => post.data.category.toLowerCase() === unsluglifyNameCategory
    );
    return paginate(filteredPosts, {
      params: {
        category: sluglify(category.toLowerCase())
      },
      pageSize: siteConfig.paginationSize
    });
  });
}
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const params = Astro2.params;
  const { page } = Astro2.props;
  const unsluglifyNameCategory = unsluglify(params.category.toLowerCase());
  const categoryName = (await getCategories()).find(
    (category) => category.toLowerCase() === unsluglifyNameCategory
  );
  const posts = page.data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": categoryName }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "TitlePage", $$TitlePage, { "title": categoryName })} ${renderComponent($$result2, "ListCategories", ListCategories, { "activeCategory": params.category })} ${renderComponent($$result2, "ListPosts", $$ListPosts, { "posts": posts })} ${renderComponent($$result2, "Pagination", $$Pagination, { "page": page })} ` })}`;
}, "C:/Users/Harshal/.cursor/platinex-netlify/src/pages/category/[category]/[page].astro", void 0);

const $$file = "C:/Users/Harshal/.cursor/platinex-netlify/src/pages/category/[category]/[page].astro";
const $$url = "/category/[category]/[page]";

const _page_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$page,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ListPosts as $, _page_ as _, $$TitlePage as a };
