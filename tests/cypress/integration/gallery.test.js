const { content_types } = require("../support/data");

describe('Test content gallery', ()=>{

	it('Test every content types', ()=>{

		const types = Object.keys(content_types);

		types.forEach(type=>{

			cy.visit(`gallery/${type}${type!=='3d' ? 's' : ''}/`);

			// ---------------- Gallery page tests ----------------
			
			// Change order by
			cy.get('[data-cylector="order_by"] input:first').click();
			cy.get('[data-cylector="order_by"] input:last').click();

			// Enter search keyword
			const search_field = cy.get('[data-cylector="content-search"] input');
			search_field.type('Free');
			search_field.clear();
			search_field.type('Paid');

			// Filter by category
			cy.get('[data-cylector="category_ids"] input:first').click();

			// To Do: Add bundle filter

			// Clear filter
			cy.get('[data-cylector="clear-content-filter"]').click();
			cy.wait(1000);

			// ------------- Single content page tests -------------
			cy.get(`[data-cylector="content-list-wrapper-${type}"] [data-cylector="content-single"]:first`).click();
			cy.wait(1500);

			// Check if the content is rendered
			cy.get('[data-cylector="content-single-page"]').should('exist');
		});
	});
});
