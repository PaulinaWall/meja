import React, { useState, useEffect } from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router';

import ProjectForm from './common/ProjectForm';
import AboutForm from './common/AboutForm';
import LinksForm from './common/LinksForm';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import ProjectCard from './common/ProjectCard';
import About from './common/About';
import Links from './common/Links';

const CreateForm = () => {
	const [error, setError] = useState(false)
	const [isSaved, setIsSaved] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(null);
	
	
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const [projectTitle, setProjectTitle] = useState('');
	const [projectText, setProjectText] = useState('');
	const [projectUrl, setProjectUrl] = useState('');
	const [projectImage, setProjectImage] = useState('');
	
	const [aboutTitle, setAboutTitle] = useState('');
	const [aboutText, setAboutText] = useState('');
	const [aboutUrl, setAboutUrl] = useState('');
	
	const [gitHubUrl, setGithubUrl] = useState(null);
	const [linkedinUrl, setLinkedinUrl] = useState(null);
	const [facebookUrl, setFacebookUrl] = useState(null);
	
	const [portfolio, setPortfolio] = useState();
	const { currentUser } = useAuth();
	// const navigate = useNavigate();

	const getPortfolio = async () => {
		await db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.get()
		.then((querySnapshot) => {
			if(querySnapshot.empty){
				const newPortfolio = {
					owner: currentUser.uid,
					about: [],
					projects: [],
					links: [],
				}
		
				db.collection("portfolios").add( newPortfolio )
				.then(docRef => {
					setPortfolio({
						id: docRef.id,
						owner: currentUser.uid,
						about: [],
						projects: [],
						links: [],
					});
					console.log('started new portfolio');
				})
				.catch((e) => {
					setError(e.message);
				})
			}
			querySnapshot.forEach((doc) => {
				setPortfolio({
					id: doc.id,
					...doc.data(),
				});
			})
		})
		.catch((e) => {
			setError(e.message);
		})
	}

	useEffect(() => {
		getPortfolio();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const unsubscribe = db.collection('portfolios')
		.where('owner', '==', currentUser.uid)
		.onSnapshot((snapshot) => {

			snapshot.forEach(doc => {
				setPortfolio({
					id: doc.id,
					...doc.data(),
				});
			});
		})
		return unsubscribe;
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [portfolio?.id])

	const addImageToStorage = (image) => {
		if(!image) {
			return;
		};
		const storageRef = storage.ref();

		//TODO We can add a folder for every owner in firebase and send to right owner folder `${owner.id}/${image.name}`
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
			if(partToSet === 'projects'){
				data = {
					title: projectTitle,
					image: projectImage,
					projectUrl: projectUrl,
					text: projectText,
				}
				projects = snapshot.data().projects;
				projects.push(data);

				db.collection('portfolios').doc(portfolio.id).set({
					projects: projects,
				}, { merge: true })
				.then(() => {
					console.log('updated projects with success:', data)
				})
				.catch((e) => {
					setError(e.message);
				})
			}
			
			if (partToSet === 'about'){
				data = {
					title: aboutTitle,
					projectUrl: aboutUrl,
					text: aboutText,
				}
				about = snapshot.data().about;
				about.push(data);

				db.collection('portfolios').doc(portfolio.id).set({
					about,
				}, { merge: true })
				.then(() => {
					console.log('updated projects with success:', data)
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
				links.push(data);

				db.collection('portfolios').doc(portfolio.id).set({
					links,
				}, { merge: true })
				.then(() => {
					console.log('updated projects with success:', data)
				})
				.catch((e) => {
					setError(e.message);
				})
			}

		}).catch((e) => {
			setError(e.message);
		})
	}

	const handleSaveOnClick = (e) => {
		if (e.target.innerHTML === 'Save Project') {
			if(projectText.length > 50) {
				return;
			}
			setProjectTitle('');
			setUploadedImageUrl(null);
			setProjectUrl('');
			setProjectText('');
			setPortfolioContent('projects');
		}

		if( e.target.innerHTML === 'Save Section') {
			setIsSaved(true);
			setAboutTitle('');
			setAboutText('');
			setAboutUrl('');
			setPortfolioContent('about');
		}

		if( e.target.innerHTML === 'Save Links') {
			setGithubUrl('');
			setFacebookUrl('');
			setLinkedinUrl('');
			setIsSaved(true);
			setPortfolioContent('links');
		}

	}

	const handleImageChange = (e) => {
		addImageToStorage(e.target.files[0]);
	};

	return ( 
		<>
			{error && 
				(<Alert variant="danger">{error}</Alert>)
			}
			<Container className="create-project">
				<Row className="project-card-container">
						{
							portfolio && portfolio.projects.map((project, index) => (
								<Col  className="mb-3" sm={6} md={4} lg={3} key={index}>
									<ProjectCard 
										project={project}
									/>
								</Col>
							))
						}
				</Row>

				<ProjectForm 
					title={projectTitle}
					text={projectText}
					url={projectUrl}
					image={projectImage}
					uploadProgress={uploadProgress}
					uploadedImageUrl={uploadedImageUrl}
					handleSaveOnClick={(e) => handleSaveOnClick(e)}
					handleImageChange={handleImageChange}
					handleTitleChange={(e) => setProjectTitle(e.target.value)}
					handleTextChange={(e) => setProjectText(e.target.value)}
					handleUrlChange={(e) => setProjectUrl(e.target.value)}
				/>
			</Container>
			
			<Container className="add-about-text mt-5">
						{<Container className="about-container mb-3 pb-2">
							<h1  className="p-3" style={{ fontSize: "40px" }}>{currentUser.displayName}</h1>
							{
								portfolio && portfolio.about.map((section, index) => (
									<About key={index} section={section} />
								))
							}
						</Container>}

				<AboutForm 
					title={aboutTitle}
					text={aboutText}
					url={aboutUrl}
					handleSaveOnClick={(e) => handleSaveOnClick(e)}
					handleTextChange={(e) => setAboutText(e.target.value)}
					handleTitleChange={(e) => setAboutTitle(e.target.value)}
					handleUrlChange={(e) => setAboutUrl(e.target.value)}
				/>
			</Container>

			<Container className="add-links-form mt-5">
				{
					portfolio && portfolio.links.map((link, index) => (
						<Links key={index} link={link} />
					))
				}
				<LinksForm 
					isSaved={isSaved}
					handleGithubChange={(e) => setGithubUrl(e.target.value)}
					handleLinkedinChange={(e) => setLinkedinUrl(e.target.value)}
					handleFacebookChange={(e) => setFacebookUrl(e.target.value)}
					handleSaveOnClick={(e) => handleSaveOnClick(e)}
				/>
			</Container>
		</>
	 );
}
 
export default CreateForm;