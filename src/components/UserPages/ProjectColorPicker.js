import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

const ProjectColorPicker = () => {
	const { setTheme } = useContext(ThemeContext);

	return (
		<div>
			<div>
				<div className="d-flex circle" onClick={() => setTheme('blue')}>
					<div className="blue-theme-1 theme-color-section"></div>
					<div className="blue-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setTheme('pink')}>
					<div className="peach-theme-1 theme-color-section"></div>
					<div className="peach-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setTheme('beige')}>
					<div className="beige-theme-1 theme-color-section"></div>
					<div className="beige-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setTheme('green')}>
					<div className="green-theme-1 theme-color-section"></div>
					<div className="green-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setTheme('purple')}>
					<div className="purple-theme-1 theme-color-section"></div>
					<div className="purple-theme-2 theme-color-section"></div>
				</div>
			</div>
		</div>
	);
}

export default ProjectColorPicker;