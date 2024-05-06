
const content_types = ['app', 'audio', 'video', 'image', '3d', 'document', 'font', 'tutorial']
const _contents = []; 

content_types.forEach(type=>{
	_contents.push({
		content_type: type,
		content_title: `Demo ${type} Free`,
		content_description: `Demo content description for ${type} Free`,
		monetization: 'free'
	});

	_contents.push({
		content_type: type,
		content_title: `Demo ${type} Paid`,
		content_description: `Demo content description for ${type} Paid`,
		monetization: 'paid'
	});
});

describe('Check if content can be created in free version', ()=>{

	it('Create contents', ()=>{
		_contents.forEach(content=>{
			cy.createContent(content);
		});
	})
});
