const fetch = require('node-fetch')
const token =
  'BQDmPkZoVdLUf8BtBLduNi_sZnzp86CaBRNpmwjczuBTOfrPURoxQ4sOBlIvTHsjtlpsWHKysZ8lei9Gri0'

// méthode de récupération d'une chanson
async function sortTrack(trackId) {
  await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .catch((error) =>
      console.log(
        'sortTrack: Erreur du fetch de la récupération d un titre: ' + error
      )
    )
    .then((response) => {
      response.json().then((json) => {
        console.log(json)
        return json
      })
    })
    .catch((error) =>
      console.log('sortTrack: Erreur dans la réponse du fetch: ' + error)
    )
}

// test avec un ID de titre vide renvoyant un message 'invalid ID' avec erreur 400
sortTrack('')
// test avec un ID de titre incorrect renvoyant un message 'invalid ID' avec erreur 400
sortTrack('5d8r1f4de')
// test avec l'ID de 'Mr. Brightside', musique numéro 2 de l'album 'Hot Fuss'
sortTrack('3n3Ppam7vgaVa1iaRUc9Lp')
