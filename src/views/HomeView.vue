<script lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

export default {
  name: 'HomeView',
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY)
    return {
      result,
      loading,
      error
    }
  }
}

const CHARACTERS_QUERY = gql`
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
</script>

<template>
  <h1>Listagem de Personagens</h1>
  <span v-if="error">Ocorreu um erro</span>
  <ul>
    <span v-if="loading">Carrgando</span>
    <li v-else v-for="character in result.characters.results" :key="character.id">
      {{ character.name }}
    </li>
  </ul>
</template>
