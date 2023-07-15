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

// Global tag selectors must be removed from bootstrap and tailwaind built file manually, to protect other styles

var tw_path = path.resolve( __dirname, '../components/sass/tailwind/build.scss' );
var tw_codes = patch_codes + fs.readFileSync( tw_path ).toString();

fs.writeFileSync( tw_path, tw_codes );