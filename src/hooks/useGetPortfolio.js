import { useEffect, useState } from 'react';
import { db } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

const useGetPortfolio = () => {
	const [portfolio, setPortfolio] = useState([]);

	const { currentUser } = useAuth();

	useEffect(() => {
		const unsubscribe = db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.onSnapshot((snapshot) => {
			const portfolioArray = [];

			snapshot.forEach(doc => {
				portfolioArray.push({
					id: doc.id,
					...doc.data(),
				});
			});
			console.log('portfolioArray in getportfolio', portfolioArray)
			setPortfolio(portfolioArray);
		})
		return unsubscribe;

	}, [currentUser]);

	return { portfolio }
}

export default useGetPortfolio;