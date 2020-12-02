<template>
  <div class="container">
    <h1>Vous recherchez une musique?</h1>
    <p class="lead">
      Entrez le nom d'un artiste puis sélectionnez-le pour découvrir la liste de
      ses oeuvres:
    </p>
    <div>
      <input
        v-model="searchStr"
        type="text"
        class="form"
        placeholder="Nom de l'artiste ou du groupe"
        @keyup="search()"
      />
    </div>
    <div v-for="artist in artists" :key="artist.id" id="block">
      <nuxt-link
        :to="{
          name: 'artist-id',
          params: { id: artist.id, name: artist.name },
        }"
      >
        <img v-if="artist.images[0]" :src="artist.images[0].url" />
        <br />
        <span>{{ artist.name }}</span>
      </nuxt-link>
    </div>
    <h2>{{ token }}</h2>
  </div>
</template>

<script>
const fetch = require('node-fetch')

export default {
  data() {
    return {
      searchStr: null, // caractères tapés dans la zone de recherche
      artists: [], // résultat de la recherche d'artistes
      token: null, // token d'autorisation récupéré via app.js
      test: 'test pour nom artiste',
    }
  },

  /*  mounted() {
    this.token = fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            'fda8485a46ec429eb38ec3e3c97115ea' +
              ':' +
              '664c51f6e3dd4f09ab0cbabaf14915d0'
          ).toString('base64'),
      },
      body: {
        'Content-Type': 'application/x-www-form-urlencoded',
        grant_type: 'client_credentials',
      },
    })
      // .then((res) => res.json())
      .then((json) => {
        console.log(json)
        return json
      })
  }, */

  methods: {
    // Pour chercher un nom d'artiste en se connectant via l'API, token temporaire mis en dur mais à récupérer via app.js
    async search() {
      if (this.searchStr) {
        await fetch(
          `https://api.spotify.com/v1/search?q=${this.searchStr}&type=artist`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization:
                'Bearer BQCbkl2EJZ2Zr5kkbbbBaZ9xwaKV9HEJEavCOAig5IRaXz2QH9NBy-RDbpLvb9ayod0BvVUcp95KajfaJzM',
            },
          }
        )
          .then((response) => {
            response.json().then((json) => {
              this.artists = json.artists.items
            })
          })
          .catch((error) =>
            console.log('Erreur du fetch de recherche d artiste: ' + error)
          )
      } else {
        console.log("Pas de nom d'artiste dans l'espace de recherche")
      }
    },
  },
}
</script>

<style>
.container {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  font-size: 80px;
  letter-spacing: 1px;
  margin-bottom: 90px;
}
.lead {
  color: darkgray;
  font-size: xx-large;
  padding-bottom: 10px;
}
.form {
  width: 600px;
  min-height: 30px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
}
</style>
