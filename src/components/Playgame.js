// import { useEffect, useState } from "react";

// function Playgame(){
    
//     const queryParameters = new URLSearchParams(window.location.search);
//     const id= queryParameters.get("id")
//     // console.log(id);
//     const [data,setData]=useState('');
//     const [player1,setPlayer1]=useState('');
//     const [player2,setPlayer2]=useState('');
//     const [isTrue,setIsTrue]=useState(false);
//     useEffect(()=>{
        
//     fetch(`http://mrghazipur.in/api/alldata/${id}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // setData(data);
//       setPlayer1(data.player1);
//       setPlayer2(data.player2);
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       );
//     });
//     },[])
//     const f1=(a,b)=>{
//       setIsTrue(pre=>pre=!pre);
//       let t=document.getElementById(`t${a}${b}`);
//       t.value=(isTrue===true ? 'X' : 'O');
//       // console.log(t);
      
//     // Disable button after it's clicked
//     // t.disabled = true;
//         // console.log(a,b,isTrue);
//         fetch(`http://mrghazipur.in/api/gamestart?gameid=${id}&row=${a}&col=${b}&player=${t.value}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // setData(data);
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       );
//     });
//     }
//     setInterval(()=>{
//       fetch(`http://mrghazipur.in/api/findgameid?gameid=${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       }) 
//       .then((data) => {
//         setData(data);
//         let t=document.getElementById(`t${data[0].row}${data[0].row}`);
//         t.value=`${data[0].player}`;  
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error(
//           "There has been a problem with your fetch operation:",
//           error
//         );
//       });
//     },30000)
//     return (
//         <div className="container"> 
//         <div class="row">
//             <div class="col-md-12">
//                 <div class="game">
//                     <input class="box" id="t11" type="button" onClick={()=>f1(1,1)}/>
//                     <input class="box" id="t12" type="button" onClick={()=>f1(1,2)}/>
//                     <input class="box" id="t13" type="button" onClick={()=>f1(1,3)}/>
//                     <input class="box" id="t21" type="button" onClick={()=>f1(2,1)}/>
//                     <input class="box" id="t22" type="button" onClick={()=>f1(2,2)}/>
//                     <input class="box" id="t23" type="button" onClick={()=>f1(2,3)}/>
//                     <input class="box" id="t31" type="button" onClick={()=>f1(3,1)}/>
//                     <input class="box" id="t32" type="button" onClick={()=>f1(3,2)}/>
//                     <input class="box" id="t33" type="button" onClick={()=>f1(3,3)}/>
//                 </div>
//             </div>
//         </div>
//       <br/>
//    <center>
    
//    <div>
//     <h3>Player 1: {player1}</h3>
//       <p>Vs</p>
//       <h3>Player 2: {player2}</h3>
//     </div>
//     </center> 
//   </div>
//     )
// }
// export default Playgame;
import { useEffect, useState, useRef } from "react";

function Playgame() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [data, setData] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const intervalRef = useRef();

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
        console.error("There has been a problem with your fetch operation:", error);
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
          data.forEach(move => {
            let t = document.getElementById(`t${move.row}${move.col}`);
            t.value = move.player;
            t.disabled = true;  // Disable button if it has a value
          });
          console.log(data);
        })
        .catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
        });
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [id]);

  const f1 = (a, b) => {
    setIsTrue(prev => !prev);
    let t = document.getElementById(`t${a}${b}`);
    t.value = (isTrue ? 'X' : 'O');
    t.disabled = true;  // Disable button after it's clicked

    fetch(`http://mrghazipur.in/api/gamestart?gameid=${id}&row=${a}&col=${b}&player=${t.value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="game">
            <input className="box" id="t11" type="button" onClick={() => f1(1, 1)} />
            <input className="box" id="t12" type="button" onClick={() => f1(1, 2)} />
            <input className="box" id="t13" type="button" onClick={() => f1(1, 3)} />
            <input className="box" id="t21" type="button" onClick={() => f1(2, 1)} />
            <input className="box" id="t22" type="button" onClick={() => f1(2, 2)} />
            <input className="box" id="t23" type="button" onClick={() => f1(2, 3)} />
            <input className="box" id="t31" type="button" onClick={() => f1(3, 1)} />
            <input className="box" id="t32" type="button" onClick={() => f1(3, 2)} />
            <input className="box" id="t33" type="button" onClick={() => f1(3, 3)} />
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
