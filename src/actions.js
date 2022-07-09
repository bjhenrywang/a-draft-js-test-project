import { MegadraftIcons as icons } from 'megadraft';

export default [
	{ type: 'inline', label: 'B', style: 'BOLD', icon: icons.BoldIcon },
	{ type: 'inline', label: 'I', style: 'ITALIC', icon: icons.ItalicIcon },
	{
		type: 'block',
		label: 'UL',
		style: 'unordered-list-item',
		icon: icons.ULIcon
	},
	{
		type: 'block',
		label: 'OL',
		style: 'ordered-list-item',
		icon: icons.OLIcon
	},
	{
		type: 'entity',
		label: 'Link',
		style: 'link',
		entity: 'LINK',
		icon: icons.LinkIcon
	}
];
