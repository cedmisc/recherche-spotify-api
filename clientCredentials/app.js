const request = require('request') // "Request" library

const clientId = 'fda8485a46ec429eb38ec3e3c97115ea' // Your client id
const clientSecret = '299f70db486a45d99c695f60921a0c37' // Your secret

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic <base64 encoded' + clientId + ':' + clientSecret + '>',
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
}

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    const token = body.access_token
    const options = {
      url: 'https://api.spotify.com/v1',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
    }
    request.get(options, function (error, response, body) {
      if (error) {
        console.log(error)
      } else {
        console.log(body)
        return token
      }
    })
  }
})