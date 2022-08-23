import React from 'react'
import PopUp from './PopUp'

const TopicsGeneral = ({data}) => {
    const dataAttributes= data.data.attributes

  return (
    <div>
      <PopUp data={data.popups}/>
       topics general
        </div>
  )
}

export default TopicsGeneral