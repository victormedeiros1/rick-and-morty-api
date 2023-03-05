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
  name: 'Home',
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
    filterCharacters(event: Event) {
      event.preventDefault()
      this.characters = this.characters.filter((character) =>
        character.name.toLowerCase().includes(this.text.toLowerCase())
      )
    }
  }
}
</script>

<template>
  <section>
    <header class="q-pa-lg">
      <form @submit="filterCharacters">
        <div class="full-width flex no-wrap q-gutter-lg">
          <q-input
            class="full-width shadow-2"
            filled
            color="accent"
            type="text"
            outlined
            label="Procure por um personagem"
            v-model="text"
          />
          <q-btn type="submit" color="accent" label="Procurar" />
        </div>
      </form>
    </header>

    <div class="flex flex-center row q-gutter-lg">
      <q-spinner-cube v-if="loading" color="color-primary-main" size="2rem" />

      <q-card
        class="bg-transparent text-white"
        v-else
        v-for="character in characters"
        :key="character.id"
      >
        <q-card-section class="q-pb-none">
          <img :src="character.image" />
          <div v-if="character.status === 'Dead'" class="x-dead"></div>
        </q-card-section>

        <q-card-section class="q-pb-none">
          <div class="text-h6">{{ character.name }}</div>
        </q-card-section>

        <q-card-section class="q-py-none"> Status: {{ character.status }} </q-card-section>
        <q-card-section>
          <RouterLink style="text-decoration: none" :to="`/character/${character.id}`">
            <q-btn color="accent" label="Mais informações" />
          </RouterLink>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.x-dead {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after,
  &::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 100%;
    background-color: rgba(#9c1000, 50%);
  }

  &::after {
    transform: rotate(-45deg);
  }
  &::before {
    transform: rotate(45deg);
  }
}
</style>
