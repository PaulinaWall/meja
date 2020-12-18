import React, { useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import ProjectForm from './common/ProjectForm';
import AboutForm from './common/AboutForm';
import LinksForm from './common/LinksForm';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const CreateForm = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const [projectText, setProjectText] = useState();
	const [projectUrl, setProjectUrl] = useState();
	const [projectImage, setProjectImage] = useState();
	const [addProjectForm, setAddProjectForm] = useState([1]);

	const [aboutTitle, setAboutTitle] = useState();
	const [aboutText, setAboutText] = useState();
	const [aboutUrl, setAboutUrl] = useState();
	const [addAboutForm, setAddAboutForm] = useState([1]);

	const [gitHubUrl, setGithubUrl] = useState();
	const [linkedinUrl, setLinkedinUrl] = useState();
	const [facebookUrl, setFacebookUrl] = useState();

	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const handleCreatePortfolioOnClick = async (e) => {
		try {
			await db.collection('portfolios').add({
				owner: currentUser.uid,
				projects: [
					{
						image: 'image',
						url: projectUrl,
						text: projectText,
					},
				],
				about: [
					{
						title: aboutTitle,
						text: aboutText,
						url: aboutUrl,
					},
				],
				links: {
					github: gitHubUrl,
					facebook: facebookUrl,
					linkedin: linkedinUrl,
				},
			},)
			// navigate(`/${currentUser.displayName}/`);
		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	}

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

	return ( 
		<>
			{error && 
				(<Alert variant="danger">{error}</Alert>)
			}
			<Container className="create-project">
				
				{
					addProjectForm.map((form, index) => (
						<ProjectForm 
							key={index}
							onClick={onImageButtonClick}
							handleTextChange={(e) => setProjectText(e.target.value)}
							handleUrlChange={(e) => setProjectUrl(e.target.value)}
						/>
						
					))
					
				}
				<div className="d-flex justify-content-end">
					<Button className="button btn-secondary" onClick={handleOnClick} type="button">Add Project</Button>
				</div>
			</Container>
			
			<Container className="add-about-text mt-5">
				{
					addAboutForm.map((form, index) => (
						<AboutForm 
							key={index}
							handleTextChange={(e) => setAboutText(e.target.value)}
							handleTitleChange={(e) => setAboutTitle(e.target.value)}
							handleUrlChange={(e) => setAboutUrl(e.target.value)}
						/>
					))
				}
				
				<div className="d-flex justify-content-end">
					<Button className="button btn-secondary" onClick={handleOnClick} type="button">Add Text Section</Button>
				</div>
			</Container>

			<Container className="add-links-form mt-5">
				<LinksForm 
					handleGithubChange={(e) => setGithubUrl(e.target.value)}
					handleLinkedinChange={(e) => setLinkedinUrl(e.target.value)}
					handleFacebookChange={(e) => setFacebookUrl(e.target.value)}
				/>
			</Container>

			<div className="d-flex justify-content-end">
				<Button className="mr-3 button btn-secondary" onClick={handleCreatePortfolioOnClick} type="button" disabled={loading}>Create Portfolio</Button>
			</div>
		</>
	 );
}
 
export default CreateForm;