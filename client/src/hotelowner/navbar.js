import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const NavigationBar = () => {
  const dispatch=useDispatch()
  const {auth}=useSelector((state)=>({...state}))
  const  history=useNavigate()

const logout=()=>{
  dispatch({
    type:'LOGOUT',
    payload:null
  })
  window.localStorage.removeItem('auth')
  history('/login')
}

  return (
    <div className='nav  bg-light d-flex justify-content-end '>
        <Link className='nav-link' to='/'>Home</Link>

        {auth!==null && (<>
          <Link className='nav-link' to='/profile'>profile</Link>
          <a className='nav-link pointer' onClick={logout}>Logout</a></>)}
        
        {auth===null &&(<><Link className='nav-link' to='/login'>Login</Link>
        
        <Link className='nav-link' to='/register'>Register</Link></>)}

             
    </div>
  )
}

export default NavigationBar

