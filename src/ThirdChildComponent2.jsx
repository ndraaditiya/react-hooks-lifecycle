import React, { useDeferredValue, useEffect, useMemo, useState } from 'react'

const ThirdChildComponent2 = () => {
  const [input, setInput] = useState('')
  console.log('rendered third child element 2')

  return (
    <div style={{ marginTop: 20 }}>
      {console.log('rendered third child element 2 inside return')}
      Third Child Component 2 {`(useDefferedValue) `}
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='type something'
      />
      <div className='box-input-lists'>
        <List input={input} />
      </div>
    </div>
  )
}

export default ThirdChildComponent2

function List({ input }) {
  const defferedInput = useDeferredValue(input)
  const lists = useMemo(() => {
    const list = []
    for (let i = 0; i < 10000; i++) {
      list.push(<p key={i}>{defferedInput}</p>)
    }

    return list
  }, [defferedInput])

  useEffect(() => {
    console.log(`Input Value: ${input}\nDeffered Value: ${defferedInput}`)
  }, [input, defferedInput])

  return lists
}

// the function or purpose from useDefferedValue is same like useTransition to hold the function (in example above is for loop) until the user finish the input. This case is like debounce function.
// Anyway, the different beetween useDefferedValue and useTransition is, useTransition wraps a block of code updating state and useDeferreredValue wraps a single value.
// see the console log on useEffect to see the defferedValue when it's changing to the same as input value
