import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
let clearData;
function Home() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");
  useEffect(() => {
    fetch(`http://mrghazipur.in/api/findwating`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // setData(data["data"]);
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);
  useEffect(() => {
    fetch(`http://mrghazipur.in/api/findwating`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // setData(data["data"]);
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [data1]);
  function getdata() {
    fetch(`http://mrghazipur.in/api/findwating`)
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
  }
  clearData = setInterval(() => {
    getdata();
  }, 50000);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://mrghazipur.in/api/player1?player1=${name}`)
      // fetch('http://localhost:8000')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData1(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  const handleupdate = () => {
    clearInterval(clearData);
  };
  return (
    <div className="container">
      <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginSignupHeader">Create Game</span>
        <div className="field">
          <input
            type="text"
            placeholder="Enter Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <button>Submit</button>
        </div>
      </form>
      {/* <DisplayGames/> */}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Player</th>
            <th scope="col">Second Player</th>
            <th scope="col">Game Status</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(data.length!==0)} */}
          {data.length !== 0 &&
            data.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.player1}</td>
                {/* <button className="btn btn-primary my-2">Join Game</button> */}
                <Link
                  className="btn btn-primary my-2"
                  onClick={handleupdate}
                  to={`/player2?id=${item.id}`}
                >
                  Join Game
                </Link>
                <td>{item.gamestatus}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Home;
