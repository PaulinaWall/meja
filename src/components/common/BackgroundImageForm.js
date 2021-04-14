import React, { useContext } from 'react';
import { Form, Button, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import blue from '../../assets/images/blue.png'
import purple from '../../assets/images/purple.svg'
import green from '../../assets/images/green.png'
import lightblue from '../../assets/images/lightblue.png'
import webdesignYellow from '../../assets/images/webdesignYellow.png'
import webdesignPink from '../../assets/images/webdesignPink.png'
import webdesignBlue from '../../assets/images/webdesignBlue.png'
import webdesignPurple from '../../assets/images/webdesignPurple.png'
import webdesignGrey from '../../assets/images/webdesignGrey.png'
import webdesignLightBlue from '../../assets/images/webdesignLightBlue.jpeg'
import webdesignBeige from '../../assets/images/webdesignBeige.png'
import { BackgroundContext } from '../../contexts/BackgroundContext';

const BackgroundImageForm = ({ handleSaveOnClick, setFormState }) => {
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
				<Image src={purple} onClick={() => setBackground(purple)} className="background-image" />
				<Image src={webdesignYellow} onClick={() => setBackground(webdesignYellow)} className="background-image" />
				<Image src={webdesignPink} onClick={() => setBackground(webdesignPink)} className="background-image" />
				<Image src={webdesignBlue} onClick={() => setBackground(webdesignBlue)} className="background-image" />
				<Image src={webdesignPurple} onClick={() => setBackground(webdesignPurple)} className="background-image" />
				<Image src={webdesignGrey} onClick={() => setBackground(webdesignGrey)} className="background-image" />
				<Image src={webdesignBeige} onClick={() => setBackground(webdesignBeige)} className="background-image" />
				<Image src={webdesignLightBlue} onClick={() => setBackground(webdesignLightBlue)} className="background-image" />
			</div>
			<div className="d-flex justify-content-end">
				<Button className="button btn-secondary mr-3" size="sm" onClick={() => setBackground('')}>
					<OverlayTrigger
						transition={false}
						placement="top"
						overlay={
							<Tooltip>
								Press here and save to not add an image.
							</Tooltip>
						}
					>
						<span>No image</span>
					</OverlayTrigger>
				</Button>
				<Button className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">
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
