import { useState } from 'react'
import { useHistory } from './hooks/use-history'
import './App.css'

function App() {
  const { execute, canUndo, canRedo, undo, redo } = useHistory({ size: 100, coalesce: true })

  const [numbs, setNumbs] = useState(0)
  const [color, setColor] = useState('#ffffff')

  function addNumb() {
    execute({
      do: () => setNumbs(prev => prev + 1),
      undo: () => setNumbs(prev => prev - 1)
    })
  }

  function subNumb() {
    execute({
      do: () => setNumbs(prev => prev - 1),
      undo: () => setNumbs(prev => prev + 1)
    })
  }

  function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
    const oldValue = color
    const newValue = e.target.value

    execute({
      key: 'color-change',
      do: () => setColor(newValue),
      undo: () => setColor(oldValue),
    })
  }

  return (
    <>
      <div>
        <div>
          <p>Can undo: {canUndo ? 'y' : 'n'}</p>
          <p>Can redo: {canRedo ? 'y' : 'n'}</p>
        </div>
        <button onClick={addNumb}>+</button>
        <button onClick={subNumb}>-</button>
        <button>{numbs}</button>
      </div>

      <div>
        <button onClick={undo} disabled={!canUndo}>Undo</button>
        <button onClick={redo} disabled={!canRedo}>Redo</button>
      </div>

      <div>
        <input onChange={changeColor} value={color} type="color" id="foreground" name="foreground" />
        <label htmlFor="foreground">Foreground color</label>
      </div>
    </>
  )
}

export default App
