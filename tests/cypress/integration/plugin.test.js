describe('Admin can login and make sure plugin is activated', () => {
	
	it( 'Activate plugins', () => {
		cy.activatePlugin( 'solidie' );
		cy.activatePlugin( 'solidie-pro' );
	} );

	it('Cleanup Solidie', ()=>{
		cy.visit('wp-admin/admin.php?page=solidie&cleanup-solidie=yes');
	});

	it( 'Deactivate and Activate again plugins', () => {
		cy.deactivatePlugin( 'solidie-pro' );
		cy.deactivatePlugin( 'solidie' );

		cy.activatePlugin( 'solidie' );
		cy.activatePlugin( 'solidie-pro' );
	} );

	it('Change permalink structure', ()=>{
		// Change permalink structure
		cy.visit('wp-admin/options-permalink.php');
		cy.get('[id="permalink-input-post-name"]').click();
		cy.get('[id="submit"]').click();
	});
});
