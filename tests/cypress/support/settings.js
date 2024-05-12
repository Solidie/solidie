const { common_categories, content_types } = require("./data");

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

		// Set categories
		common_categories.forEach(category=>{

			const {label, parent} = category;

			cy.get('[data-cylector="add-category"]').click();

			cy.get('[data-cylector="category-name-field"] input').type(label);

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
