module.exports = require('solidie-materials/builders/build-release')({
	vendors: ['solidie'],
	text_dirs_js: ['./components', '../solidie-pro/components'], 
	text_dirs_php: ['./classes/**/*.php', '../solidie-pro/classes/**/*.php']
});
