import React from 'react'

const SectionHeader = ({title="Getin Coffee"}) => {
  return (
    <h1 className='text-2xl text-blue-500 font-bold text-start mb-4'>
      {title}
    </h1>
  )
}

export default SectionHeader
