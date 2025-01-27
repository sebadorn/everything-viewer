import { FileHandler } from './FileHandler.js';


export const DirectoryHandler = {


	/**
	 *
	 * @private
	 * @param  {FileSystemEntry[]} entries
	 * @return {boolean}
	 */
	_containsDICOMDIRFile( entries ) {
		const match = entries.find( entry => {
			return (
				entry.isFile &&
				entry.name.toLowerCase() === 'dicomdir'
			);
		} );

		return !!match;
	},


	/**
	 *
	 * @private
	 * @param   {FileSystemEntry[]} entries
	 * @returns {Promise<boolean>}
	 */
	async _containsDICOMFiles( entries ) {
		let num = 0;

		for( let i = 0; i < entries.length; i++ ) {
			const entry = entries[i];

			if( await FileHandler.isDICOMFile( entry ) ) {
				num++;

				if( num > 1 ) {
					return true;
				}
			}
		}

		return false;
	},


	/**
	 *
	 * @param {FileSystemDirectoryEntry} dir
	 * @param {function}                 cb
	 */
	getParser( dir, cb ) {
		const dirReader = dir.createReader();

		dirReader.readEntries(
			async entries => {
				if( this._containsDICOMDIRFile( entries ) ) {
					const { DICOMParser } = await import( './parser/DICOMParser.js' );

					const parser = new DICOMParser( {
						dir: dir,
						entries: entries,
						mimeType: 'application/dicom',
					} );

					cb( null, parser );
				}
				else if( await this._containsDICOMFiles( entries ) ) {
					const { DICOMParser } = await import( './parser/DICOMParser.js' );

					const list = entries
						.filter( async entry => await FileHandler.isDICOMFile( entry ) )
						.sort( ( a, b ) => a.name.localeCompare( b.name, { numeric: true } ) );

					const parser = new DICOMParser( {
						dir: dir,
						entries: list,
						mimeType: 'application/dicom',
					} );

					cb( null, parser );
				}
				else {
					const err = new Error( `No fitting parser for directory entries in ${dir.name} found.` );
					console.error( err );
					cb( err );
				}
			},
			err => {
				console.error( err );
				cb( err );
			}
		);
	},


};
