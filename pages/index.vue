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
    <div v-for="artist in artists" id="block" :key="artist.id + artist.name">
      <nuxt-link
        :to="{
          name: 'artist-id',
          params: { id: artist.id, name: artist.name, token },
        }"
      >
        <img v-if="artist.images[0]" :src="artist.images[0].url" />
        <br />
        <span v-if="artist">{{ artist.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
const fetch = require('node-fetch')

export default {
  data() {
    return {
      // caractères tapés dans la zone de recherche
      searchStr: this.$route.params.name,
      // résultat de la recherche d'artistes
      artists: [],
      // token d'autorisation à récupérer via app.js
      token:
        'BQAfZ6wB1NxQP0W3NbmwdMgzIigKdHTS5keoqjpCU4t61mV5Bcxb4-yRSe4o6ubhZpS3iKyeDV7GFSWgQ3Q', // token d'autorisation récupéré via app.js
    }
  },

  mounted() {
    if (this.searchStr) {
      this.search()
    }
  },

  methods: {
    // Pour chercher un nom d'artiste en se connectant via l'API
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
          .catch((error) =>
            console.log(
              'search: Erreur du fetch de recherche d artiste: ' + error
            )
          )
          .then((response) => {
            response
              .json()
              .catch((error) =>
                console.log('search: Erreur dans la réponse du fetch: ' + error)
              )
              .then((json) => {
                this.artists = json.artists.items
              })
          })
          .catch((error) =>
            console.log(
              'search: Erreur dans le retour de la liste des artistes: ' + error
            )
          )
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
