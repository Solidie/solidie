const common_fields = {
	address: '1760 Finch Ave E',
	city: 'New York',
	postal: '10005'
}

const contributors = [
	{
		username: 'contributor-user-1',
		pass: 'HSPihFUwymAannNTbML5Oa6K',
		email: 'contributor1@example.com',
		first_name: 'Contr 1 Fname',
		last_name: 'Contr 1 Lname',
		...common_fields
	},
	{
		username: 'contributor-user-2',
		pass: 'HSPihFUwymAannNTbML5Oa6K2',
		email: 'contributor2@example.com',
		first_name: 'Contr 2 Fname',
		last_name: 'Contr 2 Lname',
		...common_fields
	}
];

const content = {
	content_type: 'audio',
	content_title: `Audio Monetization Test`,
	content_description: `Demo audio content description, testing monetization`,
	monetization: 'paid',
	content_permalink: 'gallery/audios/audio-monetization-test/'
}

const comment = 'This is a sample dummy comment';

describe('Test user dashboard with contributor user', ()=>{

	it('Create contributor users, login and apply to become contributor', ()=>{

		// Create contributor users
		for (let i=0; i<contributors.length; i++) {
			cy.createUser(contributors[i]);
		}

		// Login to the newly created contributors and apply to become
		for (let i=0; i<contributors.length; i++) {
			
			//cy.logout();
			cy.loginCustom(contributors[i]);

			// Open contribution page to apply
			cy.visit('my-dashboard/contribution/');
			cy.wait(2000);

			// Apply now
			cy.get('[data-cylector="apply-now"]').click();
			cy.get('.solidie-swal button').contains('Yes').click();
		}
	});

	it('Login to admin and approve the contributor requests', ()=>{
		cy.logout();
		cy.loginCustom();

		cy.visit('wp-admin/admin.php?page=solidie-contributors');
		cy.wait(1000);

		cy.get('[data-cylector="status-dropdown"] select').each(dropdown=>{
			cy.wrap(dropdown).select('approved');
			cy.get('.solidie-swal button').contains('Yes').click();
		});

		cy.wait(1500);
	});

	it('Login back to the contributor and test', ()=>{

		// Back to contributor
		cy.logout();
		cy.loginCustom(contributors[0]);

		// Open single audio page
		cy.visit('gallery/audios/demo-audio-paid/');
		cy.wait(2500);

		// Test like
		cy.get('[data-cylector="thumbs-up"]').click();

		// Test commenting
		cy.get('[data-cylector="comment-box"] textarea').clear().type(comment);
		cy.get('[data-cylector="comment-submit"]').click();
		cy.wait(2000);
		cy.get('[data-cylector="comment-single"]').should('have.text', comment);

		// Test sharer
		cy.get('[data-cylector="share-opener"]').click();
		cy.get('[data-cylector="sharer"] [data-cylector="copy-url"]').should('exist');
		cy.get('[data-cylector="sharer"] [data-cylector="close-sharer"]').click();
		
		// Test wishlist
		cy.get('[data-cylector="add-to-wishlist"]').click();
		cy.wait(1000);
		cy.visit('my-dashboard/wishlist/');
		cy.wait(1500);
		cy.get('[data-cylector="remove-from-wishlist"]').click();
		cy.get('.solidie-swal button').contains('Yes').click();
		cy.wait(1500);

		// Set withdrawal settings
		cy.visit('my-dashboard/settings/withdrawal/');
		cy.wait(1500);
		cy.get('[data-cylector="field-wrapper"] input').clear().type('email@example.com');
		cy.get('[data-cylector="save-withdrawal-settings"]').click();
		cy.wait(1500);

		// Create a paid content to test purchase, earning, withdrawal etc.
		cy.createContent(content, true);
	});

	it('Login to second contributor and purchase the product', ()=>{
		// Login to second contributor
		cy.logout();
		cy.loginCustom(contributors[1]);

		// Add paid content to cart
		cy.visit(content.content_permalink);
		cy.wait(1000);
		cy.get('[data-cylector="add-to-cart"]').click();
		cy.wait(1000);

		// Checkout now
		cy.visit('checkout/');
		cy.get('#billing-first_name').clear().type(contributors[1].first_name);
		cy.get('#billing-last_name').clear().type(contributors[1].last_name);
		cy.get('#billing-address_1').clear().type(contributors[1].address);
		cy.get('#billing-city').clear().type(contributors[1].city);
		cy.get('#billing-postcode').clear().type(contributors[1].postal).blur();
		cy.get('.wc-block-components-checkout-place-order-button').click();
		cy.wait(3000);

		// Check orders page
		cy.visit('my-dashboard/my-orders/');
		cy.wait(1500);
		cy.get('[data-cylector="order-single-link"]:first').click();
		cy.wait(1500);
		cy.get('[data-cylector="order-details-table"]').should('exist');

		// Check my purchases page
		cy.visit('my-dashboard/my-purchases/');
		cy.wait(1500);
		cy.get('[data-cylector="content-single-link"]:first').click();
		cy.wait(1500);
		cy.get('[data-cylector="purchase-single-wrapper"]').should('exist');
	});

	it('Login back to contributor 1 and test sales info and earnings', ()=>{

		// Login to second contributor
		cy.logout();
		cy.loginCustom(contributors[0]);

		// Check if there is at least one sale entry
		cy.visit('my-dashboard/earnings/sales/');
		cy.wait(1500);
		cy.get('[data-cylector="sales-single-row"]').should('exist');

		// Make withdrawal request
		cy.get('[data-cylector="withdraw-btn"]').click();
		cy.selectDropDown('method', 'Paypal');
		cy.get('[data-cylector="submit-withdrawal"]').click();
		cy.wait(1500);

		// Check if the withdrawal request placed
		cy.visit('my-dashboard/earnings/withdrawals/');
		cy.wait(1500);
		cy.get('[data-cylector="withdrawal-single"]').should('exist');
	});

	it('Login to admin and approve the request', ()=>{

		// Login to second contributor
		cy.logout();
		cy.loginCustom();

		cy.visit('wp-admin/admin.php?page=solidie-withdrawal-requests');
		cy.wait(1500);

		// Set as processing
		cy.get('[data-cylector="withdrawal-status"] select:first').select('processing');
		cy.get('.solidie-swal button').contains('Yes').click();
		cy.wait(1000);

		// Set as sent
		cy.get('[data-cylector="withdrawal-status"] select:first').select('sent');
		cy.get('.solidie-swal button').contains('Yes').click();
		cy.wait(1000);
	});
});
