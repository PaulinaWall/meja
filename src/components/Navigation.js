/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { NavLink, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<div>
			<Navbar bg="light" variant="light" >
				<Container>
					<Link to="/">Meja</Link>
					<NavLink to="/signin">Sign in</NavLink>
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
