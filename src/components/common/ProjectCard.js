import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ project, handleOnClick, handleDelete }) => {

	return (
		<Card className="card p-3">
			<Card.Img variant="top" src={project.image.url} />
			<Card.Body className="size-sm p-1.5">
				<Card.Title>{project.title}</Card.Title>
				<Card.Text>
					{project.text}
				</Card.Text>
			</Card.Body>
			<Card.Body className="p-1.5">
				<Card.Link href="#">{project.projectUrl}</Card.Link>
			</Card.Body>
			<div className="d-flex justify-content-between m-2">
				<Button className="button btn-secondary" size="sm" type="button" onClick={handleOnClick}>
					Change
				</Button>
				<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons"  onClick={handleDelete} />
			</div>
		</Card>
	)
}

export default ProjectCard