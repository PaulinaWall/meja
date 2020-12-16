import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { BounceLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const signin = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const signout = () => {
		return auth.signOut()
	}

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const setName = (name) => {
		return currentUser.updateProfile({
			displayName: name
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		loading,
		signin,
		signout,
		signup,
		setName,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (<div className="d-flex justify-content-center my-5"><BounceLoader color={"#888"} size={100} /></div>)}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, useAuth, AuthContextProvider as default }
