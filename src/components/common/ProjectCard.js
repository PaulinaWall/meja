import React from 'react'
import { Card, Button } from 'react-bootstrap'

const ProjectCard = ({ project, handleOnClick }) => {

	return (
		<Card className="card">
			<Card.Img style={{ height: '120px' }} variant="top" src={project.image.url} />
			<Card.Body className="size-sm p-1.5">
				<Card.Title>{project.title}</Card.Title>
				<Card.Text>
					{project.text}
				</Card.Text>
			</Card.Body>
			<Card.Body className="p-1.5">
				<Card.Link href="#">{project.projectUrl}</Card.Link>
			</Card.Body>
			<Button className="button btn-secondary" size="sm" type="button" onClick={handleOnClick}>
				Change
			</Button>
		</Card>
	)
}

export default ProjectCard