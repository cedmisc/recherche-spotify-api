<template>
  <div class="container">
    <h1 id="artist_name">{{ name }}</h1>
    <p class="lead">Sélectionnez un album pour voir la liste de ses titres:</p>
    <div v-for="album in albums" id="block" :key="album.name + album.id">
      <nuxt-link
        :to="{
          name: 'album-albumId',
          params: {
            albumId: album.id,
            albumName: album.name,
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
        'BQA0a4tn6UuuWYSlyVkgSFjpHUfcgTsn4L_N4_tMqE1X4rhmFX20fFIXH3nZHyfJkozuvo1UEUNVky7Es2I', // token d'accès à la BDD Spotify
      albums: [],
      errorMessage: null,
    }
  },

  computed: {
    // récupération de l'ID de l'artiste sélectionné
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
        await fetch(`https://api.spotify.com/v1/artists/${this.id}/albums`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.token,
          },
        })
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
