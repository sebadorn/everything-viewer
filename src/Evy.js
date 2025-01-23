/**
 *
 * @param  {*} value
 * @return {boolean}
 */
export function isNumber( value ) {
	return typeof value === 'number' && !isNaN( value );
}
