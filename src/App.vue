<script setup lang="ts">
import { ref, computed } from 'vue';
import MainFooter from './components/MainFooter.vue';
import MainHeader from './components/MainHeader.vue';
import { useLists } from './composable/useLists';
import type { List } from './types/List';
import { useRoute, useRouter } from 'vue-router';
import ListSelector from './components/dialogs/ListSelector.vue';
import CreateList from './components/dialogs/CreateList.vue';


const route = useRoute()
const router = useRouter()

const {getLists, getListById, createList, removeList} = useLists()

const lists = computed(() => getLists())
const listId = computed(() => String(route.params.id))
const currentList = computed(() => getListById(listId.value))

const listSelect = ref<InstanceType<typeof ListSelector> | null>(null)
const createListDialog = ref<InstanceType<typeof CreateList> | null>(null)
function openListSelect(): void {
  listSelect.value?.open()
}

function openCreateList(): void {
  createListDialog.value?.open()
}

function selectList(list: List): void {
 router.push({ name: 'list', params: { id: list.id } })
}

function remove(id: string): void {
  removeList(id)
  if(id == listId.value) {
    router.push({ name: 'lists-index' })
  }
}
</script>

<template>
  <MainHeader
    :current-list="currentList"
    @select-list="openListSelect"
    @create-list="openCreateList"
   />

  <main class="container">
    <RouterView />
  </main>

  <MainFooter />

  <ListSelector
    ref="listSelect"
    :lists="lists"
    :current-list-id="currentList?.id"
    @select="selectList"
    @remove-list="remove($event)"
  />
  <CreateList ref="createListDialog" @create="createList" />
</template>

<style scoped></style>
