const email    = 'contributor@example.com';
const username = 'contributor-user';
const pass     = 'HSPihFUwymAannNTbML5Oa6K';

describe('Test frontend dashboard with contributor user', ()=>{

	it('Create contributor user, login and apply to become contributor', ()=>{
		// Create contributor user
		cy.createUser(email, username, pass);

		// Login to the contributor
		cy.logout();
		cy.loginCustom(username, pass);

		// Open contribution page to apply
		cy.visit('my-dashboard/contribution/');
		cy.wait(1000);

		// Apply now
		cy.get('[data-cylector="apply-now"]').click();
		cy.get('.solidie-swal button').contains('Yes').click();
	});

	it('Login to admin and approve the contributor request', ()=>{
		cy.logout();

		cy.session('solidie-login-2', ()=>{
			cy.login();
		});

		cy.visit('wp-admin/admin.php?page=solidie-contributors');
		cy.wait(1000);

		cy.get('[data-cylector="status-dropdown"] select:last').select('approved');
		cy.get('.solidie-swal button').contains('Yes').click();
	});

	it('Purchase a product', ()=>{
		cy.visit('gallery/audio/demo-audio-paid');
	});

	/* it('Login back to the contributor and test fe dashboard', ()=>{

		cy.logout();
		cy.loginCustom(username, pass);

		cy.visit('my-dashboard/inventory/');
		cy.wait(1500);
	}); */
});
