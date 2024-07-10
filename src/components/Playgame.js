import { useEffect, useState, useRef } from "react";

function Playgame() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [data, setData] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [isTrue, setIsTrue] = useState('X');

  const intervalRef = useRef();
  let no_of_move;
  useEffect(() => {
    fetch(`http://mrghazipur.in/api/alldata/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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
      
    intervalRef.current = setInterval(() => {
      fetch(`http://mrghazipur.in/api/findgameid?gameid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          data.forEach((move) => {
            let t = document.getElementById(`t${move.row}${move.col}`);
            t.value = move.player;
            t.disabled = true; // Disable button if it has a value
          });
          console.log(data);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [id]);

  function win(){
     fetch(`http://mrghazipur.in/api/win?gameid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if(data.status=='wins'){
            alert('win Match');
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
  }
  const f1 = (a, b) => {
    let t = document.getElementById(`t${a}${b}`);
    if (t.value == "X" || t.value == "O") {
      alert("Cannot place here");
      return;
    }
    // t.value = isTrue ? "X" : "O";
    t.value=isTrue;
    //t.disabled = true; // Disable button after it's clicked
    win();
    fetch(
      `http://mrghazipur.in/api/gamestart?gameid=${id}&row=${a}&col=${b}&player=${t.value}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data,data.player==='X');
        if(data.player==='X'){
          setIsTrue('O')
        }else{
          setIsTrue('X');
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="game">
            <input
              className="box"
              id="t11"
              type="button"
              onClick={() => f1(1, 1)}
            />
            <input
              className="box"
              id="t12"
              type="button"
              onClick={() => f1(1, 2)}
            />
            <input
              className="box"
              id="t13"
              type="button"
              onClick={() => f1(1, 3)}
            />
            <input
              className="box"
              id="t21"
              type="button"
              onClick={() => f1(2, 1)}
            />
            <input
              className="box"
              id="t22"
              type="button"
              onClick={() => f1(2, 2)}
            />
            <input
              className="box"
              id="t23"
              type="button"
              onClick={() => f1(2, 3)}
            />
            <input
              className="box"
              id="t31"
              type="button"
              onClick={() => f1(3, 1)}
            />
            <input
              className="box"
              id="t32"
              type="button"
              onClick={() => f1(3, 2)}
            />
            <input
              className="box"
              id="t33"
              type="button"
              onClick={() => f1(3, 3)}
            />
          </div>
        </div>
      </div>
      <br />
      <center>
        <div>
          <h3>Player 1: {player1}</h3>
          <p>Vs</p>
          <h3>Player 2: {player2}</h3>
        </div>
      </center>
    </div>
  );
}

export default Playgame;
