const { writeFileSync } = require( "fs" );

function getRandomString(prefix='r', postfix='r') {
	const timestamp = new Date().getTime().toString();
	const randomPortion = Math.random().toString(36).substring(2);
	return prefix + timestamp + randomPortion + postfix;
}

const codes = [];
for ( let i=0; i<1100; i++ ) {
	
	const new_code = 'AppSumo-' + getRandomString();

	if ( codes.indexOf(new_code) === -1 ) {
		codes.push(new_code);
	}
}


writeFileSync('redeem-codes.csv', codes.join('\n'));