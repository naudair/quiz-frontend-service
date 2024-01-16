import axios from "axios"
import { useState } from 'react'
import { useRouter } from 'next/router'


function SignUp(props) {
    const router = useRouter()
    // const [res, setRes] = useState('')
    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [age, setAge] = useState('')
    const [ageError, setAgeError] = useState('')
    const [required, setRequired] = useState('')

    const handleChangeUserName = (event) => {
        const name = event.target.value
        if (name.length <= 4) {
            setUserNameError("Username must be more than 4 characters.")
        } else {
            setUserNameError('')
        };
        setUserName(event.target.value)
    }
    const handleChangeEmail = (event) => {
        const email = event.target.value
        if (!email.includes("@")) {
            setEmailError("Please, Enter your email.")
        } else if (email.length > 20) {
            setEmailError("That email address is too long")
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
    const handleChangeConfirmPassword = (event) => {
        const confirmPassword = event.target.value
        if (confirmPassword === password) {
            setConfirmPasswordError()
        } else {
            setConfirmPasswordError("Please, Confrim your password.")
        };

        setConfirmPassword(event.target.value)
    }
    const handleChangeAge = (event) => {
        const age = event.target.value
        if (age <= 18) {
            setAgeError("You must be over 18 years old.")
        } else if (age >= 120) {
            setAgeError("Please enter your age.")
        } else {
            setAgeError()
        };
        setAge(event.target.value)
    }

    const createUser = async () => {
        const res = await axios.post('https://quiz-app-backend-service-3a47.onrender.com/signup', {
            email: email,
            password: password,
            age: age,
            userName: userName
        }).then((res) => {
            console.log(res)
            router.push('/login')
        }).catch((err) => {
            console.log(err)
        })
        // if (res.status === 200) {
        //     alert(res.data.message)
        // }

    }

    const handleSignUp = () => {
        if (userName === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            age === "") {
            setRequired("Please, Enter all inputs.")
        } else {
            createUser()
        }
    }

    return (<div>
        <div className='container'>
            <h1 style={{ color: "white" }}>
                SIGN UP
            </h1>


            <input
                placeholder='User name'
                value={userName}
                onChange={handleChangeUserName}
            />
            <div className='error' >{userNameError}</div>
            <input
                placeholder='Email'
                value={email}
                onChange={handleChangeEmail}
            />
            <div className='error' >{emailError}</div>
            <input
                placeholder='Password'
                type='password'
                value={password}
                onChange={handleChangePassword}
            />
            <div className='error' >{passwordError}</div>
            <input
                placeholder="Confirm Password"
                value={confirmPassword}
                type='password'
                onChange={handleChangeConfirmPassword}
            />
            <div className='error' >{confirmPasswordError}</div>
            <input
                placeholder='Age'
                type="number"
                value={age}
                onChange={handleChangeAge}
            />
            <div className='error' >{ageError}</div>

            <button className='bbutton'
                onClick={handleSignUp}
            >
                Sign Up
            </button >
            <div className='error' >{required}</div>
            <div className="text" onClick={() => router.push("/login")}>
                Already have an account?
            </div>

        </div>
    </div>)
}

export default SignUp

