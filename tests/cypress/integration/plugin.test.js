describe('Admin can login and make sure plugin is activated', () => {
	
	it('Cleanup Solidie', ()=>{
		cy.visit('wp-admin/admin.php?page=solidie&cleanup-solidie=yes');
	});
	
	it('Change permalink structure', ()=>{
		// Change permalink structure
		cy.visit('wp-admin/options-permalink.php');
		cy.get('[id="permalink-input-post-name"]').click();
		cy.get('[id="submit"]').click();
	});
});
