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
		cy.toggleContentTypes({
			app: true,
			audio: true,
			video: true,
			image: true,
			'3d': true,
			document: true,
			font: true,
			tutorial: true,
		});
	});

	it('Create free app', ()=>{
		cy.createContent({
			content_type: 'app',
			content_title: 'Demo content'
		});
	});
});
