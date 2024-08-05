module.exports = require('solidie-materials/builders/build-release')({
	vendors: ['solidie'],
	vendor_excludes: ['solidie/solidie-lib/src/Updater.php'],
	text_dirs_js: ['./components', '../solidie-pro/components'], 
	text_dirs_php: ['./classes/**/*.php', '../solidie-pro/classes/**/*.php'],
	delete_build_dir: false
});
