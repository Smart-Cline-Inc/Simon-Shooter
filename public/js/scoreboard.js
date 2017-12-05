var api = "https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/SimonShooter"




function getSimonShooterScores() {
  fetch(api)
  .then((data) => {
    console.log(data)
  })
}

getSimonShooterScores()

// 'https://galvanize-cors.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=39.7392,-104.9903&radius=10000&keyword='
