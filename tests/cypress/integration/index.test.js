const timestamp = new Date().getTime();

const contents = {
	app_free: {
		content_type: 'app',
		content_title: `Demo App Free ${timestamp}`,
		content_description: `Demo content description for app ${timestamp}`,
		monetization: 'free'
	},
	app_paid: {
		content_type: 'app',
		content_title: `Demo App Paid ${timestamp}`,
		content_description: `Demo content description for app ${timestamp}`,
		monetization: 'paid'
	}
}

describe('Admin can login and make sure plugin is activated', () => {
	
	it('Can activate plugin if it is deactivated', () => {
		cy.activatePlugin('solidie');
	});

	it('Can visit "Solidie" page', () => {
		cy.visit('wp-admin/admin.php?page=solidie');
	});
});

describe('Check if content can be created in free version', ()=>{
	
	it('Enable content types', ()=>{
		cy.setUpContentSettings();
	});

	it('Create free app', ()=>{
		cy.createContent(contents.app_free);
	});

	/* it('Create paid app', ()=> {
		cy.createContent(contents.app_paid);
	}); */
});
