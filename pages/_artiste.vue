<template>
  <div>
    <h1 class="title">Albums de Nom de l'artiste</h1>
    <ul class="albums">
      <li v-for="album in albums" :key="album.name">
        {{ album.image }}
        {{ album.name }}
        <ul>
          <li v-for="track in tracks" :key="track.popularity">
            {{ track.name }}
            {{ track.popularity }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
/* */
export default {
  name: 'Artiste',
  data() {
    return {
      /*     Album: {
        constructor(id, name, image) {
          this.id = id
          this.name = name
          this.image = image
        },
      }, */
    }
  },
}
</script>

<style scoped>
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
.albums {
  color: white;
  text-align: center;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
