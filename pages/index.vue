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
        {{ artist.name }}
      </li>
    </ul>
    <a href="artiste/" target="_blank" class="button--green">Artiste</a>
  </div>
</template>

<script>
export default {
  Artist: {
    constructor(id, name, genre) {
      this.id = id
      this.name = name
      this.genre = genre
    },
  },
  Artists: {
    constructor([artist]) {
      this.artist = [artist]
    },

    data() {
      return {
        name: this.$route.params.name,
        searchStr: null,
        artists: [
          {
            id: 'test',
            name: 'Patty Smith',
            genre: 'rock',
          },
          {
            id: 'test2',
            name: 'Mozart',
            genre: 'classique',
          },
          {
            id: 'test3',
            name: 'Louis Armstrong',
            genre: 'jazz',
          },
        ],
      }
    },
    methods: {
      search() {
        if (this.searchStr) {
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
              return (this.artists = res.item)
            })
        } else {
          console.log("Pas de nom d'artiste dans l'espace de recherche")
        }
      },

      getAlbums() {
        fetch(`https://api.spotify.com/v1/artists/{id}/albums`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' +
              'BQBXdrpY_Eq-FJbwSFpgSVNcbntE54KXMuXHuHpBo0z_MYMcfaN6I4siI3pF81BEFCLxKl7kc8u07rVJ4mMMgQ72eX9O5M-QL7nl_aoxarQJH9-cKdMexUP8oj5W-ILsN9V6VTvQWDwsWZB-4Afhozl4-1Q3yihbYyA',
          },
        })
          .then((res) => {
            return res.json()
          })
          .then((res) => {
            return (this.artists = res.item)
          })
      },
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
