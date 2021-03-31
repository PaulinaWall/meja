import React, { useContext } from 'react';
import { Form, Button, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import blue from '../../assets/images/blue.png'
import purple from '../../assets/images/purple.svg'
import green from '../../assets/images/green.png'
import lightblue from '../../assets/images/lightblue.png'
import orange from '../../assets/images/orange.png'
import { BackgroundContext } from '../../contexts/BackgroundContext';

const BackgroundImageForm = ({ background, handleSaveOnClick, setFormState }) => {
	const { setBackground } = useContext(BackgroundContext);

	return (
		<Form className="form">
			<div className="delete-icon">
				<FontAwesomeIcon
					icon={faTimes}
					onClick={setFormState}
				/>
			</div>
			<div>
				<Image src={blue} onClick={() => setBackground(blue)} className="background-image" />
				<Image src={lightblue} onClick={() => setBackground(lightblue)} className="background-image" />
				<Image src={green} onClick={() => setBackground(green)} className="background-image" />
				<Image src={orange} onClick={() => setBackground(orange)} className="background-image" />
				<Image src={purple} onClick={() => setBackground(purple)} className="background-image" />
				{/* <div onClick={() => setBackground('')} className="background-image-none">None</div> */}
			</div>
			<div className="d-flex justify-content-end">
				<Button disabled={!background} className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">
					<OverlayTrigger
						transition={false}
						placement="top"
						overlay={
							<Tooltip>
								Choose an Image for landing page background
							</Tooltip>
						}
					>
						<span>Save</span>
					</OverlayTrigger>
				</Button>
			</div>
		</Form>
	);
};

export default BackgroundImageForm;
