import React, { useEffect, useState } from 'react'
import SecondChildComponent from './SecondChildComponent'
import UseAPI from './UseApi'

const ChildComponent = ({ Incrementor, setCount, id }) => {

  const { data: dataFromUSeApi } = UseAPI('https://jsonplaceholder.typicode.com/users')
  const [dataChild, setDataChild] = useState([])

  const [name, setName] = useState('')
  const [animal, setAnimal] = useState('')

  console.log('id on Child Component from parent: ' + id)

  useEffect(() => {
    console.log('rendered inside useEffect child')
    setDataChild(Incrementor())
  }, [Incrementor])

  return (
    <div>
      Child Component

      {/* this setName below will not rerendered Parent Element becuse the setName not from Parent Element
        bu will rerenderr this element and the 2nd child element when the input changing each character
      */}
      <input type='text' onChange={(e) => setName(e.target.value)} />

      {/* the setCount on button below will rerendered whole Parent Element except func */}
      <button onClick={() => setCount((prev) => prev + 1)}>Count from Child</button>
      <br />
      {dataChild.map((i, index) => <span key={index}>{i + ' '}</span>)}
      <SecondChildComponent setAnimal={setAnimal} />
    </div>
  )
}

export default ChildComponent
