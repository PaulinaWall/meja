import React, { useRef } from 'react';
import ProjectForm from './common/ProjectForm';
import { Button } from 'react-bootstrap';

const CreateForm = () => {
	const imageRef = useRef();
	const urlRef = useRef();
	const textRef = useRef();

	const handleOnClick = (e) => {
		e.preventDefault();
		console.log('Add more form')
	};

	const onImageButtonClick = () => {
		console.log('click ti add image');
	};

	const handleTextChange = (e) => {
		console.log(e.target.value);
	};

	const handleUrlChange = (e) => {
		console.log(e.target.value);
	};

	return ( 
		<>
			<ProjectForm 
				onClick={onImageButtonClick}
				handleTextChange={handleTextChange}
				handleUrlChange={handleUrlChange}
				image={imageRef}
				url={urlRef}
				text={textRef}
			/>

			<Button onClick={handleOnClick} type="button">Add project</Button>
		</>
	 );
}
 
export default CreateForm;