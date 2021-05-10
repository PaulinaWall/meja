import React, { useState, useContext, useEffect } from 'react';
import { Container, Alert, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faNetworkWired, faPalette, faAddressCard, faLink, faImage } from '@fortawesome/free-solid-svg-icons';

import { db } from '../firebase';
import AboutForm from './common/AboutForm';
import LinksForm from './common/LinksForm';
import ProjectForm from './common/ProjectForm';
import ContactForm from './common/ContactForm';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { BackgroundContext } from '../contexts/BackgroundContext';
import ProjectColorPicker from './UserPages/ProjectColorPicker';
import PortfolioContent from './UserPages/PortfolioContent';
import QuotesComponent from './QuotesComponent';
import BackgroundImageForm from './common/BackgroundImageForm';
import useGetCurrentUserPortfolio from '../hooks/useGetCurrentUserPortfolio';
import useAddImage from '../hooks/useAddImage';
import useDeleteSection from '../hooks/useDeleteSection';

const CreateForm = () => {
	const [message, setMessage] = useState(false);
	const [error, setError] = useState(false);
	const [showUrl, setShowUrl] = useState(false);
	const [imageToAdd, setImageToAdd] = useState('');
	const [deleteSection, setDeleteSection] = useState(false);
	const [formState, setFormState] = useState('');
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
	
	const [project, setProject] = useState({});
	const [about, setAbout] = useState({});
	const [email, setEmail] = useState('');
	const [link, setLink] = useState({});
	
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);
	const { getBackground } = useContext(BackgroundContext);
	const navigate = useNavigate();
	const { portfolio } = useGetCurrentUserPortfolio();
	const { uploadProgress, imageUrl, projectImage, error: uploadImageError } = useAddImage(imageToAdd);
	const { error: deleteError, message: deleteMessage } = useDeleteSection(deleteSection, setDeleteSection);
	
	useEffect(() => {
		setUploadedImageUrl(imageUrl)
		setProject({
			...project,
			image: { ...projectImage },
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectImage])

	const setToDB = (section, part, message) => {
		db.collection('portfolios').doc(portfolio.id).set({
			[section]: part,
		}, { merge: true })
		.then(() => {
			setCurrentProjectIndex(null);
			setMessage(message)
		})
		.catch((e) => {
			setError(e.message);
		})
	};

	const setPortfolioContent = (partToSet) => {
		db.collection('portfolios').doc(portfolio.id).get()
        .then((snapshot) => {
			let projects;
			let aboutSection;
			let data;
			let links;
			const theme = getTheme();
			const background = getBackground();

			if(partToSet === 'projects'){
				data = {
					title: project.title,
					image: project.image,
					url: project.url,
					text: project.text,
				}
				projects = snapshot.data().projects;
				if(currentProjectIndex || currentProjectIndex === 0){
					projects[currentProjectIndex] = data;
				}else{
					projects.push(data);
				}
				setToDB('projects', projects);
			}
			
			if (partToSet === 'about'){
				data = {
					title: about.title,
					url: about.url,
					text: about.text,
				}
				aboutSection = snapshot.data().about;
				if(currentProjectIndex || currentProjectIndex === 0) {
					aboutSection[currentProjectIndex] = data;
				}else{
					aboutSection.push(data);
				}
				setToDB('about', aboutSection);
			}

			if (partToSet === 'links') {
				data = {
					facebook: link.facebook,
					linkedin: link.linkedin,
					github: link.github,
				}

				links = snapshot.data().links;
				if(currentProjectIndex || currentProjectIndex === 0) {
					links[currentProjectIndex] = data;
				}else{
					links[0] = data;
				}
				setToDB('links', links);
			}

			if(partToSet === 'email') {
				setToDB('email', email)
			}

			if(partToSet === 'theme') {
				const message = `Successfully updated portfolio with a new theme color!`;
				setToDB('theme', theme, message);
			}

			if(partToSet === 'background') {
				const message = 'Successfully added a background image to your portfolio´s landing page!';
				setToDB('background', background, message);
			}

		}).catch((e) => {
			setError(e.message);
		})
	}

	const handleSaveOnClick = () => {
		if (formState === 'project') {
			if(project.text.length > 50) {
				return;
			}
			setProject({
				title: '',
				image: '',
				url: '',
				text: '',
			});
			setUploadedImageUrl(null);
			setPortfolioContent('projects');
		}

		setPortfolioContent(formState);
		setAbout({
			title: '',
			text: '',
			url: '',
		});
		setLink({
			facebook: '',
			linkedin: '',
			github: '',
		});
		setEmail('');
	}

	const handleImageChange = (e) => {
		setUploadedImageUrl(e.target.files[0]);
		setImageToAdd(e.target.files[0]);
	};

	const handleChangeOnClick = (part, object, index) => {
		if(part === 'project') {
			setProject({
				title: object.title,
				image: object.image,
				url: object.url,
				text: object.text,
			});
			setUploadedImageUrl(object.image.url);
			setCurrentProjectIndex(index);
		}
		if(part === 'about') {
			setAbout({
				title: object.title,
				text: object.text,
				url: object.url,
			});
			setCurrentProjectIndex(index);
		}

		if(part === 'links') {
			setLink({
				facebook: object.facebook,
				linkedin: object.linkedin,
				github: object.github,
			});
			setCurrentProjectIndex(index);
		}
	}

	const handleDelete = (part, index = 0) => {
		setDeleteSection({ part, index });
	}

	const handleShowPortfolioOnClick = () => {
		navigate(`/${currentUser.displayName}/${portfolio.id}`)
	}

	const messages = [message, deleteMessage];
	const errors = [error, deleteError, uploadImageError];
	return ( 
		<Container className="create-form-container">
			<Row className="create-form">
				<Col sm={12} md={6} lg={6} className="form-container">
					{
						messages.map((message, index) => (
							message && (<Alert key={index} variant="success" onClose={() => setMessage(false)} dismissible>{message}</Alert>)
						))
					}
					{
						errors.map((error, index) => (
							error && (<Alert key={index} variant="danger" onClose={() => setError(false)} dismissible>{error}</Alert>)
						))
					}
					
					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faAlignJustify}
							/>
							<h2 onClick={() => setFormState('about')}>Add About Text</h2>
						</div>
						{
							formState === 'about' &&
								<AboutForm 
									title={about.title}
									text={about.text}
									url={about.url}
									setFormState={() => setFormState('')}
									handleSaveOnClick={handleSaveOnClick}
									handleTextChange={(e) => setAbout({ ...about, text: e.target.value })}
									handleTitleChange={(e) => setAbout({ ...about, title: e.target.value })}
									handleUrlChange={(e) => setAbout({ ...about, url: e.target.value })}
								/>
						}
					</Container>

					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faNetworkWired}
							/>
							<h2 onClick={() => setFormState('project')} >Add Project</h2>
						</div>
						{
							formState === 'project' && 
								<ProjectForm 
									title={project.title}
									text={project.text}
									url={project.url}
									image={project.image}
									uploadProgress={uploadProgress}
									uploadedImageUrl={uploadedImageUrl}
									setFormState={() => setFormState('')}
									handleSaveOnClick={handleSaveOnClick}
									handleImageChange={handleImageChange}
									handleTitleChange={(e) => setProject({ ...project, title: e.target.value })}
									handleTextChange={(e) => setProject({ ...project, text: e.target.value })}
									handleUrlChange={(e) => setProject({ ...project, url: e.target.value })}
								/>
						}
					</Container>

					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faPalette}
							/>
							<h2 onClick={() => setFormState('theme')}>Choose Color</h2>
						</div>
						{
							formState === 'theme' &&
								<ProjectColorPicker 
									setFormState={() => setFormState('')}
									handleSaveOnClick={handleSaveOnClick}
								/>
						}
					</Container>

					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faAddressCard}
							/>
							<h2 onClick={() => setFormState('email')}>Add Contact</h2>
						</div>
						{
							formState === 'email' &&
								<ContactForm
									email={email}
									setFormState={() => setFormState('')}
									handleEmailChange={(e) => setEmail(e.target.value)}
									handleSaveOnClick={handleSaveOnClick}
								/>
						}
					</Container>

					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faLink}
							/>
							<h2 onClick={() => setFormState('links')}>Add Links</h2>
						</div>
						{
							formState === 'links' &&
								<LinksForm 
									facebookUrl={link.facebook}
									gitHubUrl={link.github}
									linkedinUrl={link.linkedin}
									setFormState={() => setFormState('')}
									handleGithubChange={(e) => setLink({ ...link, github: e.target.value })}
									handleLinkedinChange={(e) => setLink({ ...link, linkedin: e.target.value })}
									handleFacebookChange={(e) => setLink({ ...link, facebook: e.target.value })}
									handleSaveOnClick={handleSaveOnClick}
								/>
						}
					</Container>

					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faImage}
							/>
							<h2 onClick={() => setFormState('background')}>Add landing page background</h2>
						</div>
						{
							formState === 'background' &&
								<BackgroundImageForm 
									setFormState={() => setFormState('')}
									handleSaveOnClick={handleSaveOnClick}
								/>
						}
					</Container>
				</Col>
				{
					formState === ''
					? <Col sm={12} md={6} lg={6} className="quotes-column"><QuotesComponent/></Col>
					: <Col sm={12} md={6} lg={6} className={"portfolio-container p-0 " + (getTheme())}>
						<PortfolioContent
							formState={formState}
							portfolio={portfolio}
							handleDelete={handleDelete}
							handleChangeOnClick={handleChangeOnClick}
						/>
					</Col>
				}
			</Row>

			<div className="portfolio-url-container">
				<Button className="button" onClick={handleShowPortfolioOnClick}>Preview Portfolio</Button>
				{
					showUrl
						? <span className="portfolio-url">{`http://localhost:3000/${currentUser.displayName}/${portfolio?.id}`}</span>
						: <Button className="button ml-3" onClick={() => setShowUrl(true)}>View Portfolio Url</Button>
				}
			</div>
		</Container>
	 );
}
 
export default CreateForm;