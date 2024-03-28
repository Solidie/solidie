describe('Admin can login and make sure plugin is activated', () => {
	
	/* it('Can activate plugin if it is deactivated', () => {
		cy.activatePlugin('solidie');
	}); */

	it('Cleanup Solidie', ()=>{
		cy.visit('wp-admin/admin.php?page=solidie&cleanup-solidie=yes');
	});
});
