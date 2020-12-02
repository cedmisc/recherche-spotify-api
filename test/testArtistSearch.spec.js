/* import { describe, test } from '@jest/globals'

 class Artist {
  async search() {
    await fetch(`https://api.spotify.com/v1/search?q=Muse&type=artist`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer BQCSiS5Z6YBG-1d1H9ElgGwIJhfoJVekFr-nU6CrFIf0qDEJEMutYxAdzvmNwh7wMURVNc2wy4bM1zrkLDc',
      },
    })
      .then((response) => {
        response.json().then((json) => {
          return json.artists.items
        })
      })
      .catch((error) =>
        console.log('Erreur du fetch de recherche d artiste: ' + error)
      )
  }

  get artist() {
    return Artist.search()
  }
}

describe('Recherche d artistes', () => {
  test('Test', () => {
    const artist = new Artist()
    const test = artist.artist()
    expect(test[0].name).toBe('Muse')
  })
})
*/
