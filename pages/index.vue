<template>
  <div>
    <section class="container">
      <h1 class="title">Vous recherchez une musique?</h1>
      <p class="lead">
        Entrez le nom d'un artiste pour découvrir la liste de ses oeuvres:
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
    </section>
    <ul>
      <li v-for="artist in artists" :key="artist.name">
        <nuxt-link>{{ artist.name }} </nuxt-link>
      </li>
    </ul>
    <a href="artiste/" target="_blank" class="button--green">Artiste</a>
  </div>
</template>

<script>
// Adresse à utiliser pour récupérer els éléments
// const listAlbums = `https://api.spotify.com/v1/artists/{id}/albums`
// const listTrack = `https://api.spotify.com/v1/albums/{id}/tracks`

export default {
  data() {
    return {
      name: this.$route.params.name,
      searchStr: null,
    }
  },
  methods: {
    // Pour chercher un nom d'artiste en se connectant via l'API, token temporaire mis en dur mais à récupérer via app.js
    search() {
      if (this.searchStr) {
        try {
          fetch(
            `https://api.spotify.com/v1/search?q=${this.searchStr}&type=artist`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:
                  'Bearer ' +
                  'BQBXdrpY_Eq-FJbwSFpgSVNcbntE54KXMuXHuHpBo0z_MYMcfaN6I4siI3pF81BEFCLxKl7kc8u07rVJ4mMMgQ72eX9O5M-QL7nl_aoxarQJH9-cKdMexUP8oj5W-ILsN9V6VTvQWDwsWZB-4Afhozl4-1Q3yihbYyA',
              },
            }
          )
            .then((res) => {
              return res.json()
            })
            .then((res) => {
              return (this.artists = res.items)
            })
        } catch {
          console.log('Erreur: catch de la méthode serach()')
        }
      } else {
        console.log("Pas de nom d'artiste dans l'espace de recherche")
      }
    },
  },
}
</script>

<style scoped>
.container {
  text-align: center;
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding-left: 20%;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: bold;
  font-size: 80px;
  letter-spacing: 1px;
  text-align: center;
  color: white;
  margin-bottom: 100px;
}
.lead {
  color: darkgray;
  font-size: xx-large;
  padding-bottom: 10px;
}
.form {
  width: 800px;
  min-height: 30px;
  background-color: white;
  border-radius: 10px;
  text-align: center;
}
</style>
