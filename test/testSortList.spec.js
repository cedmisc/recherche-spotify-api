import { describe, test } from '@jest/globals'

function orderList(list) {
  list.sort(function (a, b) {
    return b.popularity - a.popularity
  })
}

const songList = [
  { id: 1, name: 'aa', popularity: 25 },
  { id: 3, name: 'cc', popularity: 100 },
  { id: 30, name: 'bb', popularity: 5 },
  { id: 10, name: 'zz', popularity: 500 },
  { id: 5, name: 'ee', popularity: 80 },
]

describe('sort array object', () => {
  test('sortByPopularity: ', async () => {
    await orderList(songList)
    expect(songList[0].id).toEqual(10)
    expect(songList[4].popularity).toEqual(5)
    expect(songList[2].name).toEqual('ee')
  })
})
