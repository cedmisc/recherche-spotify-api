<template>
  <div class="container">
    <h1 id="artist_name">{{ this.name }}</h1>
    <p class="lead">Sélectionnez un album pour voir la liste de ses titres:</p>
    <div v-for="album in albums" :key="album.name + album.id" id="block">
      <nuxt-link :to="`/album/${album.id}`">
        <img v-if="album.images[0]" :src="album.images[0].url" />
        <span>{{ album.name }}</span>
        <span>{{ album.id }}</span>
      </nuxt-link>
    </div>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Id',
  data() {
    return {
      // paramètres de recherche pour les fetch
      param: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer BQCbkl2EJZ2Zr5kkbbbBaZ9xwaKV9HEJEavCOAig5IRaXz2QH9NBy-RDbpLvb9ayod0BvVUcp95KajfaJzM',
        },
      },
      id: this.$route.params.id, // id de l'artiste
      name: this.$route.params.name, // nom de l'artiste
      albums: [],
      errorMessage: null,
    }
  },

  computed: {
    // récupération de l'ID de l'artiste sélectionné
    /* relatedId() {
      return this.artists.find((artist) => artist.id === this.id)
    },
     relatedName() {
      return this.artists.find((artist) => artist.name === this.name)
    }, */
  },

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
ul {
  color: white;
}
li {
  color: white;
}
</style>
