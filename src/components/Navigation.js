/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import Logo from '../assets/images/Logo.png'

const Navigation = () => {
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);

	const { location } = window;
	
	return (
		<div className={location.pathname === '/user/' ? " " + (getTheme()) : ""}>
			<Navbar className="navigation p-3">
			{
				!location === '/user/' &&
				<Link className="logo-link" to="/">
					<Image className="mr-2" width="60" src={Logo} rounded />
					<h1 className="logo">Meja</h1>
				</Link>
			}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						
						{
							currentUser ? (
								<NavDropdown className="logo" title={currentUser.displayName ?? 'User'} id="basic-nav-dropdown">
									<NavLink to={`/${currentUser.displayName ?? 'user'}/about`} className="dropdown-item">About</NavLink>

									<NavLink to={`/${currentUser.displayName ?? 'user'}/projects`} className="dropdown-item">Projects</NavLink>

									<NavLink to={`/${currentUser.displayName ?? 'user'}/contact`} className="dropdown-item">Contact</NavLink>

									<NavLink to={`/${currentUser.displayName ?? 'user'}/`} className="dropdown-item">Preview</NavLink>

									<NavDropdown.Divider />

									<NavLink to={'/create'} className="dropdown-item">Create Portfolio</NavLink>

									<NavDropdown.Divider />

									<NavLink to="/signout" className="dropdown-item">Sign Out</NavLink>
								</NavDropdown>
							) : (
								<>
									<NavLink to="/signin" className="mr-2 nav-link">Sign In</NavLink>
									<NavLink to="/signup" className="nav-link">Create Acoount</NavLink>
								</>
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	)
}

export default Navigation
