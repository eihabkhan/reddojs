<script setup lang="ts">
import { ref } from 'vue';
import { useHistory } from './hooks/use-history';

const {execute, canRedo, canUndo, undo, redo} = useHistory({size: 100, coalesce: true})

const numbs = ref(0);
const color = ref('#ffffff');

function addNumb() {
  execute({
    do: () => numbs.value += 1,
    undo: () => numbs.value -= 1
  })
}
function subNumb() {
  execute({
    do: () => numbs.value --,
    undo: () => numbs.value ++
  })
}

function changeColor(e: Event) {
  let oldValue = color.value
  const newValue  = (e.target as HTMLInputElement).value
  
  execute({
    key: 'color-change',
    do: () => color.value = newValue,
    undo: () => color.value = oldValue,
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

  <div>
    <input @input="changeColor" :value="color" type="color" id="foreground" name="foreground"  />
    <label for="foreground">Foreground color</label>
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

button[disabled] {
  opacity: 0.4;
}
</style>
