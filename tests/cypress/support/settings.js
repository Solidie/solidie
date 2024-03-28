Cypress.Commands.add('toggleContentTypes', (obj) => {
	
	cy.visit('wp-admin/admin.php?page=solidie-settings');

	const fields = {};
	for (let content_type in obj) {
		fields[`[data-solidie="segment-contents"] [data-solidie="segment-toggle-${content_type}"] input`] = obj[content_type];
	}

	cy.fillInputFields(fields, 'checkbox');

	cy.get('[data-solidie="save-settings"]').then($button => {
		if ($button.is(':enabled')) {
			cy.wrap($button).click();
		} else {
			cy.log('No setting value changed');
		}
	});
	
	cy.wait(2000);
});
