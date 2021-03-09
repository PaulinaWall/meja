import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

import { ThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Links from '../common/Links';
import ProjectCard from '../common/ProjectCard';
import About from '../common/About';

const PortfolioContent = ({
	portfolio,
	handleDelete,
	handleChangeOnClick,
}) => {
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);

	return (
		<Container style={getTheme()} className="portfoilo-content mt-5 pt-3">

			{
				(portfolio && portfolio.about.length > 0) && 
					<Container className="about-container mb-3 pb-2">
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
					portfolio && portfolio.projects.map((project, index) => (
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
				(portfolio && portfolio.email) && 
					<Container className="email-container">
						<h3>{portfolio.email}</h3>
						<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons" onClick={() => handleDelete('email')} />
					</Container>
			}
			{
				portfolio && portfolio.links.map((link, index) => (
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