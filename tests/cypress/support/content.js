Cypress.Commands.add('createContent', ({content_type}) => {
	cy.visit('wp-admin/admin.php?page=solidie-inventory#/inventory/app/editor/new');
});
