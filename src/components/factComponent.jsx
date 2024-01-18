import axios from "axios"
import { useEffect, useState } from "react";

export const FactComponent = ({ factData }) => {
    const date = new Date(factData.date);
    const formattedDate = date.toLocaleString();

    const [userName, setUserName] = useState('')



    useEffect(() => {
        const getUserName = async (userId) => {
            const response = await axios.get(`https://quiz-app-backend-service-3a47.onrender.com/users/${userId}`);
            setUserName(response.data.userName)
        }
        getUserName(factData.userID)
    }, [factData])


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <div className="factUserName">
                    {userName}
                </div>
                <div className="factDate">
                    {formattedDate}
                </div>
            </div>
            <div className="factTitle">
                {factData.title}
            </div>
            <div className="factFact">
                {factData.fact}
            </div>

        </>
    )
}

