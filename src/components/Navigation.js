/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {

	const { currentUser } = useAuth();
	const [createOrPreview, setCreateOrPreview] = useState(false);

	return (
		<div>
			<Navbar bg="light" variant="light" >
				<Container>
					<Link to="/">Meja</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							
							{
								currentUser ? (
									<NavDropdown title={currentUser.displayName} id="basic-nav-dropdown">
										<NavLink to={`/${currentUser?.displayName.replace(' ', '')}/about`} className="dropdown-item">About</NavLink>
										<NavLink to={`/${currentUser?.displayName.replace(' ', '')}/projects`} className="dropdown-item">Projects</NavLink>
										<NavLink to={`/${currentUser?.displayName.replace(' ', '')}/contact`} className="dropdown-item">Contact</NavLink>
										{
										currentUser &&
											<NavLink 
												className="dropdown-item"
												onClick={() => setCreateOrPreview(!createOrPreview)}
												to={createOrPreview
													? `/${currentUser?.displayName.replace(' ', '')}/create`
													: `/${currentUser?.displayName.replace(' ', '')}/`
												}
											>
												{
													createOrPreview
													? 'Create Portfolio'
													: 'Preview'
												}
											</NavLink>
							}
										<NavDropdown.Divider />
										<NavLink to="/signout" className="dropdown-item">Sign Out</NavLink>
									</NavDropdown>
								) : (
									<NavLink to="/signin" className="nav-link">Sign In</NavLink>
								)
							}
						</Nav>
					</Navbar.Collapse>
					
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
