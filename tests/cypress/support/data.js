// Prepare contents
const _contents = []; 
['app', 'audio', 'video', 'image', '3d', 'document', 'font', 'tutorial'].forEach(type=>{
	_contents.push({
		content_type: type,
		content_title: `Demo ${type} Free`,
		content_description: `Demo content description for ${type} Free`,
		monetization: 'free'
	});

	_contents.push({
		content_type: type,
		content_title: `Demo ${type} Paid`,
		content_description: `Demo content description for ${type} Paid`,
		monetization: 'paid'
	});
});
module.exports.contents = _contents;

// Prepare common categories
module.exports.common_categories = [
	{
		label: 'Category 1'
	},
	{
		label: 'Category 2'
	},
	{
		label: 'Category 3'
	},
	{
		label: 'Category 1:1',
		parent: 'Category 1',
	},
	{
		label: 'Category 1:1:1',
		parent: '— Category 1:1'
	},
	{
		label: 'Category 1:1:2',
		parent: '— Category 1:1'
	},
];

// Prepare common pricing plans
module.exports.common_plans = [
	{
		plan_name: `Standard License`,
		description: 'Single license standard',
		sales_model: 'single',
		default_price: 11,
		default_sale_price: 9,
	},
	{
		plan_name: `Extended License`,
		description: 'Extended license standard',
		sales_model: 'single',
		default_price: 51,
		default_sale_price: 50,
	},
	{
		plan_name: `Bundle`,
		description: 'Bundle package',
		sales_model: 'pack',
		subscription_model: 'year',
		auto_enable: true,
		access_limit: 100,
		default_price: 15,
		default_sale_price: 12,
	},
];

// Prepare content types for settings
const getPlans=(label)=>{
	return module.exports.common_plans.map(p=>{
		return {
			...p,
			plan_name: `${label} - ${p.plan_name}`,
			description: `${label} - ${p.description}`
		}
	})
}
module.exports.content_types = {
	/* app: {
		comment: false,
		reaction: 'rating',
		plans: [
			{
				plan_name: `App - Monthly 1 License`,
				description: 'App - Get single license for one month',
				subscription_model: 'month',
				access_limit: 1,
				default_price: 15,
				default_sale_price: 12,
			},
			{
				plan_name: `App - Yearly 2 License`,
				description: 'App - Get two license for one year',
				subscription_model: 'year',
				access_limit: 2,
				default_price: 15,
				default_sale_price: 12,
			},
			{
				plan_name: `App - Lifetime 3 License`,
				description: 'App - Get three license for lifetime',
				subscription_model: 'lifetime',
				access_limit: 3,
				default_price: 15,
				default_sale_price: 12,
			}
		]
	}, */
	audio: {
		comment: true,
		reaction: 'like',
		plans: getPlans('Audio')
	},
	/* video: {
		comment: true,
		reaction: 'like',
		plans: getPlans('Video')
	}, */
	image: {
		comment: true,
		contributor: true,
		reaction: 'like',
		plans: getPlans('Image')
	},
	/* '3d': {
		comment: true,
		reaction: 'like',
		plans: getPlans('3D')
	},
	document: {
		comment: true,
		reaction: 'like',
		plans: getPlans('Document')
	},
	font: {
		comment: true,
		reaction: 'like',
		plans: getPlans('Font')
	},
	tutorial: {
		comment: false,
		reaction: 'rating',
		plans: getPlans('Tutorial').map(p=>{return {...p, access_limit: null}})
	}, */
}
