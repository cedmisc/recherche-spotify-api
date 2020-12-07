import { describe, test } from '@jest/globals'
import tracksList from '../pages/album/_albumId'

describe('tracks asyncfetch', () => {
  test('track:', async () => {
    const result = await tracksList('12Chz98pHFMPJEknJQMWvI')
    expect(result).not.toBeNull()
  })
})
