
const contents = {
	app_free: {
		content_type: 'app',
		content_title: `Demo App Free`,
		content_description: `Demo content description for app`,
		monetization: 'free'
	},
	app_paid: {
		content_type: 'app',
		content_title: `Demo App Paid`,
		content_description: `Demo content description for app`,
		monetization: 'paid'
	}
}

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
