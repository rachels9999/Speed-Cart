import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'

const Auth = ({register}) => {

const [userDetails,setUserDetails] = useState({
  username:"",
  email:"",
  password:""
})

console.log(userDetails);

const navigate = useNavigate()

const handleRegister = ()=>{
  const {username, email, password} = userDetails
  if(!username || !email || !password){
    alert("Please fill all fields")
    return
  }
  localStorage.setItem("user",JSON.stringify(userDetails))
  alert("Registration successfull")
  navigate('/login')
}

const handleLogin = ()=>{
  const storedUser = JSON.parse(localStorage.getItem("user"))
  if(!storedUser){
    alert("No user found.Please register")
    return
  }
  if(userDetails.email===storedUser.email && userDetails.password===storedUser.password){
    alert("Login successfull")
    localStorage.setItem("isLoggedIn","true")
    localStorage.setItem("userMail",userDetails.email)           //store login status
    navigate('/')
  }else{
    alert("Invalid email or password")
  }
}


  
  return (
    <>
    
    
     <div id='authPage'>
      <div className='md:grid grid-cols-3'>
        <div></div>
        <div className='flex justify-center items-center flex-col'>
          <h1 className='my-5 text-3xl font-bold'>SpeedCart</h1>

          <form className='w-full bg-orange-900 p-10 flex justify-center items-center flex-col rounded'>

            <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='border border-white flex justify-center items-center'>
              <FontAwesomeIcon icon={faUser} className="text-white fa-2x" />
            </div>
            {register ? <h1 className='text-white mt-6 text-3xl'>Register</h1>
              :
              <h1 className='text-white mt-6 text-3xl'>Login</h1>
            }

            {register && <div className='mb-3 w-full mt-4'>
              <input
                value={userDetails.username}
                onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}
                type="text" placeholder='UserName' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>
            }

            <div className='mb-3 w-full mt-4'>
              <input 
              value={userDetails.email}
              onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
              type="email" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>

            <div className='mb-3 w-full mt-4'>
              <input 
              value={userDetails.password}
              onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
              type="password" placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>
            <div className='mb-5 w-full flex justify-between'>
              <p className='text-amber-300' style={{ fontSize: '10px' }}>*Never Share Your Password with others</p>
              {!register && <p className='text-white underline' style={{ fontSize: '10px' }}>
                
              </p>}
            </div>

            <div className='mb-2 w-full'>
              {register ? <button type='button' onClick={handleRegister} className='bg-amber-500 text-white w-full p-3 rounded'>
                REGISTER</button> :
                <button type='button' onClick={handleLogin} className='bg-amber-500 text-white w-full p-3 rounded'>
                  LOGIN</button>
              }
            </div>
            {!register && <p className='text-white'>-------------------------or---------------------
              </p>}
            {!register && <div className='mb-5 mt-3 w-full flex justify-center items-center'>
              {/*<button className='bg-white text-black w-full p-3 rounded'>
                Sign in with Google</button>
                */}
                <GoogleLogin width={'250px'}
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    const decoded = jwtDecode(credentialResponse.credential)

    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("userMail",decoded.email)
    alert("Google Login Successfull!")
    navigate("/")
  }}
  onError={() => {
    console.log('Google Login Failed!');
  }}
/>;
               

            </div>}
            {register ? <p className='text-white'>Already a User? <Link to={'/login'}>Login...</Link> </p>
              :
              <p className='text-white'>Are you a New User? <Link to={'/register'}>Register...</Link> </p>
            }

          </form>
        </div>

        <div></div>

      </div>
    </div>


    
    
    </>
  )
}

export default Auth