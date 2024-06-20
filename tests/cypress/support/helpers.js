// Type text field, select dropdown, check-uncheck checkbox
Cypress.Commands.add('toggleCheck', (fields) => {
	
	Object.keys(fields).forEach((selector) => {

		const value = fields[selector];

		cy.get(selector).as('input-field');

		if (value === true) {
			cy.get('@input-field').check({force: true});
		} else {
			cy.get('@input-field').uncheck({force: true});
		}
	});
});
