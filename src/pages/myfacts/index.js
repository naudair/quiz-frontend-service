import { Header } from "@/components/header"
import { MyFactComponent } from "@/components/myFactComponent"
import axios from "axios"
import { useEffect, useState } from "react"


function MyFacts() {
    const [data, setData] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        console.log(userId)
        const fetchData = async () => {
            const response = await axios.get(`https://quiz-app-backend-service-3a47.onrender.com/facts/${userId}`)
            setData(response.data)
        }

        fetchData()
    }, [])
    const isUserLiked = (likes) => {
        const userId = localStorage.getItem('userId')
        return likes.includes(userId)
    }
    const isUserDisliked = (dislikes) => {
        const userId = localStorage.getItem('userId')
        return dislikes.includes(userId)
    }


    return (
        <>
            <Header userData={data} setData={setData} />
            <div className="facts">
                <h1 style={{ borderBottom: "1px solid #ffffff" }}>
                    MY FACTS
                </h1>
                {
                    data.map((factData) => (
                        <div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <div className="fact">
                                    <MyFactComponent factData={factData} userData={data} setData={setData} />
                                </div>

                                <div className="likesDislikes">
                                    <div className="likes">
                                        {isUserLiked(factData.likes) ? <img style={{ width: "35px" }} src="image/colored-like.png" /> : <img style={{ width: "35px" }} src="image/like.png" />}
                                        <h style={{ display: "flex", alignItems: "center", paddingTop: "8px" }}>
                                            {factData.likes.length}
                                        </h>
                                    </div>
                                    <div className="likes">
                                        {isUserDisliked(factData.dislikes) ? <img style={{ width: "35px" }} src="image/colored-dislike.png" /> : <img style={{ width: "35px" }} src="image/dislike.png" />}
                                        <h style={{ display: "flex", alignItems: "center", paddingBottom: "9px" }}>
                                            {factData.dislikes.length}
                                        </h>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default MyFacts