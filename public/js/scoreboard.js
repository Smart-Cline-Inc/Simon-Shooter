var api = "https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/SimonShooter"

function getSimonShooterScores() {
  fetch(api)
  .then(result => {
    return result.json()
  })
  .then((data) => {
    console.log(data)
  })
}

getSimonShooterScores()
