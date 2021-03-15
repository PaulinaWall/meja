import React from 'react';
import { Container, Card } from 'react-bootstrap';

import PhotoPlaceholder from '../../assets/images/photo-placeholder.png'

const ColorExampleCard = () => {
	return(
		<Container>
			<Card className="mb-3">
				<h2>This is an example of what the color theme will look like</h2>
				<Card.Img variant="top" src={PhotoPlaceholder} />
				<Card.Body>
					<Card.Title className="mb-0">
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</p>
					</Card.Title>
				</Card.Body>
			</Card>
			
		</Container>
	)
}

export default ColorExampleCard;
