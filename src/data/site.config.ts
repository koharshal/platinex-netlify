interface SiteConfig {
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	site: 'https://platinex.netlify.app/', // Will be updated to your actual Netlify URL
	author: 'Platinex Industries Private Limited', // Site author
	title: 'Platinex Industries - Best Electroplating Service in India', // Site title.
	description:
		'Copper, Zinc, Tin, Nickel & Silver Plating service for components in Electrical, Automobile, Capacitor and Electronics Industries. ', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
