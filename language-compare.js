const fs = require( 'node:fs' );
const path = require( 'node:path' );

const languages = [
	'de',
	'en',
];

/**
 *
 * @param {string} l1
 * @param {string} l2
 */
function compare( l1, l2 ) {
	const l1Keys = Object.keys( contents[l1] );
	const l2Keys = Object.keys( contents[l2] );

	console.log( `Comparing "${l2}" with "${l1}"...` );

	l1Keys.forEach( key => {
		if( !l2Keys.includes( key ) ) {
			console.warn( `  [${l2}] Missing key: ${key}` );
		}

		if( contents[l1][key].length === 0 ) {
			console.warn( `  [${l1}] Empty value for key: ${key}`);
		}
	} );

	console.log( `Comparing "${l1}" with "${l2}"...` );

	l2Keys.forEach( key => {
		if( !l1Keys.includes( key ) ) {
			console.warn( `  [${l1}] Missing key: ${key}` );
		}

		if( contents[l2][key].length === 0 ) {
			console.warn( `  [${l2}] Empty value for key: ${key}`);
		}
	} );

	console.log( 'Done.' );
}

const contents = {};

for( let i = 0; i < languages.length; i++ ) {
	const lang = languages[i];
	const filepath = path.join( 'src', 'ui', 'language', `${lang}.json` );
	contents[lang] = JSON.parse( fs.readFileSync( filepath ) );
}

compare( 'de', 'en' );
