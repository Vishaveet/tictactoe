function Win(){
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
    return (
        <div>

        </div>
    )
}
export default Win;