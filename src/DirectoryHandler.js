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
	 * @param {FileSystemDirectoryEntry} dir
	 * @param {function}                 cb
	 */
	getParser( dir, cb ) {
		const dirReader = dir.createReader();

		dirReader.readEntries(
			entries => {
				if( this._containsDICOMDIRFile( entries ) ) {
					const parser = new Evy.DICOMParser( {
						dir: dir,
						entries: entries,
						mimeType: 'application/dicom'
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
