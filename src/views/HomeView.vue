<script lang="ts">
import axios from 'axios'
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

interface Character {
  id: string
  name: string
  status: string
  image: string
}

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
        const result = await axios('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          data: JSON.stringify({ query })
        })

        this.characters = result.data.data.characters.results
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <section>
    <header>
      <q-input outlined v-model="text" type="text" label="Procure por um personagem" />
      {{ text }}
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
