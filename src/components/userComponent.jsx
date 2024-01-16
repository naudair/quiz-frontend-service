export const UserComponent = ({ userData }) => {
  return (
    <>
      <div style={{ textAlign: "end", fontSize: "40px", fontWeight: "600" }}>
        <p> Name</p>
        <p> Email </p>
        <p> Age </p>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "28px",
        paddingTop: "5px",
        color: "rgba(22, 22, 100, 0.9)"
      }}>
        <p> {userData.userName} </p>
        <p> {userData.email} </p>
        <p> {userData.age} </p>
      </div>
    </>
  )
}