import { useEffect, useState } from "react";
const queryParameters = new URLSearchParams(window.location.search);
const id = queryParameters.get("id");

function Win(){
  const [coin,setCoin]=useState('');
  const [player1,setPlayer1]=useState('');
  const [player2,setPlayer2]=useState('');
  useEffect(()=>{
    fetch(`http://mrghazipur.in/api/win?gameid=${id}`)
    // fetch('http://localhost:8000')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setCoin(data.key);
      console.log(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  },[])
  useEffect(()=>{
    fetch(`http://mrghazipur.in/api/alldata/${id}`)
    // fetch('http://localhost:8000')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // setCoin(data.key);
      setPlayer1(data.player1);
      setPlayer2(data.player2);
      console.log(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  },[])
    return (
      <center> 
        <div>
          <h1>Win the Match</h1>
          <h3>Player {coin==="O" ? "1" : "2"}: {coin==="O" ? player1 :player2}</h3>
        </div>
        </center>
    )
}
export default Win;