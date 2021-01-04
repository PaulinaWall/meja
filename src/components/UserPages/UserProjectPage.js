import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

import useGetPortfolio from '../../hooks/useGetPortfolio';
import Footer from '../UserPages/Footer';


const UserProjectPage = () => {
	const { portfolio } = useGetPortfolio();

	return ( 
		<div className="user-site-container">
			<Row>
				{
					(portfolio && portfolio.projects) && portfolio.projects.map((project, index) => {
						return <Col  className="mb-3" sm={6} md={4} lg={3} key={index}>
								<Card className="card">
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
			<Footer />
		</div>
	 );
}
 
export default UserProjectPage;