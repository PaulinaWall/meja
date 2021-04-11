/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase } from '@fortawesome/free-solid-svg-icons'

import useGetSinglePortfolio from '../hooks/useGetSinglePortfolio';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Navigation = () => {
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);
	const location = useLocation();
	const [, userName, portfolioID] = location.pathname.split('/');

	const { portfolio } = useGetSinglePortfolio(portfolioID);

	console.log(location.pathname)
	
	return (
		<div className={userName ? " " + (getTheme()) : ""}>
			<Navbar className="navigation p-3">
			{
				!userName &&
				<Link className="logo-link" to="/">
					<FontAwesomeIcon icon={faSuitcase} className="mr-2 nav-icons" />
				</Link>
			}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						
						{
							currentUser ? (
								<NavDropdown className="logo" title={currentUser.displayName} id="basic-nav-dropdown">
									<NavLink to={`/${currentUser.displayName}/${portfolio?.id}/about`} className="dropdown-item">About</NavLink>

									<NavLink to={`/${currentUser.displayName}/${portfolio?.id}/projects`} className="dropdown-item">Projects</NavLink>

									<NavLink to={`/${currentUser.displayName}/${portfolio?.id}/contact`} className="dropdown-item">Contact</NavLink>

									<NavLink to={`/${currentUser.displayName}/${portfolio?.id}/`} className="dropdown-item">Preview</NavLink>

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
