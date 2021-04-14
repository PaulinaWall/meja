import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useGetSinglePortfolio = (portfolioId) => {
	const [portfolio, setPortfolio] = useState();
	const [loadingPortfolio, setLoadingPortfolio] = useState(true);

	useEffect(() => {
		const unsubscribe = db.collection('portfolios').doc(portfolioId)
		.onSnapshot(snapshot => {
			setPortfolio(snapshot.data());
			setLoadingPortfolio(false)
		})

		return unsubscribe;
	}, [portfolioId])

	return { portfolio, loadingPortfolio };
}

export default useGetSinglePortfolio;