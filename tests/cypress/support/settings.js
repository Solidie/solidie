const timestamp = new Date().getTime();

const content_types = {
	app: {
		comment: false,
		reaction: 'rating',
		plans: [
			{
				plan_name: `Monthly 1 License ${timestamp}`,
				description: 'Get single license for one month',
				subscription_model: 'month',
				access_limit: 1,
				default_price: 10
			},
			{
				plan_name: `Yearly 2 License ${timestamp}`,
				description: 'Get two license for one year',
				subscription_model: 'year',
				access_limit: 2,
				default_price: 10
			},
			{
				plan_name: `Lifetime 3 License ${timestamp}`,
				description: 'Get three license for lifetime',
				subscription_model: 'lifetime',
				access_limit: 3,
				default_price: 13
			}
		]
	},
	audio: {
		comment: true,
		reaction: 'like',
		plans: [
			{
				plan_name: `Single Standard ${timestamp}`,
				description: 'Single license standard',
				sales_model: 'single',
				default_price: 11
			},
			{
				plan_name: `Bundle ${timestamp}`,
				description: 'Bundle package',
				sales_model: 'pack',
				subscription_model: 'year',
				auto_enable: true,
				access_limit: 100,
				default_price: 15
			},
		]
	},
	video: {
		comment: true,
		reaction: 'like',
		plans: []
	},
	image: {
		comment: true,
		contributor: true,
		reaction: 'like',
		plans: []
	},
	'3d': {
		comment: true,
		reaction: 'like',
		plans: []
	},
	document: {
		comment: true,
		reaction: 'like',
		plans: []
	},
	font: {
		comment: true,
		reaction: 'like',
		plans: []
	},
	tutorial: {
		comment: false,
		reaction: 'rating',
		plans: []
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
