import React, { useState } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import ProjectForm from './common/ProjectForm';
import AboutForm from './common/AboutForm';
import LinksForm from './common/LinksForm';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const CreateForm = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const [addProjectButton, setAddProjectButton] = useState(false);
	const [projectText, setProjectText] = useState(null);
	const [projectUrl, setProjectUrl] = useState(null);
	const [projectImage, setProjectImage] = useState(null);
	const [projectObjects, setProjectObjects] = useState([]);
	const [addProjectForm, setAddProjectForm] = useState([1]);

	const [addAboutButton, setAddAboutButton] = useState(false);
	const [aboutTitle, setAboutTitle] = useState(null);
	const [aboutText, setAboutText] = useState(null);
	const [aboutUrl, setAboutUrl] = useState(null);
	const [aboutObjects, setAboutObjects] = useState([]);
	const [addAboutForm, setAddAboutForm] = useState([1]);

	const [gitHubUrl, setGithubUrl] = useState(null);
	const [linkedinUrl, setLinkedinUrl] = useState(null);
	const [facebookUrl, setFacebookUrl] = useState(null);

	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const addImageToStorage = (image) => {
		console.log('e.target.Image', image)
		if(!image) {
			return;
		};
		const storageRef = storage.ref();

		//TODO We can add a folder for every owner in firebase and send to right owner folder `${owner.id}/${image.name}`
		const fileRef = storageRef.child(image.name);
		
		const uploadTask = fileRef.put(image);

		uploadTask.then(snapshot => {
			snapshot.ref.getDownloadURL().then(url => {
				setUploadedImageUrl(url);
				setProjectImage({
					name: image.name,
					size: image.size,
					type: image.type,
					path: snapshot.ref.fullPath,
					url,
				});
			});
		}).catch(error => {
			setError(error.message)
		});
		console.log("uploadTask:", uploadTask);
	};

	const handleCreatePortfolioOnClick = async () => {
		console.log(aboutObjects, projectObjects)
		try {
			await db.collection('portfolios').add({
				owner: currentUser.uid,
				projects: projectObjects,
				about: aboutObjects,
				links: {
					github: gitHubUrl,
					facebook: facebookUrl,
					linkedin: linkedinUrl,
				},
			},)
			console.log('portfolio updated successfully')
			// navigate(`/${currentUser.displayName}/`);
		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	}

	const handleSaveOnClick = (index, e) => {
		if (e.target.innerHTML === 'Save Project') {
			setProjectObjects([
				...projectObjects,
				{
					id: index,
					image: projectImage,
					projectUrl: projectUrl,
					text: projectText,
				}
			]);
			setAddProjectButton(true);
			setProjectImage(null);
			setProjectUrl(null);
			setProjectText(null);
		}

		if( e.target.innerHTML === 'Save Section') {
			setAboutObjects([
				...aboutObjects,
				{
					id: index,
					title: aboutTitle,
					text: aboutText,
					url: aboutUrl,
				},
			])
			setAddAboutButton(true);
			setAboutTitle(null);
			setAboutText(null);
			setAboutUrl(null);
		}
	}

	const handleAddFormOnClick = (e) => {
		if (e.target.innerHTML === 'Another Project') {
			setAddProjectForm([
				...addProjectForm,
				addProjectForm
			]);
			setAddProjectButton(false);
		}

		if( e.target.innerHTML === 'Another Section') {
			setAddAboutForm([
				...addAboutForm,
				addAboutForm
			]);
			setAddAboutButton(false);
		}
	};

	const handleImageChange = (e) => {
		// if (e.target.files[0]) {
			
		// };
		console.log('setimage', e.target.files[0])
		addImageToStorage(e.target.files[0]);
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
							uploadedImageUrl={uploadedImageUrl}
							handleSaveOnClick={(e) => handleSaveOnClick(index, e)}
							handleImageChange={handleImageChange}
							handleTextChange={(e) => setProjectText(e.target.value)}
							handleUrlChange={(e) => setProjectUrl(e.target.value)}
						/>
						
					))
					
				}
				{
					addProjectButton ? (
						<div className="d-flex justify-content-end">
							<Button className="button btn-secondary" onClick={handleAddFormOnClick} type="button">Another Project</Button>
						</div>
					):(
						''
					)
				}
			</Container>
			
			<Container className="add-about-text mt-5">
				{
					addAboutForm.map((form, index) => (
						<AboutForm 
							key={index}
							handleSaveOnClick={(e) => handleSaveOnClick(index, e)}
							handleTextChange={(e) => setAboutText(e.target.value)}
							handleTitleChange={(e) => setAboutTitle(e.target.value)}
							handleUrlChange={(e) => setAboutUrl(e.target.value)}
						/>
					))
				}
				
				{
					addAboutButton ? (
						<div className="d-flex justify-content-end">
							<Button className="button btn-secondary" onClick={handleAddFormOnClick} type="button">Another Section</Button>
						</div>
					):(
						''
					)
				}
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