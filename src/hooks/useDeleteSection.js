import { useEffect, useState } from "react"

import { db, storage } from '../firebase';
import useGetCurrentUserPortfolio from './useGetCurrentUserPortfolio';

const useDeleteSection = async ({ part, index }) => {
	const [message, setMessage] = useState(false);
	const [error, setError] = useState(false);
	const { portfolio } = useGetCurrentUserPortfolio();
	
	useEffect(() => {
		if (!part) {
			return;
		}
		
		if(part === 'email'){
			db.collection("portfolios").doc(portfolio.id).update({
				[part]: ''
			})
			.then(() => {
				setMessage(`Document successfully deleted!`);
			}).catch((error) => {
				setError(`Error removing document: ${error}`);
			});
		} else if(part === 'projects') {
			const updatedPart = portfolio[part];
			updatedPart.splice(index, 1);
			db.collection('portfolios').doc(portfolio.id)
			.get()
			.then((doc) => {
				const image = doc.data().projects[index].image;
				db.collection("portfolios").doc(portfolio.id).update({
					[part]: updatedPart 
				});
				const imageExists = updatedPart.some((part) => part.image.path === image.path);
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
			}).catch((error) => {
				setError(`Error removing document: ${error}`);
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [part, index])
	return { error, message }
}

export default useDeleteSection;
