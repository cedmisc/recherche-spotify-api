<template>
  <div>
    <h1>
      {{ name }} {{ id }} <br />
      {{ albumName }}
    </h1>
    <nuxt-link
      :to="{
        name: 'artist-id',
        params: { albumName, albumId, name, id, token },
      }"
    >
      <button>Retour à la liste des albums</button>
    </nuxt-link>
    <table>
      <tr>
        <th>Numéro de piste</th>
        <th>Titres</th>
        <th>Popularité</th>
      </tr>
      <tr v-for="tracks in orderedTracks" :key="tracks.name + tracks.id">
        <td>{{ tracks.track_number }}</td>
        <td>{{ tracks.name }}</td>
        <td>{{ tracks.popularity }}</td>
      </tr>
      <tr v-for="track in trackList" :key="track.name + track.id">
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
      // ID de l'album sélectionné
      albumName: this.$route.params.albumName,
      // Nom de cet album
      albumId: this.$route.params.albumId,
      // token d'accès à la BDD Spotify
      token: this.$route.params.token,
      // nom de l'artiste
      name: this.$route.params.name,
      // id de l'artiste
      id: this.$route.params.id,
      // liste des pistes de l'album
      trackList: [],
      // liste des pistes de l'album classées par popularité
      orderedTracks: [],
    }
  },

  created() {
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
            this.trackList = json.items
            console.log('trackList ' + this.trackList[0].id)
            this.improveList(this.trackList)
              .then((ok) => this.orderList(ok))
              .then((test) => console.log(test))
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération des titres: ' + error)
        )
    },

    async improveList(list) {
      for await (const item of list) {
        console.log('element id : ' + item.id)
        await this.sortTrack(item.id)
      }
      // await this.orderList(this.orderedTracks)
      return this.orderedTracks
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
            this.orderedTracks.push(json)
            console.log('orderedTracks json ' + json)
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération d un titre: ' + error)
        )
    },

    // méthode de tri des chanson selon leur popularité
    orderList(list) {
      list.sort(function (a, b) {
        return b.popularity > a.popularity
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
