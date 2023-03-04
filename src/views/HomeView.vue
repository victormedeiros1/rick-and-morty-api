<script lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const GET_CHARACTERS = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`

export default {
  name: 'HomeView',
  setup() {
    const { result, loading, error } = useQuery(GET_CHARACTERS)
    return {
      result,
      loading,
      error
    }
  }
}
</script>

<template>
  <h1>Listagem de Personagens</h1>
  <span v-if="error">Ops, um erro ocorreu!</span>
  <ul>
    <span v-if="loading">Carregando</span>
    <li v-else v-for="character in result.characters.results" :key="character.id">
      {{ character.name }}
      <img :src="character.image" />
    </li>
  </ul>
</template>
