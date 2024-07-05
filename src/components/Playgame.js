import { useEffect, useState } from "react";

function Playgame(){
    
    const queryParameters = new URLSearchParams(window.location.search);
    const id= queryParameters.get("id")
    // console.log(id);
    const [data,setData]=useState('');
    const [isTrue,setIsTrue]=useState(false);
    useEffect(()=>{
        
    fetch(`http://mrghazipur.in/api/alldata/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
    },[])
    const f1=(a,b)=>{
      setIsTrue(pre=>pre=!pre);
      let t=document.getElementById(`t${a}${b}`);
      t.value=(isTrue===true ? 'X' : 'O');
      // console.log(t);
      
    // Disable button after it's clicked
    // t.disabled = true;
        // console.log(a,b,isTrue);
        fetch(`http://mrghazipur.in/api/gamestart?gameid=${id}&row=${a}&col=${b}&player=${t.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // setData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
    }
    return (
        <div className="container"> 
        <div class="row">
            <div class="col-md-12">
                <div class="game">
                    <input class="box" id="t11" type="button" onClick={()=>f1(1,1)}/>
                    <input class="box" id="t12" type="button" onClick={()=>f1(1,2)}/>
                    <input class="box" id="t13" type="button" onClick={()=>f1(1,3)}/>
                    <input class="box" id="t21" type="button" onClick={()=>f1(2,1)}/>
                    <input class="box" id="t22" type="button" onClick={()=>f1(2,2)}/>
                    <input class="box" id="t23" type="button" onClick={()=>f1(2,3)}/>
                    <input class="box" id="t31" type="button" onClick={()=>f1(3,1)}/>
                    <input class="box" id="t32" type="button" onClick={()=>f1(3,2)}/>
                    <input class="box" id="t33" type="button" onClick={()=>f1(3,3)}/>
                </div>
            </div>
        </div>
      <br/>
   <center>
      {data.length!==0 &&
   <div>
    <h3>Player 1: {data.player1}</h3>
      <p>Vs</p>
      <h3>Player 2: {data.player2}</h3>
    </div>}
    </center> 
  </div>
    )
}
export default Playgame;