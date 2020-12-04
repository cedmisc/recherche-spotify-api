<template>
  <div>
    <h1>{{ albumName }}</h1>
    <table>
      <tr>
        <th>Numéro de piste</th>
        <th>Titres</th>
        <th>Popularité</th>
      </tr>
      <tr v-for="tracks in orderedTracks" :key="tracks.id">
        <td>{{ tracks.track_number }}</td>
        <td>{{ tracks.name }}</td>
        <td>{{ tracks.popularity }}</td>
      </tr>
      <tr v-for="track in trackList" :key="track.id">
        <td>{{ track.track_number }}</td>
        <td>{{ track.name }}</td>
        <td>{{ track.popularity }}</td>
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
        'BQA0a4tn6UuuWYSlyVkgSFjpHUfcgTsn4L_N4_tMqE1X4rhmFX20fFIXH3nZHyfJkozuvo1UEUNVky7Es2I', // token d'accès à la BDD Spotify
      track: {},
      trackList: [],
      orderedTracks: [],
    }
  },

  mounted() {
    this.tracksList(this.albumId)
  },

  methods: {
    // méthode de récupération des titres de chanson d'un album
    async tracksList(albumId) {
      await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log('trackList json ' + json.items)
            this.trackList = json.items
            this.improveList(this.trackList)
            console.log('trackList ' + this.trackList[0].id)
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération des titres: ' + error)
        )
    },

    async improveList(list) {
      for await (const element of list) {
        await this.sortTrack(element.id)
        console.log('track : ' + this.track.name)
        console.log('OrderedTracks : ' + this.orderedTracks)
      }
      console.log('OrderedTracks fin : ' + this.orderedTracks)
      await this.orderList(this.orderedTracks)
      await console.log('arranged ' + this.orderedTracks)
    },

    // méthode de récupération d'une chanson
    async sortTrack(trackId) {
      await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log('track json ' + json)
            this.track = json
            this.orderedTracks.push(this.track)
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération d un titre: ' + error)
        )
    },

    // méthode de tri des chanson selon leur popularité
    orderList(list) {
      list.sort(function (a, b) {
        return b.popularity - a.popularity
      })
    },
  },
}
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}
</style>
