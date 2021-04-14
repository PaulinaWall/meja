import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ routes, portfolio }) => {

	return (
		<div className={"breadcrumb-container " + (portfolio?.theme)}>
			{
				routes.length > 0 &&
					<nav className="breadcrumb-nav" aria-label="breadcrumb">
						<ol className="breadcrumb">
							{
								routes.map(({ path, name }, index) => (
									<li key={index} className="breadcrumb-item" aria-current="page"><Link to={path}>{name}</Link></li>
								))
							}
						</ol>
					</nav>
			}
		</div>
	)
}

export default BreadCrumbs;