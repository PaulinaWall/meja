import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';
import Links from '../common/Links';
import ProjectCard from '../common/ProjectCard';
import About from '../common/About';
import ColorExampleCard from '../common/ColorExampleCard';

const PortfolioContent = ({
	formState,
	portfolio,
	handleDelete,
	handleChangeOnClick,
}) => {
	const { currentUser } = useAuth();

	return (
		<Container className="portfoilo-content mt-5 mb-5 pt-3">

			{
				(portfolio?.about.length > 0 && formState === 'about') && 
					<Container className="about-container card mb-3 p-3">
						<h1  className="pt-3" style={{ fontSize: "40px" }}>{currentUser.displayName}</h1>
						{
							portfolio && portfolio.about.map((section, index) => (
								<About 
									key={index} 
									section={section}
									handleDelete={() => handleDelete('about', index)} 
									handleOnClick={() => handleChangeOnClick('about', section, index)} 
								/>
							))
						}
					</Container>
			}
			<Row className="project-card-container">
				{
					formState === 'project' && portfolio?.projects.map((project, index) => (
						<Col  className="mb-3" sm={12} md={6} lg={6} key={index}>
							<ProjectCard 
								project={project}
								handleDelete={() => handleDelete('projects', index)}
								handleOnClick={() => handleChangeOnClick('project', project, index)}
							/>
						</Col>
					))
				}
			</Row>

			{
				formState === 'color' &&
					<ColorExampleCard />
			}

			{
				(portfolio?.email && formState === 'contact') && 
					<Container className="email-container card">
						<h3>{portfolio.email}</h3>
						<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons" onClick={() => handleDelete('email')} />
					</Container>
			}

			{
				formState === 'links' && portfolio?.links.map((link, index) => (
					<Links 
						key={index} 
						link={link}
						handleDelete={() => handleDelete('links')}
						handleOnClick={() => handleChangeOnClick('links', link, index)} 
					/>
				))
			}

		</Container>
	);
};

export default PortfolioContent;