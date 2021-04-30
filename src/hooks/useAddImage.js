import { useState, useEffect } from 'react';

import { storage } from '../firebase';

const useAddImage = (imageToAdd) => {
	const [imageUrl, setImageUrl] = useState(null);
	const [projectImage, setProjectImage] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(null);
	const [error, setError] = useState(null);
	
	useEffect(() => {
			if(!imageToAdd) {
				return;
			};
			const storageRef = storage.ref();
	
			const fileRef = storageRef.child(imageToAdd.name);
			
			const uploadTask = fileRef.put(imageToAdd);
	
			uploadTask.on('state_changed', taskSnapshot => {
				setUploadProgress(Math.round(
					(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			});
	
			uploadTask.then(snapshot => {
				snapshot.ref.getDownloadURL().then(url => {
					setImageUrl(url);
					setProjectImage({
						name: imageToAdd.name,
						size: imageToAdd.size,
						type: imageToAdd.type,
						path: snapshot.ref.fullPath,
						url,
					});
					setUploadProgress(null);
				});
			}).catch(error => {
				setError(error.message)
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageToAdd]);

	return { uploadProgress, imageUrl, projectImage, error };
}

export default useAddImage;
