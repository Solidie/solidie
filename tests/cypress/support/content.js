Cypress.Commands.add('createContent', (content, index) => {

	const {
		content_type,
		content_title,
		content_description,
		monetization
	} = content;

	cy.visit(`wp-admin/admin.php?page=solidie-inventory#/inventory/${content_type}/editor/new`);
	cy.reload({ forceReload: true });

	// Set thumbnail
	cy.get('[data-cylector="content-input-wrapper-thumbnail"] input').attachFile('../assets/book.png');

	// Set content title
	cy.get('[data-cylector="content-input-wrapper-content_title"] input').clear().type(content_title);

	// Set monetization
	cy.get(`[data-cylector="monetization-option"] [value="${monetization}"]`).check();

	// To Do: Set a category

	// To Do: Modify pricing info
	if (monetization=='paid') {
		
	}

	cy.get('[data-cylector="content-save"]').then($button => {
		if ($button.is(':enabled')) {
			cy.wrap($button).click();
			cy.get('.solidie-swal button').contains('Yes').click();
			cy.wait(1500);
		}
	});
});
