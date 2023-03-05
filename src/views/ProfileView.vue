<template>
  <section>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error">Ops, tivemos um problema...</div>
    <div v-else>Dados encontrados!</div>
  </section>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  name: 'ProfileView',

  data() {
    return {
      loading: true,
      error: false,
      data: {
        character: {
          results: [
            {
              id: '',
              name: ''
            }
          ]
        }
      }
    }
  },

  async mounted() {
    await this.getCharacter()
  },

  methods: {
    async getCharacter() {
      try {
        const id = this.$route.params.id
        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query: `query($id: ID!) {
            character(id: $id) {
              id
              name
            }
          }`,
          variables: {
            id
          }
        })

        console.log('RESULT', result)
        this.data.character.results = result.data.data.character.results
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>
