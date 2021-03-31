import React, { createContext, useState } from 'react';

export const BackgroundContext = createContext();

const BackgroundContextProvider = (props) => {
	const [background, setBackground] = useState('');

	const getBackground = () => background;

	return (
		<BackgroundContext.Provider value={{
			getBackground,
			setBackground,
		}}>
			<div className="background-container" id={`background-${background}`}>
				{props.children}
			</div>
		</BackgroundContext.Provider>
	);
}

export default BackgroundContextProvider;