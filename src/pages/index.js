import { FactComponent } from "@/components/factComponent"
import { UserComponent } from "@/components/userComponent"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"


export default function Home() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const isUserLoggedIn = () => {
      const isUser = localStorage.getItem('user')
      if (isUser === null || isUser === false) {
        router.replace('/login')
      }
    }
    const fetchData = async () => {
      const response = await axios.get('https://quiz-app-backend-service-3a47.onrender.com/facts')
      setData(response.data)
    }
    const userData = async () => {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(`https://quiz-app-backend-service-3a47.onrender.com/users/${userId}`);
      setUserData(response.data)
    }

    isUserLoggedIn()
    fetchData()
    userData()
  }, [])

  const handleProfileButton = () => {
    setShowProfile(!showProfile)
  }
  const clickedLike = async (factId) => {
    const userId = localStorage.getItem("userId")
    const res = await axios.post(`https://quiz-app-backend-service-3a47.onrender.com/facts/likes/${factId}/${userId}`)
    const updatedFact = data.map((fact) => {
      console.log('hello', res.data)
      if (fact._id === factId) {
        return { ...res.data }
      } else {
        return fact
      }
    })
    setData(updatedFact)
  }
  const clickedDislike = async (factId) => {
    const userId = localStorage.getItem("userId")
    const res = await axios.post(`https://quiz-app-backend-service-3a47.onrender.com/facts/dislikes/${factId}/${userId}`)
    const updatedFact = data.map((fact) => {
      if (fact._id === factId) {
        return { ...res.data }
      } else {
        return fact
      }
    })
    setData(updatedFact)
  }

  const isUserLiked = (likes) => {
    const userId = localStorage.getItem('userId')
    return likes.includes(userId)
  }
  const isUserDisliked = (dislikes) => {
    const userId = localStorage.getItem('userId')
    return dislikes.includes(userId)
  }

  return (
    <div className='factPageContainer'>
      <Header handleProfileButton={handleProfileButton} displayProfile userData={userData} />

      <div className='bluecontainer' >
        <div className="facts" style={{ width: showProfile ? '69vw' : '100vw' }}>
          <h1 style={{ borderBottom: "1px solid #ffffff" }}>
            FACTS
          </h1>
          {
            data.map((factData, key) => (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div className="fact">
                  <FactComponent factData={factData} key={key} />
                </div>
                <div className="likesDislikes">
                  <div className="likes" onClick={() => clickedLike(factData._id)}>
                    {isUserLiked(factData.likes) ? <img style={{ width: "35px" }} src="image/colored-like.png" /> : <img style={{ width: "35px" }} src="image/like.png" />}
                    <h style={{ display: "flex", alignItems: "center", paddingTop: "8px" }}>
                      {factData.likes.length}
                    </h>
                  </div>
                  <div className="likes" onClick={() => clickedDislike(factData._id)}>
                    {isUserDisliked(factData.dislikes) ? <img style={{ width: "35px" }} src="image/colored-dislike.png" /> : <img style={{ width: "35px" }} src="image/dislike.png" />}
                    <h style={{ display: "flex", alignItems: "center", paddingBottom: "9px" }}>
                      {factData.dislikes.length}
                    </h>
                  </div>
                </div>
              </div>
            ))
          }

        </div>
        {showProfile && <div className="profilepage" >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1>
              My Profile
            </h1>
            <img width="190px" src="image/user.png" />
          </div>
          <div className="userPage">
            {
              <UserComponent userData={userData} />
            }
          </div>
        </div>}
      </div>


    </div >
  )
}
