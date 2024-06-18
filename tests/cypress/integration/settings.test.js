describe('Configure plugin settings', ()=>{

	it('Configure general settings', ()=>{

		// Enable public contribution
		cy.visit('wp-admin/admin.php?page=solidie-settings#/settings/general/contributor/');
		cy.get('[name="contribution_distribute_model"]').check(['free', 'paid']);

		// Save settings
		cy.get('[data-cylector="save-settings"]').click();
		cy.wait(1500);
	});
	
	it('Configure content types', ()=>{

		// Configure settings for content types
		cy.setUpContentSettings();
	});
});
