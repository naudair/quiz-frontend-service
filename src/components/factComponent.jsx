export const FactComponent = ({ factData, userData }) => {
    const date = new Date(factData.date);
    const formattedDate = date.toLocaleString();
    console.log(userData)

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <div className="factUserName">
                   {factData.userName}
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

