<script lang="ts">
import axios from 'axios'
import type { Character } from '@/types/characters'
const query = `{
    characters {
      results {
        id
        name
        status
        image
      }
    }
  }
`
interface Data {
  characters: Character[]
  loading: boolean
  error: string
  text: string
}

export default {
  name: 'HomeView',
  data(): Data {
    return {
      characters: [],
      loading: false,
      error: '',
      text: ''
    }
  },
  mounted() {
    this.getCharacters()
  },
  methods: {
    async getCharacters() {
      try {
        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query
        })

        this.characters = result.data.data.characters.results
      } catch (error) {
        console.log(error)
      }
    },
    filterCharacters() {
      this.characters = this.characters.filter((character) =>
        character.name.toLowerCase().includes(this.text.toLowerCase())
      )
    }
  }
}
</script>

<template>
  <section>
    <header>
      <q-input type="text" label="Procure por um personagem" outlined v-model="text" />
      <QBtn color="primary" label="Procurar" @click="filterCharacters" />
    </header>

    <div class="characters-list flex row q-gutter-lg">
      <q-spinner-cube v-if="loading" color="color-primary-main" size="2rem" />

      <q-card
        class="bg-secondary text-white"
        v-else
        v-for="character in characters"
        :key="character.id"
      >
        <q-card-section>
          <img :src="character.image" />
          <div class="text-h6">{{ character.name }}</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section> Status: {{ character.status }} </q-card-section>
        <RouterLink :to="`/character/${character.id}`"> Mais informações </RouterLink>
      </q-card>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
