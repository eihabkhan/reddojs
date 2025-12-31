<script lang="ts">
  import { useHistory } from './hooks/use-history.svelte';

  const history = useHistory({ size: 100, coalesce: true });

  let numbs = $state(0);
  let color = $state('#ffffff');

  function addNumb() {
    history.execute({
      do: () => numbs += 1,
      undo: () => numbs -= 1
    });
  }

  function subNumb() {
    history.execute({
      do: () => numbs--,
      undo: () => numbs++
    });
  }

  function changeColor(e: Event) {
    const oldValue = color;
    const newValue = (e.target as HTMLInputElement).value;

    history.execute({
      key: 'color-change',
      do: () => color = newValue,
      undo: () => color = oldValue,
    });
  }
</script>

<div>
  <div>
    <p>Can undo: {history.canUndo ? 'y' : 'n'}</p>
    <p>Can redo: {history.canRedo ? 'y' : 'n'}</p>
  </div>
  <button onclick={addNumb}>+</button>
  <button onclick={subNumb}>-</button>
  <button>{numbs}</button>
</div>

<div>
  <button onclick={history.undo} disabled={!history.canUndo}>Undo</button>
  <button onclick={history.redo} disabled={!history.canRedo}>Redo</button>
</div>

<div>
  <input oninput={changeColor} value={color} type="color" id="foreground" name="foreground" />
  <label for="foreground">Foreground color</label>
</div>

<style>
  button:disabled {
    opacity: 0.4;
  }
</style>
