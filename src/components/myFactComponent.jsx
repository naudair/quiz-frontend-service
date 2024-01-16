import axios from "axios"
import EditFactModal from "./editFactModal";

export const MyFactComponent = ({ factData, setData, userData }) => {
    const date = new Date(factData.date);
    const formattedDate = date.toLocaleString();


    const deleteFact = async () => {
        const id = factData._id

        await axios.delete(`https://quiz-app-backend-service-3a47.onrender.com/facts/${id}`).then((res) => {
            console.log(res)
            const filteredData = userData.filter((fact) => fact._id !== res.data)
            console.log(res)
            setData(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <>
            <div style={{
                display: "flex",
                padding: "4px 8px 0 0",
                justifyContent: "space-between",
                // borderBottom: "2px solid rgba(22, 22, 100, 0.8)"
            }}>
                <div className="factUserName">
                    You
                </div>
                <div style={{ display: "flex", gap: "50px", }}>
                    <div style={{ display: "flex", gap: "30px", paddingBottom: "2px" }}>
                        <EditFactModal fact={factData.fact} title={factData.title} factId={factData._id} setData={setData} factData={factData} userData={userData} />
                        <div>
                            <img onClick={deleteFact} src="image/delete.png" width="33px" />
                        </div>
                    </div>
                    <div className="factDate">
                        {formattedDate}
                    </div>
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
