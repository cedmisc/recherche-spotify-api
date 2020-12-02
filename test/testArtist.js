// eslint-disable-next-line no-unused-vars
import { describe, test } from '@jest/globals'

class Artist {
  constructor(character) {
    const { id, name, genre } = character
    this.id = id
    this.name = name
    this.genre = genre
  }

  get details() {
    return this.id + ' ' + this.name + ' ' + this.genre
  }
}
describe('Artist', () => {
  test('Musicien:', () => {
    const artist = new Artist({ id: '1', name: 'Muse', genre: 'rock' })
    expect(artist.details).toBe('1 Muse rock')
  })
})
