import React from 'react'
import { Link } from 'react-router-dom'

const HomePageScreen = () => {
  return (
    <>
    <div>
      Home Page
    </div>
    <Link to='login'>Login</Link>
    <Link to='add-link'>Add Link</Link>
    <Link to='viewLink'>View Link</Link>
    </>
  )
}

export default HomePageScreen