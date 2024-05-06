const common_plans = [
	{
		plan_name: `Standard License`,
		description: 'Single license standard',
		sales_model: 'single',
		default_price: 11
	},
	{
		plan_name: `Extended License`,
		description: 'Extended license standard',
		sales_model: 'single',
		default_price: 51
	},
	{
		plan_name: `Bundle`,
		description: 'Bundle package',
		sales_model: 'pack',
		subscription_model: 'year',
		auto_enable: true,
		access_limit: 100,
		default_price: 15
	},
];

const getPlans=(label)=>{
	return common_plans.map(p=>{
		return {
			...p,
			plan_name: `${label} - ${p.plan_name}`,
			description: `${label} - ${p.description}`
		}
	})
}

const content_types = {
	app: {
		comment: false,
		reaction: 'rating',
		plans: [
			{
				plan_name: `App - Monthly 1 License`,
				description: 'App - Get single license for one month',
				subscription_model: 'month',
				access_limit: 1,
				default_price: 10
			},
			{
				plan_name: `App - Yearly 2 License`,
				description: 'App - Get two license for one year',
				subscription_model: 'year',
				access_limit: 2,
				default_price: 10
			},
			{
				plan_name: `App - Lifetime 3 License`,
				description: 'App - Get three license for lifetime',
				subscription_model: 'lifetime',
				access_limit: 3,
				default_price: 13
			}
		]
	},
	audio: {
		comment: true,
		reaction: 'like',
		plans: getPlans('Audio')
	},
	video: {
		comment: true,
		reaction: 'like',
		plans: getPlans('Video')
	},
	image: {
		comment: true,
		contributor: true,
		reaction: 'like',
		plans: getPlans('Image')
	},
	'3d': {
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
	},
}

Cypress.Commands.add('toggleContentTypes', (obj) => {
	
	cy.visit('wp-admin/admin.php?page=solidie-settings');

	// Prepare all the content types
	const fields = {};
	for (let content_type in obj) {
		fields[`[data-cylector="segment-contents"] [data-cylector="segment-toggle-${content_type}"] input`] = obj[content_type];
	}

	// Toggle content types
	cy.toggleCheck(fields);

	// Save settings
	cy.get('[data-cylector="save-settings"]').then($button => {
		if ($button.is(':enabled')) {
			cy.wrap($button).click();
			cy.wait(1500);
		}
	});
});

Cypress.Commands.add('setUpContentSettings', () => {

	cy.toggleContentTypes(Object.assign({}, ...Object.keys(content_types).map(type=>{return {[type]: true}})));
	
	for (let content_type in content_types) {
		
		const {
			comment=false,
			reaction='none',
			plans=[],
			contributor=false
		} = content_types[content_type]

		cy.visit(`wp-admin/admin.php?page=solidie-settings#/settings/contents/${content_type}/`);
		
		// Set commenting
		cy.toggleCheck({'[data-cylector="option-enable_comment"] input': comment});

		// Set contributor info
		cy.toggleCheck({'[data-cylector="option-show_contributor_info"] input': contributor});
		
		// Set reaction type
		cy.get(`[data-cylector="option-reaction_type"] [value="${reaction}"]`).check();

		// Set plans
		plans.forEach(plan=>{

			const {
				plan_name,
				description,
				sales_model,
				subscription_model,
				access_limit,
				default_price
			} = plan;
			
			// Add a new plan box
			cy.get('[data-cylector="add-plan"]').click();

			// Set plan name
			cy.get('[data-cylector="plan-name"] input').clear().type(plan_name),

			// Set plan description
			cy.get('[data-cylector="description"] textarea').clear().type(description);

			// Set sales model
			if (sales_model) {
				cy.get(`[data-cylector="sales-model"] [value="${sales_model}"]`).check();

				if ( sales_model === 'bundle' ) {
					// cy.get(`[data-cylector="auto-enable"] value="${}"`)
				}
			}

			if ( subscription_model ) {
				cy.get(`[data-cylector="subscription-model"] [value="${subscription_model}"]`).check();
			}

			if ( access_limit ) {
				cy.get('[data-cylector="access-limit"] input').clear().type(access_limit.toString());
			}

			cy.get('[data-cylector="default-price"]').clear().type(default_price);
		});

		// Save settings
		cy.get('[data-cylector="save-settings"]').then($button => {
			if ($button.is(':enabled')) {
				cy.wrap($button).click();
				cy.wait(1500);
			}
		});
	}
});
