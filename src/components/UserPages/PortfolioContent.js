import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

import Links from '../common/Links';
import ProjectCard from '../common/ProjectCard';
import About from '../common/About';
import ColorExampleCard from '../common/ColorExampleCard';
import UserLandingPageExample from './UserLandingPageExample';

const PortfolioContent = ({
	formState,
	portfolio,
	handleDelete,
	handleChangeOnClick,
}) => {

	return (
		<Container className="portfolio-content p-0">

			{
				(portfolio?.about.length > 0 && formState === 'about') && 
					<div className="about-container card mb-3">
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
					</div>
			}
			{
				formState === 'project' &&
				<Row className="project-card-container m-3">
					{
						portfolio?.projects.map((project, index) => (
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
			}

			{
				formState === 'color' &&
					<ColorExampleCard />
			}

			{
				formState === 'background' &&
					<UserLandingPageExample />
			}

			{
				(portfolio?.email && formState === 'contact') &&
					<div className="email-container card">
						<h3>{portfolio.email}</h3>
						<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons" onClick={() => handleDelete('email')} />
					</div>
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