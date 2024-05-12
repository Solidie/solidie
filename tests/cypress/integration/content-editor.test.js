const { contents } = require("../support/data");

describe('Check if content can be created in free version', ()=>{
	it('Create contents', ()=>{
		contents.forEach((content, index)=>{
			cy.createContent(content, index);
		});
	})
});
