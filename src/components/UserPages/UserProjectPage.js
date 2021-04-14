import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Image, Container } from 'react-bootstrap';
import { BounceLoader } from 'react-spinners'

import useGetSinglePortfolio from '../../hooks/useGetSinglePortfolio';
import BreadCrumbs from '../common/BreadCrumbs';


const UserProjectPage = () => {
	const { userName, portfolioID } = useParams();
	const { portfolio, loadingPortfolio } = useGetSinglePortfolio(portfolioID);
	console.log(portfolio)

	return ( 
		<>
			<BreadCrumbs
				routes={[{path: `/${userName}/${portfolioID}`, name: 'Home'}, {path: `/${userName}/${portfolioID}/projects`, name: 'Projects'}]}
				portfolio={portfolio}
			/>
			{loadingPortfolio && <BounceLoader color={"#888"} size={100} />}
				<Container className={"user-project-page-container " + (portfolio?.theme)}>
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
		</>
	 );
}
 
export default UserProjectPage;