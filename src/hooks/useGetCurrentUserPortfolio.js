import { useEffect, useState } from 'react';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const useGetCurrentUserPortfolio = () => {
	const { currentUser } = useAuth();
	const [portfolio, setPortfolio] = useState();

	useEffect(() => {
		const unsubscribe = db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.onSnapshot((snapshot) => {

			snapshot.forEach(doc => {
				setPortfolio({
					id: doc.id,
					...doc.data(),
				});
			});
		})
		return unsubscribe;
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [portfolio?.id])

	return { portfolio }
};

export default useGetCurrentUserPortfolio;
