const fetch = require('node-fetch')
const token =
  'BQDmPkZoVdLUf8BtBLduNi_sZnzp86CaBRNpmwjczuBTOfrPURoxQ4sOBlIvTHsjtlpsWHKysZ8lei9Gri0'

// Pour chercher un nom d'artiste en se connectant via l'API
async function search(artistName) {
  await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .catch((error) =>
      console.log('search: Erreur du fetch de recherche d artiste: ' + error)
    )
    .then((response) => {
      response
        .json()
        .catch((error) =>
          console.log('search: Erreur dans la réponse du fetch: ' + error)
        )
        .then((json) => {
          console.log(json.artists.items)
          return json.artists.items
        })
        .catch((error) =>
          console.log(
            'search: Erreur dans le retour de la liste des artistes: ' + error
          )
        )
    })
}

// test avec un nom d'artiste vide provoquant une erreur
search('')

// test avec un nom d'artiste incorrect renvoyant un résultat vide
search('/*/*')

// test avec la recherche exacte de l'artiste 'red hot chili peppers', donnant 4 résultats:
// 'Red Hot Chili Peppers',
// 'Red Hot Chili Peppers Tribute Band',
// 'Karaoke - Red Hot Chili Peppers' et
// 'Karaoke Soundtrack - Originally Performed By Red Hot Chili Peppers'
search('red hot chili peppers')

// test avec un nom d'artiste tronqué 'ed hot chi' renvoyant plusieurs résultats
search('ed hot chi')
