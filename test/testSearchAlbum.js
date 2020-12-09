const fetch = require('node-fetch')
const token =
  'BQAfZ6wB1NxQP0W3NbmwdMgzIigKdHTS5keoqjpCU4t61mV5Bcxb4-yRSe4o6ubhZpS3iKyeDV7GFSWgQ3Q'

// méthode de récupération des albums de l'artiste sélectionné
async function albumsList(id) {
  await fetch(
    `https://api.spotify.com/v1/artists/${id}/albums?country=FR&limit=50`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
  )
    .catch((error) =>
      console.log(
        'albumList: Erreur du fetch de la récupération d albums: ' + error
      )
    )
    .then((response) => {
      response.json().then((json) => {
        console.log(json.items)
        return json.items
      })
    })
    .catch((error) =>
      console.log('albumList: Erreur dans la réponse du fetch: ' + error)
    )
}

// test avec un id d'artiste vide renvoyant un contenu vide
albumsList('')

// test avec un id d'artiste incorrect renvoyant un contenu vide
albumsList('2sd5f9s4f')

// test avec l'id du groupe 'Muse', premier album 'Simulation Theory (Super Deluxe)' sorti le 9/11/2018
albumsList('12Chz98pHFMPJEknJQMWvI')
