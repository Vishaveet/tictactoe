import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Player2() {
    const [name,setName]=useState('');
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const id= queryParameters.get("id")
    const handleSubmit=(e)=>{
        e.preventDefault();    
    fetch(`http://mrghazipur.in/api/player2?id=${id}&player2=${name}`)
    // fetch('http://localhost:8000')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
    //   setData1(data);
      console.log(data);
      navigate(`/startgame?id=${id}`, { replace: true });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
    }
    // console.log(id);
  return (
    <div className="conatiner">
      <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginSignupHeader">Join Player 2</span>
        <div className="field">
          <input
            type="text"
            placeholder="Enter Player 2 Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <button>Join Game</button>
        </div>
      </form>
    </div>
  );
}
export default Player2;
