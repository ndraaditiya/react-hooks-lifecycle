import React, { useCallback, useState, useTransition } from 'react'

const ThirdChildComponent = () => {

  const [input, setInput] = useState('')
  const [lists, setLists] = useState([])
  const [isPending, startTransition] = useTransition()
  console.log('rendered third child element')

  const handleChange = useCallback((e) => {
    setInput(e.target.value)

    // the loop below will get low priority because added startTransition(), so the setInput() above will execute first
    // then the value on input type text whill show first during the looping process in the back
    // but useTransition hook means the element will rendererd twice, first when execute the setInput, then 2nd when the loop inside startTransition finished
    // this means you really must now when u really need useTransition for performance..
    // because when u put useTransition on Parent Element, the whole Parent Element and its Child Element while rendered twice
    // but when i imlpement useCallback on this function, this will not executed because it's depend on input state
    startTransition(() => {
      const listArray = []
      for (let i = 0; i < 30000; i++) {
        listArray.push(e.target.value)
      }
      setLists(listArray)
    })
  }, [input])

  return (
    <div>
      Third Child Component
      <input type='text' value={input} onChange={handleChange} placeholder='type something' />
      {isPending ? 'Loading..' : lists && lists.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  )
}

export default ThirdChildComponent
