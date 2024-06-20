const { common_categories, content_types } = require("../support/data");

const toggleContentTypes=(obj) => {
	
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
}

describe('Configure plugin settings', ()=>{

	it('Configure settings', ()=>{
		
		// Enable public contribution
		cy.visit('wp-admin/admin.php?page=solidie-settings#/settings/general/contributor/');
		cy.wait(2500);
		cy.get('[name="contribution_distribute_model"]').check(['free', 'paid']);

		// Set commision
		cy.get('[name="contributor_revenue_percentage"]').clear().type('55');

		// Save settings
		cy.get('[data-cylector="save-settings"]').click();
		cy.wait(1500);
		
		toggleContentTypes(Object.assign({}, ...Object.keys(content_types).map(type=>{return {[type]: true}})));
		
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

			// Set categories
			common_categories.forEach(category=>{

				const {label, parent} = category;

				cy.get('[data-cylector="add-list-item"]').click();

				cy.get('[data-cylector="category-name-field"] input').clear().type(label);

				// To Do: Select parent category in dropdown

				cy.get('[data-cylector="category-submit"]').click();

				cy.wait(500);
			});

			// Set plans
			plans.forEach(plan=>{

				const {
					plan_name,
					description,
					sales_model,
					subscription_model,
					access_limit,
					default_price,
					default_sale_price,
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

				cy.get('[data-cylector="default-price"] input').clear().type(default_price);
				cy.get('[data-cylector="default-sale-price"] input').clear().type(default_sale_price);
			});

			// Save settings
			cy.get('[data-cylector="save-settings"]').click();
			cy.wait(1500);
		}
	});
});
