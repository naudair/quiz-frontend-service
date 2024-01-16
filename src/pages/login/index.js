import axios from "axios"
import { useState } from 'react'
import { useRouter } from 'next/router'

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [required, setRequired] = useState('')


    const handleChangeEmail = (event) => {
        const email = event.target.value
        if (!email.includes("@")) {
            setEmailError("Please, Enter your email.")
        } else {
            setEmailError()
        };
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        const password = event.target.value
        if (password.length <= 8) {
            setPasswordError("Password must be more than 8 characters.")
        } else {
            setPasswordError()
        };
        setPassword(event.target.value)
    }

    const loginUser = async (email, password) => {

        await axios.post('https://quiz-app-backend-service-3a47.onrender.com/login', {
            email: email,
            password: password
        }).then((res) => {
            console.log(res)
            localStorage.setItem('user', true)
            localStorage.setItem('userId', res.data.userId)
            router.push('/')
        }).catch((err) => {
            console.log(err)
        })

    }
    const handleSignUp = () => {
        if (email === "" ||
            password === "") {
            setRequired("Please, Enter all inputs.")

        } else {
            loginUser(email, password)
        }
    }
    const signUp = () => {
        router.push('/signup')
    }
    return (
        <div>
            <div className='container'>
                <h1 style={{ color: "white" }}>
                    LOGIN UP
                </h1>
                <input
                    placeholder='Email'
                    value={email}
                    onChange={handleChangeEmail} />
                <div className='error' >{emailError}</div>
                <input
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={handleChangePassword} />
                <div className='error' >{passwordError}</div>
                <button onClick={() => handleSignUp()}>
                    Log In
                </button >
                <div className='error' >{required}</div>
                <div onClick={() => signUp()} className="text">
                    Don't have an account?
                </div>
                {/* <button onClick={() => signUp()}>
                    Sign Up
                </button> */}
            </div>
        </div>
    )
}

export default Login