import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ProjectColorPicker = () => {
	const [checked, setChecked] = useState(false);
	const handleToggleTheme = () => {
		setChecked(!checked);
	}

	return (
		<div>
			<h2>Choose your color theme</h2>
			<ul className="theme-color-list">
				<li className="theme-color-list-item">
					<div className="d-flex">
						<div className="blue-theme-1 theme-color-section">#F0B7A4</div>
						<div className="blue-theme-2 theme-color-section">#F1D1B5</div>
						<div className="blue-theme-3 theme-color-section">#568EA6</div>
						<div className="blue-theme-4 theme-color-section">#305F72</div>
					</div>
					<FontAwesomeIcon
					 	icon={faCheck} 
						className={checked ? 'checked' : 'unChecked'} 
						onClick={handleToggleTheme}
					/>
				</li>
				<li className="theme-color-list-item">
					<div className="d-flex">
						<div className="peach-theme-1 theme-color-section">#8FB9A8</div>
						<div className="peach-theme-2 theme-color-section">#FEFAD4</div>
						<div className="peach-theme-3 theme-color-section">#FCD0BA</div>
						<div className="peach-theme-4 theme-color-section">#F1828D</div>
					</div>
					<FontAwesomeIcon
						icon={faCheck} 
						className={checked ? 'checked' : 'unChecked'} 
						onClick={handleToggleTheme}
					/>
				</li>
			</ul>
		</div>
	);
}

export default ProjectColorPicker;