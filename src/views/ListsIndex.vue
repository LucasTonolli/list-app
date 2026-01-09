<!-- Display all lists -->

<script lang="ts" setup>
import { useLists } from '../composable/useLists'

const { getLists } = useLists()

console.log(getLists())
</script>

<template>
  ola
</template>
