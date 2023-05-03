import React, { memo } from 'react'
import ThirdChildComponent from './ThirdChildComponent'
import ThirdChildComponent2 from './ThirdChildComponent2'

// memo() is jut like useMemo(), the different is, memo() is for memorized component and useMemo() is for variable
// we can see, in this case, when user change the name input on Child Element, this element will not rerender because has memorized with memo()
// it's also with Third Child Component, it'll not rerendred beacuse Third Child Component inside Second Child Component and has memorized

const SecondChildComponent = memo(({ setAnimal }) => {
  console.log('Render Second Child')

  return (
    <div>
      Second Child Component
      {/* this input will rerender the Third Child Element, but not the App because setAnimal from Child Component */}
      <input
        type='text'
        onChange={(e) => setAnimal(e.target.value)}
        placeholder='Animal'
      />
      <p></p>
      <ThirdChildComponent />
      <ThirdChildComponent2 />
    </div>
  )
})

export default SecondChildComponent
