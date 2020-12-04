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
    <div v-for="artist in artists" id="block" :key="artist.id">
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
      token:
        'BQA0a4tn6UuuWYSlyVkgSFjpHUfcgTsn4L_N4_tMqE1X4rhmFX20fFIXH3nZHyfJkozuvo1UEUNVky7Es2I', // token d'autorisation récupéré via app.js
    }
  },

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
              Authorization: 'Bearer ' + this.token,
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
