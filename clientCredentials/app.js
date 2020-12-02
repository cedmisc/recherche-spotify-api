const request = require('request') // "Request" library

const clientId = 'fda8485a46ec429eb38ec3e3c97115ea' // Your client id
const clientSecret = '664c51f6e3dd4f09ab0cbabaf14915d0' // Your secret

// your application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    Authorization:
      'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
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
    console.log(token)
    /* const options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      json: true,
    }
    request.get(options, function (error, response, body) {
      console.log(body)
    }) */
  }
})

// export { token }
