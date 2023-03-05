<script lang="ts">
import axios from 'axios'
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
    }
  }`

interface Data {
  character: Character
  loading: boolean
  error: boolean
}

export default {
  name: 'ProfileView',

  data(): Data {
    return {
      character: {
        id: '',
        name: '',
        status: '',
        species: '',
        gender: '',
        image: ''
      },
      loading: true,
      error: false
    }
  },

  mounted() {
    this.getCharacter()
  },

  methods: {
    async getCharacter() {
      try {
        const id = this.$route.params.id
        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: {
            id
          }
        })
        this.character = result.data.data.character
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <section>
    <div class="characters-list flex row q-gutter-lg">
      <q-spinner-cube v-if="loading" color="color-primary-main" size="2rem" />

      <q-card class="bg-secondary text-white" v-else>
        <q-card-section>
          <!-- <img :src="character.image" /> -->
          <div class="text-h6">{{ character.name }}</div>
        </q-card-section>

        <q-separator dark inset />

        <!-- <q-card-section> Status: {{ character.status }} </q-card-section> -->
        <RouterLink :to="`/character/${character.id}`"> Mais informações </RouterLink>
      </q-card>
    </div>
  </section>
</template>
