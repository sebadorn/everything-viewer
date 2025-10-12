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
			case this.TypeUint8: return 'Uint8';
			case this.TypeInt8: return 'Int8';
			case this.TypeUint16: return 'Uint16';
			case this.TypeInt16: return 'Int16';
			case this.TypeUint32: return 'Uint32';
			case this.TypeInt32: return 'Int32';
			case this.TypeFloat32: return 'Float32';
			case this.TypeBool: return 'Bool';
			case this.TypeString: return 'String';
			case this.TypeArray: return 'Array';
			case this.TypeUint64: return 'Uint64';
			case this.TypeInt64: return 'Int64';
			case this.TypeFloat64: return 'Float64';
			default: return String( value );
		}
	},
};


const GGUFTensorGGMLType = {
    Type_F32: 0,
    Type_F16: 1,
    Type_Q4_0: 2,
    Type_Q4_1: 3,
    Type_Q4_2: 4, // support has been removed
    Type_Q4_3: 5, // support has been removed
    Type_Q5_0: 6,
    Type_Q5_1: 7,
    Type_Q8_0: 8,
    Type_Q8_1: 9,
    Type_Q2_K: 10,
    Type_Q3_K: 11,
    Type_Q4_K: 12,
    Type_Q5_K: 13,
    Type_Q6_K: 14,
    Type_Q8_K: 15,
    Type_IQ2_XXS: 16,
    Type_IQ2_XS: 17,
    Type_IQ3_XXS: 18,
    Type_IQ1_S: 19,
    Type_IQ4_NL: 20,
    Type_IQ3_S: 21,
    Type_IQ2_S: 22,
    Type_IQ4_XS: 23,
    Type_I8: 24,
    Type_I16: 25,
    Type_I32: 26,
    Type_I64: 27,
    Type_F64: 28,
    Type_IQ1_M: 29,
    Type_BF16: 30,
    Type_Q4_0_4_4: 31, // support has been removed from gguf files
    Type_Q4_0_4_8: 32,
    Type_Q4_0_8_8: 33,
    Type_TQ1_0: 34,
    Type_TQ2_0: 35,
    Type_IQ4_NL_4_4: 36,
    Type_IQ4_NL_4_8: 37,
    Type_IQ4_NL_8_8: 38,
    Type_MXFP4: 39, // MXFP4 (1 block)
    Type_COUNT: 40,

	/**
	 *
	 * @param {number} value
	 * @returns {string}
	 */
	toName( value ) {
		const prefixLength = 'Type_'.length;

		for( const key in this ) {
			const keyVal = this[key];

			if( typeof key !== 'string' || typeof keyVal !== 'number' ) {
				continue;
			}

			if( keyVal === value ) {
				return key.substring( prefixLength );
			}
		}

		return String( value );
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
			const [value, inc] = this._readValueMetaData( dataView, offset + offsetInc, type );
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
	 * @param {number} type - Value from `GGUFMetaDataValueType`
	 * @returns {Array.<*, number>}
	 */
	_readValueMetaData( dataView, offset, type ) {
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
				console.error( '[AIParser._readValueMetaData] Unknown GGUFMetaDataValueType:', type );
				return [null, 0];
		}
	}


	/**
	 *
	 * @private
	 * @param {DataView} headerDataView
	 * @returns {Promise<import('./AIPlugin.js').AIModelInfo>}
	 */
	async _parseGGUF( headerDataView ) {
		const version = headerDataView.getUint32( 4, true );
		const tensorCount = Number( headerDataView.getBigUint64( 8, true ) );
		const kvCount = Number( headerDataView.getBigUint64( 16, true ) );

		let meta = {};
		let metaOffset = 0;

		if( kvCount > 0 ) {
			const result = await this._parseGGUFMetadata( kvCount, 24 );
			meta = result.data;
			metaOffset = result.sectionSize;
		}

		let tensors = {};

		if( tensorCount > 0 ) {
			const result = await this._parseGGUFTensors( tensorCount, 24 + metaOffset );
			tensors = result.data;
		}

		return {
			version: version,
			tensor_count: tensorCount,
			metadata_kv_count: kvCount,
			metadata: meta,
			tensors: tensors,
		};
	}


	/**
	 *
	 * @param {number} kvCount
	 * @param {number} offsetToSection
	 * @returns {Promise<object>}
	 */
	async _parseGGUFMetadata( kvCount, offsetToSection ) {
		const meta = {};
		const stepSize = 64;

		let sliceEnd = offsetToSection + kvCount * stepSize;
		let metaDataViewSlice = new DataView( await this.file.slice( offsetToSection, sliceEnd ).arrayBuffer() );

		let offset = 0;
		let numEntries = 0;

		while( numEntries < kvCount ) {
			const [key, offsetIncKey] = this._readString( metaDataViewSlice, offset );
			offset += offsetIncKey;

			const valType = metaDataViewSlice.getUint32( offset, true );
			offset += 4;

			const reqSize = this._getRequiredSize( metaDataViewSlice, offset, valType );
			const neededSize = reqSize - ( metaDataViewSlice.byteLength - offset );

			// Could probably be done a lot more efficiently by using streams.
			if( neededSize > 0 ) {
				console.warn( `[AIParser._parseGGUFMetadata] Need to read more of file, missing size of ${neededSize}` );
				const sliceEndNew = sliceEnd + neededSize + 1024;
				metaDataViewSlice = new DataView( await this.file.slice( offsetToSection, sliceEndNew ).arrayBuffer() );
				sliceEnd = sliceEndNew;
			}

			const [value, offsetIncVal] = this._readValueMetaData( metaDataViewSlice, offset, valType );
			offset += offsetIncVal;

			meta[key] = {
				type: GGUFMetaDataValueType.toName( valType ),
				value: value,
			};

			numEntries++;
		}

		return {
			data: meta,
			sectionSize: offset,
		};
	}


	/**
	 *
	 * @param {number} tensorCount
	 * @returns {Promise<object>}
	 */
	async _parseGGUFTensors( tensorCount, offsetToSection ) {
		const tensors = [];

		// name (string with max length) + num dimensions (max 4) + dimensions (array) + type + tensor data offset
		const entryMaxSize = 64 + 4 + 4 * 8 + 4 + 8;
		const sectionMaxSize = tensorCount * entryMaxSize;
		let tensorViewSlice = new DataView(
			await this.file.slice( offsetToSection, offsetToSection + sectionMaxSize ).arrayBuffer()
		);

		let offset = 0;
		let numEntries = 0;

		while( numEntries < tensorCount ) {
			const [name, offsetIncName] = this._readString( tensorViewSlice, offset );
			offset += offsetIncName;

			const numDim = tensorViewSlice.getUint32( offset, true );
			offset += 4;

			const dimensions = [];

			for( let i = 0; i < numDim; i++ ) {
				dimensions.push( tensorViewSlice.getBigUint64( offset, true ) );
				offset += 8;
			}

			const type = tensorViewSlice.getUint32( offset, true );
			offset += 4;

			const tensorDataOffset = tensorViewSlice.getBigUint64( offset, true );
			offset += 8;

			tensors.push( {
				name: name,
				n_dimensions: numDim,
				dimensions: dimensions,
				type: GGUFTensorGGMLType.toName( type ),
				offset: tensorDataOffset,
			} );

			numEntries++;
		}

		return {
			data: tensors,
			sectionSize: offset,
		};
	}


	/**
	 *
	 * @private
	 * @param {DataView} headerDataView
	 * @returns {import('./AIPlugin.js').AIModelInfo}
	 */
	_parseSafetensors( headerDataView ) {
		const info = {};

		try {
			const json = this._textDecoder.decode( headerDataView.buffer.slice() );
			const data = JSON.parse( json );

			if( data.__metadata__ ) {
				info.metadata = data.__metadata__;
				delete data.__metadata__;
			}

			info.tensors = data;
		}
		catch( err ) {
			console.error( '[AI._parseSafetensors]', err );
		}

		return info;
	}


	/**
	 *
	 * @returns {Promise<import('./AIPlugin.js').AIModelInfo>}
	 */
	async parse() {

		/** @type {import('./AIPlugin.js').AIModelInfo} */
		let info = {};

		if( this.mimeType === 'application/x-safetensors' ) {
			const headerSizeView = new DataView( await this.file.slice( 0, 8 ).arrayBuffer() );
			const headerSize = headerSizeView.getBigUint64( 0, true );

			const headerDataView = new DataView( await this.file.slice( 8, Number( headerSize ) + 8 ).arrayBuffer() );
			info = this._parseSafetensors( headerDataView );
			info.type ??= 'Safetensors';

			console.debug( '[AIParser.parse] Safetensors', info );
		}
		else if( this.mimeType === 'application/x-gguf' ) {
			const headerDataView = new DataView( await this.file.slice( 0, 24 ).arrayBuffer() );
			const type = this._textDecoder.decode( headerDataView.buffer.slice( 0, 4 ) );

			info.type = type;

			if( type === 'GGUF' ) {
				info = await this._parseGGUF( headerDataView );
				info.type ??= type;
			}

			console.debug( '[AIParser.parse] GGUF', info );
		}

		return info;
	}


};
