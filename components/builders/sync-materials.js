const path = require('path');
const fs = require('fs');
const { syncDirectory } = require('./sync-directory');

const to_sync = [
	{
		from: './node_modules/crewhrm-materials',
		to: '../solidie-materials'
	}
];

for ( let i=0; i<to_sync.length; i++ ) {

	const {to, from} = to_sync[i];

	const materials_path = path.resolve(to);
	const materials_path_node = path.resolve(from);

	if ( fs.existsSync(materials_path) && fs.existsSync(materials_path_node) ) {
		syncDirectory(from, to);
	}
}
