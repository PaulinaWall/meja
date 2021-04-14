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


	const signin = async (email, password, name) => {
		return auth.signInWithEmailAndPassword(email, password).then( async (response) => {
			await response.user.updateProfile({
				displayName: name,
			})
		})
	}

	const signout = () => {
		return auth.signOut()
	}

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
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
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (<div className="d-flex justify-content-center my-5"><BounceLoader color={"#888"} size={100} /></div>)}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, useAuth, AuthContextProvider as default }
