import React, { useState,useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserSignup = () => {
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const navigate = useNavigate();

  const{user, setUser} = useContext(UserDataContext);

  const submitHandler=async(e)=>{
    e.preventDefault();
    const newUser={
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status===201){
      const data=response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');

  }

  return(
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <h3 className='text-lg w-1/2  font-medium mb-2'>What's ypur name</h3>
            <div className='flex gap-4 mb-7'>
              <input
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
              required
              placeholder='Enter ur first name'
              type="text" />

              <input
              value={lastName}
               className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              onChange={(e)=>{setLastName(e.target.value)}}
              required
              placeholder='Enter ur last name'
              type="text" />
            </div>
            <h3>What's your Email</h3>
            <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder='Enter your email'
            type="email" />

            <h3>Enter Password</h3>
            <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}  
            onChange={(e)=>{setPassword(e.target.value)}}
            required
            placeholder='Enter your password'
            type="password" />

            <button 
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
          </form>
          <p className='text-center'>Already have an account? <Link className='text-blue-600' to="/login">Login Here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>

      </div>
    </div>
  )
   
 
}

export default UserSignup