import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

const useGetPortfolio = () => {
	const [portfolio, setPortfolio] = useState();
	const { currentUser } = useAuth();

	useEffect(() => {
		const unsubscribe = db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				setPortfolio(doc.data());
			})
		})
		.catch((e) => {
			console.error('error', e);
		})
	return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { portfolio }
}
 
export default useGetPortfolio;