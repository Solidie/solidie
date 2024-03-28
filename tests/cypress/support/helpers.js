import 'cypress-file-upload';

// Check and upload at least one media file.
Cypress.Commands.add('atleastOneMedia', () => {
	cy.visit('/wp-admin/upload.php?mode=list');
	cy.get('body').then(($body) => {
		if ($body.find('.no-items').length !== 0) {
			cy.visit('/wp-admin/media-new.php?browser-uploader');
			cy.get('#async-upload').attachFile('../../../assets/images/icon-512.png');
			cy.get('#html-upload').click();
		}
	});
});

Cypress.Commands.add('selectImageOnClick', (btn, form_page, has_image_confirmed = false) => {
	if (!has_image_confirmed) {
		// Image handler
		cy.atleastOneMedia();

		// Back to originator page
		cy.visit(form_page);
	}

	cy.get(btn).click();
	cy.get('.media-menu-item:nth-child(2)').last().click();
	cy.get('li.attachment:first-child').last().click();
	cy.get('.media-button-select').last().click();

	cy.get('body').then(($body) => {
		if ($body.find('.media-button-insert').length !== 0) {
			cy.get('.media-button-insert').last().click();
		}
	});
});

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
