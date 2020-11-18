<template>
  <div>
    <h1 class="title">Vous recherchez une musique?</h1>
    <section class="container">
      <p class="lead">
        Entrez le nom d'un artiste pour découvrir sa musicographie:
      </p>
      <div>
        <input
          v-model="searchStr"
          type="text"
          class="form"
          placeholder="Nom de l'artiste ou du groupe"
        />
      </div>
    </section>
    <ul>
      <li v-for="artist in artists" :key="artist.name">
        {{ artist.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchStr: null,
      artists: {},
    }
  },
  methods: {
    callback() {
      fetch(`https://api.spotify.com/v1/search?q=${this.searchStr}&type=artist`)
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          return (this.artists = res.artists.items)
        })
    },
  },
  head() {
    return { title: 'Mon application Spotify' }
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
  font-weight: 300;
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
