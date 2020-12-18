import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import ProjectForm from './common/ProjectForm';
import AboutForm from './common/AboutForm';
import LinksForm from './common/LinksForm';

const CreateForm = () => {
	const [projectText, setProjectText] = useState();
	const [projectUrl, setProjectUrl] = useState();
	const [projectImage, setProjectImage] = useState();
	const [aboutTitle, setAboutTitle] = useState();
	const [aboutText, setAboutText] = useState();
	const [aboutUrl, setAboutUrl] = useState();
	const [addProjectForm, setAddProjectForm] = useState([1]);
	const [addAboutForm, setAddAboutForm] = useState([1]);

	const handleOnClick = (e) => {
		if (e.target.innerHTML === 'Add Project') {
			setAddProjectForm([
				...addProjectForm,
				addProjectForm
			]);
		}

		if( e.target.innerHTML === 'Add Text Section') {
			setAddAboutForm([
				...addAboutForm,
				addAboutForm
			]);
		}
	};

	const onImageButtonClick = () => {
		console.log('click to add image');
	};

	const handleTextChange = (e) => {
		console.log(e.target.value);
	};

	const handleTitleChange = (e) => {
		console.log(e.target.value);
	};

	const handleUrlChange = (e) => {
		console.log(e.target.value);
	};

	return ( 
		<>
			<Container className="create-project">
				
				{
					addProjectForm.map((form, index) => (
						<ProjectForm 
							key={index}
							onClick={onImageButtonClick}
							handleTextChange={handleTextChange}
							handleUrlChange={handleUrlChange}
							image={projectImage}
							url={projectUrl}
							text={projectText}
						/>
						
					))
					
				}

				<Button className="button" onClick={handleOnClick} type="button">Add Project</Button>
			</Container>
			
			<Container className="add-about-text mt-5">
				{
					addAboutForm.map((form, index) => (
						<AboutForm 
							key={index}
							handleTextChange={handleTextChange}
							handleTitleChange={handleTitleChange}
							handleUrlChange={handleUrlChange}
							title={aboutTitle}
							text={aboutText}
							url={aboutUrl}
						/>
					))
				}
				
				<Button className="button" onClick={handleOnClick} type="button">Add Text Section</Button>
			</Container>

			<Container className="add-links-form mt-5">
				<LinksForm 
				/>
			</Container>
		</>
	 );
}
 
export default CreateForm;