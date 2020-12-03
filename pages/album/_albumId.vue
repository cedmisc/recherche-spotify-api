<template>
  <div>
    <h1>{{ albumName }}</h1>
    <table v-for="tracks in orderedTracks" :key="tracks.id">
      <tr>
        <td>{{ tracks.name }}</td>
        <td>{{ tracks.popularity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // paramètres de recherche pour les fetch
      albumName: this.$route.params.albumName, // ID de l'album sélectionné
      albumId: this.$route.params.albumId, // Nom de cet album
      token:
        'BQDs6Jtl3bbVHV0uLHJDJFe_Ef98Pdhee0GAMPmAE0C_QpI2CvcrgH0Za3Fz_AafVYnRRZmcKvyqGsB7S_o', // token d'accès à la BDD Spotify
      track: {},
      trackList: [],
      orderedTracks: [],
    }
  },

  mounted() {
    this.sortTrackList()
  },

  methods: {
    async sortTrackList() {
      console.log('Entrée dans sortTrakcsList ')
      await this.tracksList(this.albumId)
      await console.log(
        'Entrée dans trackList: ' + this.albumId + ' ' + this.trackList
      )
    },

    // méthode de récupération des titres de chanson d'un album
    async tracksList(albumId) {
      await fetch(
        `https://api.spotify.com/v1/albums/${albumId}/tracks`,
        this.param
      )
        .then((response) => {
          response.json().then((json) => {
            console.log('trackList json ' + json.items)
            this.trackList = json.items
            this.improveList(this.trackList)
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération des titres: ' + error)
        )
    },

    async improveList(list) {
      for await (const tracks of list) {
        await this.sortTrack(tracks.id)
        console.log('track : ' + this.track.name)
        console.log('OrderedTracks : ' + this.orderedTracks)
      }
      console.log('OrderedTracks fin : ' + this.orderedTracks)
      await this.orderList(this.orderedTracks)
      await console.log('arranged ' + this.orderedTracks)
    },

    orderList(list) {
      list.sort(function (a, b) {
        return b.popularity - a.popularity
      })
    },

    // méthode de récupération d'une chanson
    async sortTrack(trackId) {
      await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, this.param)
        .then((response) => {
          response.json().then((json) => {
            console.log('track json ' + json)
            this.track = json
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération d un titre: ' + error)
        )
      this.orderedTracks.push(this.track)
    },
  },
}
</script>
