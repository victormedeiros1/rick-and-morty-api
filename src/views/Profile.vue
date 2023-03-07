<script lang="ts">
import axios from 'axios'
import Loading from '@/components/Loading.vue'
import ButtonBack from '@/components/ButtonBack.vue'
import Card from '@/components/Card.vue'
import type { Character } from '@/types/characters'

const query = `
  query($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
      episode {
        id
        name
      }
    }
  }`

interface Data {
  character: Character
  loading: boolean
}

export default {
  name: 'Profile',
  components: {
    ButtonBack,
    Loading,
    Card
  },

  data(): Data {
    return {
      character: {
        id: '',
        name: '',
        image: '',
        status: '',
        gender: '',
        species: '',
        episode: []
      },
      loading: true
    }
  },
  mounted() {
    this.getCharacter()
  },
  methods: {
    async getCharacter() {
      try {
        this.loading = true
        const id = this.$route.params.id
        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: {
            id
          }
        })
        this.character = result.data.data.character
      } catch (error) {
        console.log(error)
      } finally {
        // Fake loading
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    }
  }
}
</script>

<template>
  <section>
    <Loading v-if="loading" />

    <div class="flex row q-gutter-lg">
      <ButtonBack />
      <Card :character="character" :loading="loading" />
    </div>
  </section>
</template>
