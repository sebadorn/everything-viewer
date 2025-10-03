import { BaseParser } from '../BaseParser.js';


const GGUFMetaDataValueType = {
    TypeUint8: 0,
    TypeInt8: 1,
    TypeUint16: 2,
    TypeInt16: 3,
    TypeUint32: 4,
    TypeInt32: 5,
    TypeFloat32: 6,
    TypeBool: 7,
    TypeString: 8,
    TypeArray: 9,
    TypeUint64: 10,
    TypeInt64: 11,
    TypeFloat64: 12,

	/**
	 *
	 * @param {number} value
	 * @returns {string}
	 */
	toName( value ) {
		switch( value ) {
			case 0: return 'Uint8';
			case 1: return 'Int8';
			case 2: return 'Uint16';
			case 3: return 'Int16';
			case 4: return 'Uint32';
			case 5: return 'Int32';
			case 6: return 'Float32';
			case 7: return 'Bool';
			case 8: return 'String';
			case 9: return 'Array';
			case 10: return 'Uint64';
			case 11: return 'Int64';
			case 12: return 'Float64';
		}
	},
};


export class AIParser extends BaseParser {


	/**
	 *
	 * @param {import('../plugins/Registry.js').ImportData} data
	 */
	constructor( data ) {
		super( data );

		this._textDecoder = new TextDecoder();
	}


	/**
	 *
	 * @private
	 * @param {DataView} dataView
	 * @param {number} offset
	 * @param {number} type
	 * @returns {number}
	 */
	_getRequiredSize( dataView, offset, type ) {
		switch( type ) {
			case GGUFMetaDataValueType.TypeUint8:
			case GGUFMetaDataValueType.TypeInt8:
			case GGUFMetaDataValueType.TypeBool:
				return 1;

			case GGUFMetaDataValueType.TypeUint16:
			case GGUFMetaDataValueType.TypeInt16:
				return 2

			case GGUFMetaDataValueType.TypeUint32:
			case GGUFMetaDataValueType.TypeInt32:
			case GGUFMetaDataValueType.TypeFloat32:
				return 4;

			case GGUFMetaDataValueType.TypeString:
				return Number( dataView.getBigUint64( offset, true ) ) + 8;

			case GGUFMetaDataValueType.TypeArray: {
				let size = 4 + 8;

				const arrType = dataView.getUint32( offset );
				offset += 4;

				const arrLength = Number( dataView.getBigUint64( offset, true ) );
				offset += 8;

				if( this._isTypeFixedSize( arrType ) ) {
					return size + arrLength * 64; // guessing some size
				}

				return size + this._getRequiredSize( dataView, offset, arrType ) * arrLength;
			}

			case GGUFMetaDataValueType.TypeUint64:
			case GGUFMetaDataValueType.TypeInt64:
			case GGUFMetaDataValueType.TypeFloat64:
				return 8;

			default:
				console.error( '[AIParser._getRequiredSize] Unknown GGUFMetaDataValueType:', type );
				return 0;
		}
	}


	/**
	 *
	 * @private
	 * @param {number} type
	 * @returns {boolean}
	 */
	_isTypeFixedSize( type ) {
		return ![
			GGUFMetaDataValueType.TypeArray,
			GGUFMetaDataValueType.TypeString,
		].includes( type );
	}


	/**
	 *
	 * @private
	 * @param {DataView} dataView
	 * @param {number} offset
	 * @returns {Array.<*, number>}
	 */
	_readArray( dataView, offset ) {
		const type = dataView.getUint32( offset, true );
		offset += 4;

		const length = Number( dataView.getBigUint64( offset, true ) );
		offset += 8;

		const arr = [];
		let offsetInc = 0;

		for( let i = 0; i < length; i++ ) {
			const [value, inc] = this._readValue( dataView, offset + offsetInc, type );
			arr.push( value );
			offsetInc += inc;
		}

		return [arr, 12 + offsetInc];
	}


	/**
	 *
	 * @param {DataView} dataView
	 * @param {number} offset
	 * @returns {Array.<string, number>}
	 */
	_readString( dataView, offset ) {
		const length = Number( dataView.getBigUint64( offset, true ) );
		offset += 8;

		const value = this._textDecoder.decode( dataView.buffer.slice( offset, offset + length ) );

		return [value, 8 + length];
	}


