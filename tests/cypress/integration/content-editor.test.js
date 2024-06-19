const { contents, content_types } = require("../support/data");

describe('Check if content can be created in free version', ()=>{
	it('Create contents', ()=>{
		contents.filter(c=>content_types[c.content_type] ? true : false).forEach((content)=>{
			cy.createContent(content);
		});
	})
});
