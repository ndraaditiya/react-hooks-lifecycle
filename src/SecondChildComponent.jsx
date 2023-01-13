import React from 'react'

const SecondChildComponent = ({ setAnimal }) => {
  console.log('Render Second Child')

  return (
    <div>
      Second Child Component
      {/* this input will rerender the Child Element, but not the App because setAnimal from Child Component */}
      <input type="text" onChange={(e) => setAnimal(e.target.value)} placeholder='Animal' />
    </div>
  )
}

export default SecondChildComponent
