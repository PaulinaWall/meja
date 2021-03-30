import { useEffect, useState, useContext } from 'react';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const useGetPortfolio = () => {
	const [portfolio, setPortfolio] = useState();
	const [loading, setLoading] = useState(true);
	const { setTheme } = useContext(ThemeContext);
	const { currentUser } = useAuth();

	useEffect(() => {
		if(!currentUser){
			return;
		}
		const unsubscribe = db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				setTheme(doc.data().theme)
				setPortfolio(doc.data());
				setLoading(false);
			})
		})
		.catch((e) => {
			console.error('error', e);
		})
	return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { portfolio, loading }
}
 
export default useGetPortfolio;