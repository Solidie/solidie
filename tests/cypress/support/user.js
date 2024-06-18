Cypress.Commands.add('createUser', (email, username, pass) => {
	
	cy.visit('wp-admin/user-new.php');

	// Fill user info
	cy.get('#email').clear().type(email);
	cy.get('#user_login').clear().type(username);
	cy.get('#pass1').clear().type(pass);
	cy.get('#role').select('contributor');

	// Uncheck mailing
	cy.get('#send_user_notification').uncheck();

	// Submit form
	cy.get('#createusersub').click();
});

Cypress.Commands.add('loginCustom', (username, pass)=>{
	cy.visit('wp-login.php');
	cy.wait(1000);
	cy.get('#user_login').clear().type(username);
	cy.get('#user_pass').clear().type(pass);
	cy.get('#wp-submit').click();
});
