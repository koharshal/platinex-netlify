import LinkedinIcon from '../components/icons/LinkedinIcon.astro'
import WhatsappIcon from '../components/icons/WhatsappIcon.astro'
import LocationIcon from '../components/icons/LocationIcon.astro'

// ADD YOUR SOCIAL NETWORKS HERE
export const SOCIALNETWORKS = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/company/platinex/',
		icon: LinkedinIcon
	},
	{
		name: 'WhatsApp',
		url: 'https://wa.me/918600146841',
		icon: WhatsappIcon
	},
	{
		name: 'Location',
		url: '#contact',
		icon: LocationIcon
	}
] as const
