import React from 'react'
import { Link } from 'react-router-dom'
import ProfileNav from './ProfileNav'
const ProfileSeller = () => {


  // this file is not required

  
  return (
    <>
    <div className="container-fluid  p-5 text-center navimage">
        <h1>my profile</h1>
      </div>
      <div className='container-fluid p-4'>


      </div>
      {/* <div className='container'>show all hotels i have posted</div> */}

<div className='container-fluid'>
    <div className='row'>
        <div className='col-md-10'>
         <h1>your hotels</h1>
        </div>
        <div className='col-md-2'>
            <Link to='/hotel/new' className='btn btn-primary'> Add New</Link>
        </div>

    </div>

</div>

    </>
  )
}

export default ProfileSeller