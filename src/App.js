import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/scss/App.scss';
// import AuthRoute from './components/AuthRoute';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import CreateForm from './components/CreateForm';
import UserLandingPage from './components/UserPages/UserLandingPage';
import UserProjectPage from './components/UserPages/UserProjectPage';
import UserAboutPage from './components/UserPages/UserAboutPage';
import UserContactForm from './components/UserPages/UserContactForm';
import Navigation from './components/Navigation';
import AuthContextProvider from './contexts/AuthContext';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
	<Router>
		<AuthContextProvider>
			<Navigation />
			<Container className="py-3">
				<Routes>
					<Route path="/">
						<LandingPage />
					</Route>

					<Route path="/signin">
						<SignIn />
					</Route>

					<Route path="/signout">
						<SignOut />
					</Route>

					<Route path="/signup">
						<SignUp />
					</Route>

					<Route path="/:userName">
					
						<Route path="/">
							<UserLandingPage />
						</Route>

						<AuthRoute path="/create">
							<CreateForm />
						</AuthRoute>

						<Route path="/projects">
							<UserProjectPage />
						</Route>

						<Route path="/about">
							<UserAboutPage />
						</Route>

						<Route path="/contact">
							<UserContactForm />
						</Route>

						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Container>
		</AuthContextProvider>
	</Router>
  );
}

export default App;
