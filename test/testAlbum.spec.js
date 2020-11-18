// eslint-disable-next-line no-unused-vars
import { describe, test } from '@jest/globals'

class Album {
  constructor(liste) {
    const { id, name, image } = liste
    this.id = id
    this.name = name
    this.image = image
  }

  get details() {
    return this.id + ' ' + this.name + ' ' + this.image
  }
}
describe('Artist', () => {
  test('Music:', () => {
    const artist = new Album({ id: '1', name: 'Bad', image: 'image.png' })
    expect(artist.details).toBe('1 Bad image.png')
  })
})
