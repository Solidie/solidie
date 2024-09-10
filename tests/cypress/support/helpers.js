import 'cypress-file-upload';

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

Cypress.Commands.add('selectDropDown', (parent_cylector, label)=>{
	cy.get(`[data-cylector="${parent_cylector}"] [data-cylector="trigger-point"]`).click();
	cy.get('[data-cylector="options-wrapper"]>div').contains(label).click();
})