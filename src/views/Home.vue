<script lang="ts">
import Loading from '@/components/Loading.vue'
import Card from '@/components/Card.vue'
import axios from 'axios'
import type { Character } from '@/types/characters'

const query = `
  query Characters($page: Int!){
    characters(page: $page) {
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
  options: string[]
  optionSelected: string
  loading: boolean
  text: string
  page: number
}

export default {
  name: 'Home',
  components: {
    Loading,
    Card
  },
  data(): Data {
    return {
      characters: [],
      options: ['Alive', 'Dead', 'unknown'],
      optionSelected: '',
      loading: true,
      text: '',
      page: 1
    }
  },
  mounted() {
    this.getCharacters()
  },
  methods: {
    async getCharacters(page: number = 1) {
      try {
        this.loading = true
        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: {
            page
          }
        })

        this.characters = result.data.data.characters.results
      } catch (error) {
        console.log(error)
      } finally {
        // Fake loading
        setTimeout(() => {
          this.loading = false
        }, 2000)
      }
    },
    filterCharacters(event: Event) {
      event.preventDefault()
      this.characters = this.characters.filter(
        (character) =>
          character.name.toLowerCase().includes(this.text.toLowerCase()) &&
          character.status === this.optionSelected
      )
    }
  }
}
</script>

<template>
  <section>
    <header class="q-px-lg q-pb-lg text-center">
      <h1 class="text-h3 q-py-lg text-weight-bold">RICK AND MORTY PERSONAGENS</h1>
      <form @submit="filterCharacters" class="q-gutter-lg">
        <div class="flex no-wrap q-gutter-lg">
          <q-input
            class="text-field full-width shadow-2"
            color="accent"
            bg-color="accent"
            type="text"
            outlined
            label="Procure por um personagem"
            v-model="text"
          />
          <q-btn type="submit" color="accent" label="Procurar" />
        </div>
        <div>
          <q-select
            class="select-input shadow-2"
            color="accent"
            bg-color="accent"
            outlined
            v-model="optionSelected"
            :options="options"
            label="Status"
          />
        </div>
      </form>
    </header>

    <div class="flex column flex-center">
      <Loading v-if="loading" />

      <div class="flex row q-mx-auto q-gutter-lg">
        <span class="text-h2 text-weight-bold q-py-lg" v-if="characters.length === 0">
          Nenhum resultado encontrado
        </span>

        <article v-else v-for="character in characters" :key="character.id">
          <RouterLink style="text-decoration: none" :to="`/character/${character.id}`">
            <Card :character="character" :loading="loading" />
          </RouterLink>
        </article>
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          :max="10"
          v-model="page"
          direction-links
          outline
          gutter="sm"
          color="info"
          active-design="unelevated"
          active-color="info"
          @click="getCharacters(page)"
        />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
article {
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
