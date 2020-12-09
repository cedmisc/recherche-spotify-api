const fetch = require('node-fetch')
const token =
  'BQDmPkZoVdLUf8BtBLduNi_sZnzp86CaBRNpmwjczuBTOfrPURoxQ4sOBlIvTHsjtlpsWHKysZ8lei9Gri0'

// méthode de récupération des titres de chanson d'un album
async function tracksList(albumId) {
  await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .catch((error) =>
      console.log(
        'tracksList: Erreur du fetch de la récupération des titres: ' + error
      )
    )
    .then((response) => {
      response
        .json()
        .catch((error) =>
          console.log('tracksList: Erreur dans la réponse du fetch: ' + error)
        )
        .then((json) => {
          console.log(json.items)
          return json.items
        })
    })
}

// test avec un ID d'album vide renvoyant une réponse vide
tracksList('')

// test avec un ID d'album incorrect renvoyant un message d'erreur
tracksList('djee/f8e')

// test avec l'ID de l'album 'Place in the sun' de l'artiste 'Tania Bowra' contenant comme premier morceau 'All I want'
tracksList('6akEvsycLGftJxYudPjmqK')
