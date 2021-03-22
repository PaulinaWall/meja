import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from '../../contexts/ThemeContext';

const ProjectColorPicker = ({ setFormState, handleSaveOnClick }) => {
	const { setTheme } = useContext(ThemeContext);

	return (
		<Form className="form">
			<div className="delete-icon">
				<FontAwesomeIcon
					icon={faTimes}
					onClick={setFormState}
				/>
			</div>
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
			<div className="d-flex justify-content-end">
				<Button className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">Save Theme</Button>
			</div>
		</Form>
	);
}

export default ProjectColorPicker;