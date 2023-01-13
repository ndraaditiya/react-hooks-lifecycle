import { useState, useEffect, useCallback, useMemo, useRef, useId } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UseAPI from './UseApi'
import ChildComponent from './ChildComponent'

// So the conclusion is, when "set" hook on useState accessed,
// it'll rerender the whole App element and all the Child Element except fucntion

function App() {
  // this custom hook just will render once and not rerender when state changed because
  // inside this custom hook there's a useEffct with url props
  const { data: dataFromUSeApi } = UseAPI('https://jsonplaceholder.typicode.com/todos')

  // this all below will exactly executed when every state changed or function called, no matter what it's that
  const key = useId()
  const refName = useRef()
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [resource, setResource] = useState('posts')

  const [fruit, setFruit] = useState('')

  // this log below will exactly executed when every state changed or function called, no matter what it's that
  console.log('rendrrred parent');

  useMemo(() => {
    console.log('Inside useMemo') // this will only execute when count changed
  }, [count])

  useEffect(() => {
    // the function belom will execute when resource changed, but it'll execute when first time rendered
    fetchDT()
  }, [resource])

  useEffect(() => {
    // the function belom will execute once when first time rendered
    fetchDT2()
  }, [])

  // this log below will exactly executed when every state changed or function called, no matter what it's that
  console.log('rendrrred parent below useEffect');

  const fetchDT = () => {
    console.log('render function fetch data')
    fetch(`https://jsonplaceholder.typicode.com/${resource}`)
      .then(response => response.json())
      .then(json => setData(json))
  }

  const fetchDT2 = () => {
    console.log('rendered data 2')
  }

  const Incrementor = useCallback(() => { //this func only executed on child element when the count changed
    return [count, count + 2, count + 3]
  }, [count])

  const showLOg = () => {
    console.log('render function showLog: ' + fruit)
  }

  return (
    <div className="App">
      {/* this log below will exactly executed when every state changed or function called, no matter what it's that */}
      {console.log('elements on return App')}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        {/* when input text use onChange, the whole App element will rendered except func 
          So, if you dont use or wanna know the value of name realtime. You better use useRef
        */}
        <input
          type="text"
          // value={name} onChange={(e) => ertsetName(e.target.value)}
          ref={refName}
        />

        {/* this button below while rerender the whole app element whne it's clicked, beacuse there's a setName hooks */}
        <button onClick={() => setName(refName.current.value)}>Show Input</button>

        <input type='text' onChange={(e) => setFruit(e.target.value)} />

        {/* this button below just will executed func showLog and not rerender the whole App element */}
        <button onClick={showLOg}>Show log Fruit</button>
        <h5>{name}</h5>

        {/* this two  button below while rerender the whole app element beacuse there's a setName hooks */}
        <button onClick={() => setResource('comments')}>Comments</button>
        <button onClick={() => setResource('photos')}>Photos</button>
      </div>
      {/* <br /> */}
      <ChildComponent Incrementor={Incrementor} setCount={setCount} id={key} />
    </div>
  )
}

export default App

//will show before render App element
console.log('outside APP')