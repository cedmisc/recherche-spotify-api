<template>
  <div class="container">
    <h1 id="artist_name">{{ name }}</h1>
    <p class="lead">Sélectionnez un album pour voir la liste de ses titres:</p>
    <nuxt-link :to="{ name: 'index', params: { name } }">
      <button>Retour à la recherche</button>
    </nuxt-link>
    <div v-for="album in albums" id="block" :key="album.name + album.id">
      <nuxt-link
        :to="{
          name: 'album-albumId',
          params: {
            albumId: album.id,
            albumName: album.name,
            id,
            name,
            token,
          },
        }"
      >
        <img v-if="album.images[0]" :src="album.images[0].url" />
        <span>{{ album.name }}</span>
      </nuxt-link>
    </div>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // id de l'artiste
      id: this.$route.params.id,
      // nom de l'artiste
      name: this.$route.params.name,
      // token d'accès à la BDD Spotify
      token: this.$route.params.token,
      // liste des albums de l'artiste
      albums: [],
      // message d'erreur
      errorMessage: null,
    }
  },

  computed: {
    relatedId() {
      return this.artists.find((artist) => artist.id === this.id)
    },
    relatedName() {
      return this.artists.find((artist) => artist.name === this.name)
    },
  },

  mounted() {
    this.albumsList()
  },

  methods: {
    // méthode de récupération des albums de l'artiste sélectionné
    async albumsList() {
      if (this.id) {
        await fetch(
          `https://api.spotify.com/v1/artists/${this.id}/albums?country=FR&limit=50`,
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
              this.albums = json.items
            })
          })
          .catch((error) =>
            console.log('Erreur du fetch de la récupération d albums: ' + error)
          )
      } else {
        this.errorMessage = 'Aucun album trouvé pour cet artiste'
      }
    },
  },
}
</script>
