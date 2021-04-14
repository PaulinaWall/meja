import React, { useState, useContext } from 'react';
import { Container, Alert, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify, faNetworkWired, faPalette, faAddressCard, faLink, faImage } from '@fortawesome/free-solid-svg-icons';

import { db, storage } from '../firebase';
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
// import useSetPortfolio from '../hooks/useSetPortfolio'
// import useAddImage from '../hooks/useAddImage';

const CreateForm = () => {
	const [message, setMessage] = useState(false);
	const [error, setError] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(null);
	const [formState, setFormState] = useState('');
	
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const [projectTitle, setProjectTitle] = useState('');
	const [projectText, setProjectText] = useState('');
	const [projectUrl, setProjectUrl] = useState('');
	const [projectImage, setProjectImage] = useState('');
	const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
	// const [portfolioContent, setPortfolioContent] = useState(''); 
	
	const [aboutTitle, setAboutTitle] = useState('');
	const [aboutText, setAboutText] = useState('');
	const [aboutUrl, setAboutUrl] = useState('');

	const [email, setEmail] = useState('');
	
	const [gitHubUrl, setGithubUrl] = useState('');
	const [linkedinUrl, setLinkedinUrl] = useState('');
	const [facebookUrl, setFacebookUrl] = useState('');
	
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);
	const { getBackground } = useContext(BackgroundContext);
	const navigate = useNavigate();
	const { portfolio } = useGetCurrentUserPortfolio();
	// const { uploadProgress, uploadedImageUrl, setUploadedImageUrl, error: uploadImageError } = useAddImage(setProjectImage);
	// console.log(projectImage)
	// const {error: setPortfolioError, message: setPortfolioMessage} = useSetPortfolio(
	// 	portfolioContent,
	// 	projectTitle,
	// 	projectImage,
	// 	projectUrl,
	// 	projectText,
	// 	currentProjectIndex,
	// 	setCurrentProjectIndex,
	// 	aboutTitle,
	// 	aboutUrl,
	// 	aboutText,
	// 	facebookUrl,
	// 	linkedinUrl,
	// 	gitHubUrl,
	// 	email,
	// );

	const addImageToStorage = (image) => {
		if(!image) {
			return;
		};
		const storageRef = storage.ref();

		const fileRef = storageRef.child(image.name);
		
		const uploadTask = fileRef.put(image);

		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round(
				(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
		});

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
				setUploadProgress(null);
			});
		}).catch(error => {
			setError(error.message)
		});
	};

	const setPortfolioContent = (partToSet) => {
		db.collection('portfolios').doc(portfolio.id).get()
        .then((snapshot) => {
			let projects;
			let about;
			let data;
			let links;
			const theme = getTheme();
			const background = getBackground();
			if(partToSet === 'projects'){
				data = {
					title: projectTitle,
					image: projectImage,
					projectUrl: projectUrl,
					text: projectText,
				}
				projects = snapshot.data().projects;
				if(currentProjectIndex || currentProjectIndex === 0){
					projects[currentProjectIndex] = data;
				}else{
					projects.push(data);
				}

				db.collection('portfolios').doc(portfolio.id).set({
					projects: projects,
				}, { merge: true })
				.then(() => {
					setCurrentProjectIndex(null);
				})
				.catch((e) => {
					setError(e.message);
				})
			}
			
			if (partToSet === 'about'){
				data = {
					title: aboutTitle,
					aboutUrl: aboutUrl,
					text: aboutText,
				}
				about = snapshot.data().about;
				if(currentProjectIndex || currentProjectIndex === 0) {
					about[currentProjectIndex] = data;
				}else{
					about.push(data);
				}

				db.collection('portfolios').doc(portfolio.id).set({
					about: about,
				}, { merge: true })
				.then(() => {
					setCurrentProjectIndex(null);
				})
				.catch((e) => {
					setError(e.message);
				})
			}

			if (partToSet === 'links') {
				data = {
					facebook: facebookUrl,
					linkedin: linkedinUrl,
					github: gitHubUrl,
				}

				links = snapshot.data().links;
				if(currentProjectIndex || currentProjectIndex === 0) {
					links[currentProjectIndex] = data;
				}else{
					links[0] = data;
				}

				db.collection('portfolios').doc(portfolio.id).set({
					links: links,
				}, { merge: true })
				.then(() => {
					setCurrentProjectIndex(null);
				})
				.catch((e) => {
					setError(e.message);
				})
			}

			if(partToSet === 'email') {
				db.collection('portfolios').doc(portfolio.id).set({
					email: email,
				}, { merge: true })
				.then(() => {
				})
				.catch((e) => {
					setError(e.message);
				})
			}

			if(partToSet === 'theme') {
				db.collection('portfolios').doc(portfolio.id).set({
					theme,
				}, { merge: true })
				.then(() => {
					setMessage(`Succesfully updated portfolio with a new theme color!`);
				})
				.catch((e) => {
					setError(e.message);
				})
			}

			if(partToSet === 'background') {
				db.collection('portfolios').doc(portfolio.id).set({
					background,
				}, { merge: true })
				.then(() => {
					setMessage('Successfully added a background image to your portfolio´s landing page!');
				})
				.catch((e) => {
					setError(e.message);
				})
			}

		}).catch((e) => {
			setError(e.message);
		})
	}

	const handleSaveOnClick = () => {
		if (formState === 'project') {
			if(projectText.length > 50) {
				return;
			}
			setProjectTitle('');
			setProjectImage('');
			setUploadedImageUrl(null);
			setProjectUrl('');
			setProjectText('');
			setPortfolioContent('projects');
		}

		if (formState === 'about') {
			setPortfolioContent('about');
			setAboutTitle('');
			setAboutText('');
			setAboutUrl('');
		}

		if (formState === 'links') {
			setGithubUrl('');
			setFacebookUrl('');
			setLinkedinUrl('');
			setPortfolioContent('links');
		}

		if (formState === 'contact' ){
			setEmail('');
			setPortfolioContent('email');
		}

		if (formState === 'color' ){
			setPortfolioContent('theme');
		}

		if (formState === 'background') {
			setPortfolioContent('background');
		}

	}

	const handleImageChange = (e) => {
		setUploadedImageUrl(e.target.files[0]);
		addImageToStorage(e.target.files[0]);
	};

	const handleChangeOnClick = (part, object, index) => {
		if(part === 'project') {
			setProjectTitle(object.title);
			setUploadedImageUrl(object.image.url);
			setProjectImage(object.image);
			setProjectUrl(object.projectUrl);
			setProjectText(object.text);
			setCurrentProjectIndex(index);
		}

		if(part === 'about') {
			setAboutText(object.text);
			setAboutTitle(object.title);
			setAboutUrl(object.aboutUrl);
			setCurrentProjectIndex(index);
		}

		if(part === 'links') {
			setFacebookUrl(object.facebook);
			setLinkedinUrl(object.linkedin);
			setGithubUrl(object.github);
			setCurrentProjectIndex(index);
		}
	}

	const handleDelete = (part, index = 0) => {
		if(part === 'email'){
			db.collection("portfolios").doc(portfolio.id).update({
				[part]: ''
			})
			.then(() => {
				setMessage(`Document successfully deleted!`);
			}).catch((error) => {
				setError(`Error removing document: ${error}`);
			});
		} else{
			const updatedPart = portfolio[part];
			updatedPart.splice(index, 1);
			db.collection("portfolios").doc(portfolio.id).update({
				[part]: updatedPart 
			})
			.then(() => {
				setMessage(`Document successfully deleted!`);
			}).catch((error) => {
				setError(`Error removing document: ${error}`);
			});
		}
	}

	const handleShowPortfolioOnClick = () => {
		navigate(`/${currentUser.displayName}/${portfolio.id}`)
	}

	return ( 
		<Container className="create-form-container">
			<Row className="create-form">
				<Col sm={12} md={6} lg={6} className="form-container">
					{message&& 
						(<Alert variant="success" onClose={() => setMessage(false)} dismissible>{message}</Alert>)
					}
					{error && 
						(<Alert variant="danger" onClose={() => setError(false)} dismissible>{error}</Alert>)
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
									title={aboutTitle}
									text={aboutText}
									url={aboutUrl}
									setFormState={() => setFormState('')}
									handleSaveOnClick={handleSaveOnClick}
									handleTextChange={(e) => setAboutText(e.target.value)}
									handleTitleChange={(e) => setAboutTitle(e.target.value)}
									handleUrlChange={(e) => setAboutUrl(e.target.value)}
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
									title={projectTitle}
									text={projectText}
									url={projectUrl}
									image={projectImage}
									uploadProgress={uploadProgress}
									uploadedImageUrl={uploadedImageUrl}
									setFormState={() => setFormState('')}
									handleSaveOnClick={handleSaveOnClick}
									handleImageChange={handleImageChange}
									handleTitleChange={(e) => setProjectTitle(e.target.value)}
									handleTextChange={(e) => setProjectText(e.target.value)}
									handleUrlChange={(e) => setProjectUrl(e.target.value)}
								/>
						}
					</Container>

					<Container className="pointer mt-5">
						<div className="create-form-menu">
							<FontAwesomeIcon
								icon={faPalette}
							/>
							<h2 onClick={() => setFormState('color')}>Choose Color</h2>
						</div>
						{
							formState === 'color' &&
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
							<h2 onClick={() => setFormState('contact')}>Add Contact</h2>
						</div>
						{
							formState === 'contact' &&
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
									facebookUrl={facebookUrl}
									gitHubUrl={gitHubUrl}
									linkedinUrl={linkedinUrl}
									setFormState={() => setFormState('')}
									handleGithubChange={(e) => setGithubUrl(e.target.value)}
									handleLinkedinChange={(e) => setLinkedinUrl(e.target.value)}
									handleFacebookChange={(e) => setFacebookUrl(e.target.value)}
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
				<span
					className="portfolio-url"
				>
					{`http://localhost:3000/${currentUser.displayName}/${portfolio?.id}`}
				</span>
			</div>
		</Container>
	 );
}
 
export default CreateForm;