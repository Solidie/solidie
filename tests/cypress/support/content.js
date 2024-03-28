Cypress.Commands.add('createContent', content => {

	const {
		content_type,
		content_title,
		content_description,
		monetization
	} = content;

	cy.visit(`wp-admin/admin.php?page=solidie-inventory#/inventory/${content_type}/editor/new`);

	// Set thumbnail
	cy.get('[data-cylector="content-thumbnail"] input').attachFile('../assets/book.png');

	// Set content title
	cy.get('[data-cylector="content-title"] input').clear().type(content_title);

	// Set monetization
	cy.get(`[data-cylector="monetization-option"] [value="${monetization}"]`).check();

	// Set pricing info
	if (monetization=='paid') {
		
	}

	cy.get('[data-cylector="content-save"]').then($button => {
		if ($button.is(':enabled')) {
			cy.wrap($button).click();
			cy.wait(1500);
		}
	});
});
