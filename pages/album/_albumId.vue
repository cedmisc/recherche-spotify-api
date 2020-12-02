<template>
  <div class="container">
    <h1 id="artist_name">Nom de l'album : {{ album.name }}</h1>
    <ol>
      <li v-for="track in trackList" :key="track.id">
        {{ track.name }}
        {{ track.id }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'AlbumId',
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
      album: [], // éléments de l'artiste sélectionné
      albumId: this.$route.params.albumId, // id de cet artiste
      trackList: [],
    }
  },

  mounted() {
    this.tracksList(this.albumId)
  },

  methods: {
    async tracks() {
      if (this.albums) {
        let album
        let tracksList
        console.log('this.albums existe ' + this.albums.length)
        for (let i = 0; i < this.albums.length; i++) {
          const albumsWithTracks = { album, tracksList }
          await console.log(i + ' : ' + this.albums[i].id)
          albumsWithTracks.album = await this.albums[i]
          await this.tracksList(this.albums[i].id)
          await console.log('tracksList: ' + this.trackList)
          await this.sortTrackList()
          albumsWithTracks.tracksList = this.trackListArranged
          await console.log('albumsWT: ' + albumsWithTracks.tracksList)
          this.newAlbums[i] = albumsWithTracks
          await console.log('Je suis dans la boucle for: ' + i)
          await console.log(albumsWithTracks.album)
          await console.log(albumsWithTracks.tracksList)
          await console.log(this.newAlbums[i])
        }
        console.log('newAlb: ' + this.newAlbums)
      } else {
        console.log('liste d albums non remplie')
      }
    },

    async sortTrackList() {
      await console.log('Entrée dans sortTrakcsList ')
      for (let i = 0; i < this.trackList.length; i++) {
        await console.log('entrée dans la boucle')
        await this.sortTrack(this.trackList[i].id)
        await console.log('id: ' + this.trackList[i].id)
        this.trackListArranged[i] = this.track
        await console.log('track : ' + this.track)
      }
      this.trackListArranged.sort(function (a, b) {
        return a.popularity - b.popularity
      })
      await console.log('arranged ' + this.trackListArranged)
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
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération des titres: ' + error)
        )
    },
    // méthode de récupération d'une chanson
    async sortTrack(TrackId) {
      await fetch(`https://api.spotify.com/v1/tracks/${TrackId}`, this.param)
        .then((response) => {
          response.json().then((json) => {
            console.log('track json ' + json)
            this.track = json
          })
        })
        .catch((error) =>
          console.log('Erreur du fetch de la récupération des titres: ' + error)
        )
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
