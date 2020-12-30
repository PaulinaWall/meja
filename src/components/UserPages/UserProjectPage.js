import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import useGetPortfolio from '../../hooks/useGetPortfolio';

const UserProjectPage = () => {
	const { portfolio } = useGetPortfolio();

	return ( 
		<Row>
			{
				(portfolio && portfolio.projects) && portfolio.projects.map((project, index) => {
					return <Col  className="mb-3" sm={6} md={4} lg={3} key={index}>
							<Card className="card">
								<Card.Img variant="top" src={project.image.url} />
								<Card.Body className="size-sm p-1.5">
									<Card.Title>{project.title}</Card.Title>
									<Card.Text>
										{project.text}
									</Card.Text>
								</Card.Body>
								<Card.Body className="p-1.5">
									<Card.Link href={`http://${project.projectUrl}`}>{project.projectUrl}</Card.Link>
								</Card.Body>
							</Card>
						</Col>
				})
			}
		</Row>
	 );
}
 
export default UserProjectPage;