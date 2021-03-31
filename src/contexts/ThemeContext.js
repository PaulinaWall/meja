import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
	const [theme, setTheme] = useState('');

	const getTheme = () => theme;

	return (
		<ThemeContext.Provider value={{
			getTheme,
			setTheme,
		}}>
			<div className="theme-container" id={`theme-${theme}`}>
				{props.children}
			</div>
		</ThemeContext.Provider>
	);
}

export default ThemeContextProvider;