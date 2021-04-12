import { useEffect, useState, useContext } from 'react';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { CurrentPortfolioContext } from '../contexts/CurrentPortfolioContext';

const useGetCurrentUserPortfolio = () => {
	const { currentUser } = useAuth();
	const { setPortfolioId } = useContext(CurrentPortfolioContext);
	const [portfolio, setPortfolio] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(false);

	useEffect(() => {
		db.collection('portfolios')
			.where('owner', '==', currentUser.uid)
			.get()
			.then((querySnapshot) => {
				setLoading(false);
				if(querySnapshot.empty){
					const newPortfolio = {
						owner: currentUser.uid,
						about: [],
						projects: [],
						links: [],
						email: '',
						theme: '',
						background: '',
					}
			
					db.collection("portfolios").add( newPortfolio )
					.then(docRef => {
						setLoading(false);
						setPortfolioId(docRef.id);
						setPortfolio({
							id: docRef.id,
							...newPortfolio
						});
						setMessage('Your new portfolio is just started!');
					})
					.catch((e) => {
						setError(e.message);
					})
				}
				querySnapshot.forEach((doc) => {
					setPortfolioId(doc.id);
					setPortfolio({
						id: doc.id,
						...doc.data(),
					});
				})
			})
			.catch((e) => {
				setError(e.message);
			})
	}, [])

	useEffect(() => {
		const unsubscribe = db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.onSnapshot((snapshot) => {

			snapshot.forEach(doc => {
				setPortfolioId(doc.id);
				setPortfolio({
					id: doc.id,
					...doc.data(),
				});
			});
		})
		return unsubscribe;
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [portfolio?.id])

	return { portfolio, loading, error, message }
};

export default useGetCurrentUserPortfolio;
