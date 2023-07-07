var fs = require('fs');
var path = require('path');

// Prepare TailWind
var patch_codes = `
@function hsla($v) {
	@return #{"hsla(#{$v})"};
}
@function hsl($v) {
	@return #{"hsl(#{$v})"};
}
@function rgb($v) {
	@return #{"rgb(#{$v})"};
}
`;

var tw_path = path.resolve( __dirname, '../components/libraries/tailwind/build.module.scss' );
var tw_codes = patch_codes + fs.readFileSync( tw_path ).toString();

fs.writeFileSync( tw_path, tw_codes );