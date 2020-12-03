<template>
  <div class="container">
    <h1 id="artist_name">{{ this.name }}</h1>
    <p class="lead">Sélectionnez un album pour voir la liste de ses titres:</p>
    <div v-for="album in albums" id="block" :key="album.name + album.id">
      <nuxt-link
        :to="{
          name: 'album-albumId',
          params: {
            albumId: album.id,
            albumName: album.name,
            token: token,
          },
        }"
      >
        <img v-if="album.images[0]" :src="album.images[0].url" />
        <span>{{ album.name }}</span>
        <span>{{ album.id }}</span>
      </nuxt-link>
    </div>
    <p>{{ errorMessage }} {{ token }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id, // id de l'artiste
      name: this.$route.params.name, // nom de l'artiste
      token:
        'BQDs6Jtl3bbVHV0uLHJDJFe_Ef98Pdhee0GAMPmAE0C_QpI2CvcrgH0Za3Fz_AafVYnRRZmcKvyqGsB7S_o', // token d'accès à la BDD Spotify
      albums: [],
      errorMessage: null,
      // paramètres de recherche pour les fetch
      param: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        Authorization: 'Bearer ' + this.token,
      },
    }
  },

  /* computed: {
    // récupération de l'ID de l'artiste sélectionné
    relatedId() {
      return this.artists.find((artist) => artist.id === this.id)
    },
    relatedName() {
      return this.artists.find((artist) => artist.name === this.name)
    },
    relatedToken() {
      return this.token.find((token) => token.value === this.value)
    },
  }, */

  mounted() {
    this.albumsList()
  },

  methods: {
    // méthode de récupération des albums de l'artiste sélectionné
    async albumsList() {
      if (this.id) {
        await fetch(
          `https://api.spotify.com/v1/artists/${this.id}/albums`,
          this.param
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
        console.log('Aucun album trouvé pour cet artiste')
      }
    },
  },
}
</script>

<style scoped>
.container {
  color: white;
}
</style>
