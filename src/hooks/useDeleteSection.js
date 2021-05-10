import { useEffect, useState } from "react"

import { db, storage } from '../firebase';
import useGetCurrentUserPortfolio from './useGetCurrentUserPortfolio';

const useDeleteSection = async (deleteSection, setDeleteSection) => {
	const { part, index } = deleteSection;
	const [message, setMessage] = useState(false);
	const [error, setError] = useState(false);
	const { portfolio } = useGetCurrentUserPortfolio();
	
	useEffect(() => {
		if (!part) {
			return;
		}
		const unsubscribe = (async () => {
			if(part === 'email'){
				db.collection("portfolios").doc(portfolio.id).update({
					[part]: ''
				})
				.then(() => {
					setMessage(`Document successfully deleted!`);
					setDeleteSection(false);
				}).catch((error) => {
					setError(`Error removing document: ${error}`);
				});
			} else if(part === 'projects') {
				const updatedPart = portfolio[part];
				updatedPart.splice(index, 1);
				await db.collection('portfolios').doc(portfolio.id)
				.get()
				.then((doc) => {
					const image = doc.data().projects[index].image;
					db.collection("portfolios").doc(portfolio.id).update({
						[part]: updatedPart 
					});
					const imageExists = updatedPart.some((part) => part.image.path === image.path);
					setDeleteSection(false);
					if(imageExists) {
						return
					}else{
						storage.ref(image.path).delete();
					}
				})
			}else{
				const updatedPart = portfolio[part];
				updatedPart.splice(index, 1);
				db.collection("portfolios").doc(portfolio.id).update({
					[part]: updatedPart 
				})
				.then(() => {
					setMessage(`Document successfully deleted!`);
					setDeleteSection(false);
				}).catch((error) => {
					setError(`Error removing document: ${error}`);
				});
			}
		})();

		return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deleteSection])

	return { error, message }
}

export default useDeleteSection;
