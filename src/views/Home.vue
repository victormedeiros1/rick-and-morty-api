<script lang="ts">
import { ref } from 'vue'
import Loading from '@/components/Loading.vue'
import axios from 'axios'
import type { Character } from '@/types/characters'

const query = `
  query Characters($page: Int!){
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        image
      }
    }
  }
`

interface Info {
  count: Number
  pages: Number
}

interface Data {
  characters: Character[]
  info: Info
  loading: boolean
  error: string
  text: string
  page: any
}

export default {
  name: 'Home',
  components: {
    Loading
  },
  data(): Data {
    return {
      characters: [],
      info: {
        count: 0,
        pages: 0
      },
      loading: false,
      error: '',
      text: '',
      page: ref(1)
    }
  },
  mounted() {
    this.getCharacters()
  },
  methods: {
    async getCharacters(page: any = 1) {
      try {
        this.loading = true

        const result = await axios.post('https://rickandmortyapi.com/graphql', {
          query,
          variables: {
            page
          }
        })

        this.characters = result.data.data.characters.results
        this.info = result.data.data.characters.info
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    filterCharacters(event: Event) {
      event.preventDefault()
      this.characters = this.characters.filter((character) =>
        character.name.toLowerCase().includes(this.text.toLowerCase())
      )
    },
    setPage() {
      this.getCharacters(this.page)
    }
  }
}
</script>

<template>
  <section>
    <header class="q-px-lg q-pb-lg">
      <form @submit="filterCharacters">
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
      </form>
    </header>

    <div class="flex column flex-center">
      <Loading v-if="loading" />

      <div v-else class="flex row flex-center q-gutter-lg">
        <q-card
          class="bg-transparent text-white shadow-3"
          v-for="character in characters"
          :key="character.id"
        >
          <q-card-section class="q-pb-none">
            <img :src="character.image" loading="lazy " />
            <div v-if="character.status === 'Dead'" class="x-dead"></div>
          </q-card-section>

          <q-card-section class="q-pb-none">
            <h1 class="text-h6">{{ character.name }}</h1>
          </q-card-section>

          <q-card-section class="q-py-none"
            ><span> Status: {{ character.status }} </span></q-card-section
          >
          <q-card-section>
            <RouterLink style="text-decoration: none" :to="`/character/${character.id}`">
              <q-btn color="accent" label="Mais informações" />
            </RouterLink>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          :max="Number(info.pages)"
          v-model="page"
          direction-links
          outline
          gutter="sm"
          color="info"
          active-design="unelevated"
          active-color="info"
          @click="setPage"
        />
      </div>
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
