<!-- List Detail -->

<script setup lang="ts">
import { useLists } from '@/composable/useLists';
import { useRoute } from 'vue-router';
import { reactive } from 'vue';


const { getListById, toggleItem, addItem } = useLists()
const listId = Number(useRoute().params.id)
const list = getListById(listId)

const form = reactive({
  name: ''
});

const handleSubmit = () => {
  if(!form.name.trim()) return;
  const itemName = form.name.trim()
  addItem(listId, itemName)
  form.name = ''
}
</script>

<template>
  <h1>List {{ listId }}</h1>
  <div v-for="item in list?.items" :key="item.id">
    <input type="checkbox" name="" id="item-{{ item.id }}" :checked="item.checked" @change="toggleItem(listId, item.id)"/>
    <label for="item-{{ item.id }}">{{ item.name }}</label>
  </div>

  <form @submit.prevent="handleSubmit">
    <input type="text" name="item-name" id="item-name" v-model="form.name" placeholder="Item name">
    <button type="submit">Add item</button>
  </form>
</template>
