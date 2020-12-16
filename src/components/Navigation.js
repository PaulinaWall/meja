/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

const Navigation = () => {
	return (
		<div>
			<Navbar bg="light" variant="light" >
				<Container>
					<Link to="/">Meja</Link>
					<Nav className="ml-auto">
						<NavLink className="nav-link" to="/signin">Sign in</NavLink>
					</Nav>
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
