<script setup lang="ts">
import { ref } from 'vue';
import { useHistory } from './hooks/use-history';

const {execute, canRedo, canUndo, undo, redo} = useHistory({size: 10})

const numbs = ref(0);

function addNumb() {
  execute({
    do: () => numbs.value += 1,
    undo: () => {
      console.log('undoing from ', numbs, 'to', numbs.value - 1)
      numbs.value -= 1
    }
  })
}
function subNumb() {
  execute({
    do: () => numbs.value --,
    undo: () => numbs.value ++
  })
}
</script>

<template>
  <div>
    <div>
      <p>Can undo: {{ canUndo ? 'y' : 'n' }}</p>
      <p>Can redo: {{ canRedo ? 'y' : 'n' }}</p>
    </div>
    <button :onClick="addNumb" >+</button>
    <button :onClick="subNumb" >-</button>
    <button>{{ numbs }}</button>
  </div>

  <div class="">
    <button :onClick="undo" :disabled="!canUndo">Undo</button>
    <button :onClick="redo" :disabled="!canRedo">Redo</button>
  </div>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