	/**
	 *
	 * @private
	 * @param {DataView} dataView
	 * @param {number} offset
	 * @param {number} type
	 * @returns {Array.<*, number>}
	 */
	_readValue( dataView, offset, type ) {
		switch( type ) {
			case GGUFMetaDataValueType.TypeUint8:
				return [dataView.getUint8( offset ), 1];

			case GGUFMetaDataValueType.TypeInt8:
				return [dataView.getInt8( offset ), 1];

			case GGUFMetaDataValueType.TypeUint16:
				return [dataView.getUint16( offset, true ), 2];

			case GGUFMetaDataValueType.TypeInt16:
				return [dataView.getInt16( offset, true ), 2];

			case GGUFMetaDataValueType.TypeUint32:
				return [dataView.getUint32( offset, true ), 4];

			case GGUFMetaDataValueType.TypeInt32:
				return [dataView.getInt32( offset, true ), 4];

			case GGUFMetaDataValueType.TypeFloat32:
				return [dataView.getFloat32( offset, true ), 4];

			case GGUFMetaDataValueType.TypeBool:
				return [dataView.getUint8( offset ) === 1, 1];

			case GGUFMetaDataValueType.TypeString:
				return this._readString( dataView, offset );

			case GGUFMetaDataValueType.TypeArray:
				return this._readArray( dataView, offset );

			case GGUFMetaDataValueType.TypeUint64:
				return [dataView.getBigUint64( offset, true ), 8];

			case GGUFMetaDataValueType.TypeInt64:
				return [dataView.getBigInt64( offset, true ), 8];

			case GGUFMetaDataValueType.TypeFloat64:
				return [dataView.getFloat64( offset, true ), 8];

			default:
				console.error( '[AIParser._readValue] Unknown GGUFMetaDataValueType:', type );
				return [null, 0];
		}
	}


	/**
	 *
	 * @returns {Promise<object>}
	 */
	async parse() {
		const headerDataView = new DataView( await this.file.slice( 0, 24 ).arrayBuffer() );
		const type = this._textDecoder.decode( headerDataView.buffer.slice( 0, 4 ) );
		const version = headerDataView.getUint32( 4, true );
		const tensorCount = Number( headerDataView.getBigUint64( 8, true ) );
		const kvCount = Number( headerDataView.getBigUint64( 16, true ) );
		const stepSize = 64;

		const meta = {};

		if( kvCount > 0 ) {
			const sliceOffset = 24;
			let sliceEnd = sliceOffset + kvCount * stepSize;
			let metaDataViewSlice = new DataView( await this.file.slice( sliceOffset, sliceEnd ).arrayBuffer() );

			let offset = 0;
			let numMetaEntries = 0;

			while( numMetaEntries < kvCount ) {
				const [key, offsetIncKey] = this._readString( metaDataViewSlice, offset );
				offset += offsetIncKey;

				const valType = metaDataViewSlice.getUint32( offset, true );
				offset += 4;

				const reqSize = this._getRequiredSize( metaDataViewSlice, offset, valType );
				const neededSize = reqSize - ( metaDataViewSlice.byteLength - offset );

				// Could probably be done a lot more efficiently by using streams.
				if( neededSize > 0 ) {
					console.warn( `[AIParser.parse] Need to read more of file, missing size of ${neededSize}` );
					const sliceEndNew = sliceEnd + neededSize + 1024;
					metaDataViewSlice = new DataView( await this.file.slice( sliceOffset, sliceEndNew ).arrayBuffer() );
					sliceEnd = sliceEndNew;
				}

				const [value, offsetIncVal] = this._readValue( metaDataViewSlice, offset, valType );
				offset += offsetIncVal;

				meta[key] = {
					type: GGUFMetaDataValueType.toName( valType ),
					value: value,
				};

				numMetaEntries++;
			}
		}

		const tensors = {};

		if( tensorCount > 0 ) {
			// TODO:
		}

		const info = {
			type: type,
			version: version,
			tensor_count: tensorCount,
			metadata_kv_count: kvCount,
			metadata: meta,
			tensors: tensors,
		};

		console.debug( '[AIParser.parse]', info );

		return info;
	}


};
