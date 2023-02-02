import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <Link to={'/rooms'}>
      <h2> 404 </h2>
      <h2> The Link that youre looking for doesnt exist!</h2>
      <h2> Lets take you back to the rooms. </h2>
      </Link>
    </div>
  )
}

export default NotFound