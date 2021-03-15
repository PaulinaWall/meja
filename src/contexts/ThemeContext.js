import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
	const [theme, setTheme] = useState({});

	const setThemeColor = (theme) => {
		if (theme === 'blue') {
			setTheme({
				backgroundColor: '#305F72',
				color: '#568EA6'
			});
		} else if ( theme === 'pink') {
			setTheme({
				backgroundColor: '#F1828D',
				color: '#FCD0BA'
			});
		} else if ( theme === 'beige') {
			setTheme({
				backgroundColor: '#DED1BD',
				color: '#FAF6F2'
			});
		} else if ( theme === 'green') {
			setTheme({
				backgroundColor: '#9DBEBB',
				color: '#77ACA2'
			});
		} else if ( theme === 'purple') {
			setTheme({
				backgroundColor: '#816EA7',
				color: '#B19CD9'
			});
		}
	};

	const getTheme = () => theme;

	return (
		<ThemeContext.Provider value={{
			setThemeColor,
			getTheme
		}}>
			<div className="theme-container" id={`theme-${theme}`}>
				{props.children}
			</div>
		</ThemeContext.Provider>
	);
}

export default ThemeContextProvider;