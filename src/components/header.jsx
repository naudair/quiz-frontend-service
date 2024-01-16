import { useRouter } from "next/router"
import { useState } from "react"
import CreateFactModal from "./createFactModal"

export const Header = ({ handleProfileButton, displayProfile, userData, setData }) => {

    const router = useRouter()
    const [showButton, setShowButton] = useState(false)

    const handleRouterButton = () => {
        setShowButton(!showButton)
    }
    const activatedFactsButton = () => {
        router.push('/')
        handleRouterButton ? handleRouterButton : () => { }
    }
    const backButton = () => {
        router.push('/login')
        if (confirm('Are you sure you want to save this thing into the database?')) {
        } else {
        }
        // alert("Are you sure to log out")
    }

    return (
        <div className='navbar' >
            {/* "Are you sure to log out" bnu gsn alert harulah */}
            <div onClick={() => backButton()}>
                <img style={{ width: "40px", }} src="image/arrow.png" />
            </div>
            <img style={{ width: "130px" }} src="image/logo.png" />
            <div className='navbutton' onClick={() => activatedFactsButton()} style={{ color: showButton ? "red" : "rgb(22, 22, 100)" }} >Facts</div>
            <CreateFactModal userData={userData} setData={setData} />
            <div className='navbutton' onClick={() => (router.push('/myfacts'))} >My Facts</div>
            {displayProfile && <div onClick={handleProfileButton ? handleProfileButton : () => { }}>
                <img style={{ width: "50px" }} src="image/user.png" />
            </div>}
        </div>
    )
}