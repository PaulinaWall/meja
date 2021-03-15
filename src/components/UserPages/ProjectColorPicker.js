import React, { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

const ProjectColorPicker = () => {
	const { setThemeColor } = useContext(ThemeContext);

	return (
		<div>
			<div>
				<div className="d-flex circle" onClick={() => setThemeColor('blue')}>
					<div className="blue-theme-1 theme-color-section"></div>
					<div className="blue-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setThemeColor('pink')}>
					<div className="peach-theme-1 theme-color-section"></div>
					<div className="peach-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setThemeColor('beige')}>
					<div className="beige-theme-1 theme-color-section"></div>
					<div className="beige-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setThemeColor('green')}>
					<div className="green-theme-1 theme-color-section"></div>
					<div className="green-theme-2 theme-color-section"></div>
				</div>
				<div className="d-flex" onClick={() => setThemeColor('purple')}>
					<div className="purple-theme-1 theme-color-section"></div>
					<div className="purple-theme-2 theme-color-section"></div>
				</div>
			</div>
		</div>
	);
}

export default ProjectColorPicker;