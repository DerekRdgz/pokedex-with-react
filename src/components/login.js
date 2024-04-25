import React, { useEffect, useState } from 'react'
import { auth, provider } from "./firebase_config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import App from "../App"

function SignIn() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
                navigate('/home')
            } else {
                setUser(null)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [navigate])

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            localStorage.setItem("email", data.user.email);
        }).catch((error) => {
            console.error('Authentication error:', error);
        });
    };    

    return (
        <div className='h-screen flex justify-center items-center pokedex'>
            {user? (
                <App />
            ) : (
                <div className='text-center'>
                    <h1 className='text-9xl font-bold mb-4 animate-bounce'>Pokedex</h1>
                    <img src="pikachu.png" className="pokemon-image animate-bounce" alt="Pikachu" />
                    <button onClick={handleClick} className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-3xl px-11 py-6 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2'>
                        <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
                        </svg>
                        Login with Google
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignIn;