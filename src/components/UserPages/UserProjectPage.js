import React, { useContext } from 'react';
import { Card, Row, Col, Image, Container } from 'react-bootstrap';

import useGetPortfolio from '../../hooks/useGetPortfolio';
import { ThemeContext } from '../../contexts/ThemeContext';


const UserProjectPage = () => {
	const { portfolio } = useGetPortfolio();
	const { getTheme } = useContext(ThemeContext);

	return ( 
		<Container className={"user-project-page-container " + (getTheme())}>
			<Row className="project-page-row">
				{
					(portfolio && portfolio.projects) && portfolio.projects.map((project, index) => {
						return <Col className="mb-3" sm={6} md={4} lg={3} key={index}>
								<Card className="zoom card p-3">
									{
										project.image.url 
										? (
											<Card.Img variant="top" src={project.image.url} />
										) : (
											<Image src="holder.js/171x180" thumbnail />
										)
									}
									
									<Card.Body className="size-sm p-1.5">
										<Card.Title>{project.title}</Card.Title>
										<Card.Text>
											{project.text}
										</Card.Text>
									</Card.Body>
									<Card.Body className="p-1.5">
										<Card.Link target="_blank" rel="noopener noreferrer" href={`http://${project.projectUrl}`}>{project.projectUrl}</Card.Link>
									</Card.Body>
								</Card>
							</Col>
					})
				}
			</Row>
		</Container>
	 );
}
 
export default UserProjectPage;