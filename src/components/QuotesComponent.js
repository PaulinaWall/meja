import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import { quotes } from '../assets/quotes';

const QuotesComponent = () => {
	return (
		<span className="quote-text">
			<FontAwesomeIcon className="left-quote" icon={faQuoteLeft}/>
			{quotes[Math.floor(Math.random() * 8)]}
			<FontAwesomeIcon className="right-quote" icon={faQuoteRight}/>
		</span>
	);
};

export default QuotesComponent;
