import React, { createContext, useState } from 'react';

export const CurrentPortfolioContext = createContext();

const CurrentPortfolioContextProvider = (props) => {
	const [portfolioId, setPortfolioId] = useState('');

	const getPortfolioId = () => portfolioId;

	return (
		<CurrentPortfolioContext.Provider value={{
			getPortfolioId,
			setPortfolioId,
		}}>
			<div className="portfolio-state-container">
				{props.children}
			</div>
		</CurrentPortfolioContext.Provider>
	);
}

export default CurrentPortfolioContextProvider;