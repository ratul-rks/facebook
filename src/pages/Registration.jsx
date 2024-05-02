import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import reg from "../assets/reg.jpg"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FaRegEye, FaEyeSlash  } from "react-icons/fa";
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';



const Registration = () => {
  const auth = getAuth();
  let [openEye, setOpeneye]=  useState(false);
  let [loading, setloading]=  useState(false);
  let navigate =useNavigate();

    let [regData,setRegData]= useState({
    email:"",
    name:"",
    password:"",
  });

  let [regError,setRegError]= useState({
    email:"",
    name:"",
    password:"",
  });

  let handleChange = (e)=>{
    
    setRegData({...regData,[e.target.name]:e.target.value});
    setRegError({...regError, [e.target.name]:""});
  };

  let handleSubmit = ()=>{
    let pattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regData.email){
      setRegError({...regError, email:"email required"})
    }else if (!pattern.test(regData.email)){
      setRegError({...regError, email:"valid email required"})
    }
    else if(!regData.name){
      setRegError({...regError, name:"name required"});
    }
    else if(!regData.password){
      setRegError({...regError, password:"password required"});
    }else if(regData.password.length < 6){
      setRegError({...regError, password:"password must be geater then 6"});
    }
    
    else{
      setloading(true)
      createUserWithEmailAndPassword(auth, regData.email, regData.password)
  .then((userCredential) => {
    setloading(false);
    sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    toast("successfully sign up please check your email for verification")
    
  
  });
  navigate("/login")
  })
  .catch((error) => {
    setloading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    if(error.message.includes("email-already-in-use")){

      setRegError({...regError, email:"email already exists"})
    }

    // ..
  });
    }
  }

  return (
    <>
    
      <Grid container >
        <Grid item xs={6}>

            <div className="reg_box">
                <h1>Get started with easily register</h1>
                <p>Free register and you can enjoy it</p>

                <TextField name='email' onChange={handleChange} id="outlined-basic" label="Email Address" variant="outlined" />
               
                {regError.email && (
                <Alert className='reg_alart' severity="warning">{regError.email}</Alert>
                )}
                
                <TextField name='name' onChange={handleChange} id="outlined-basic" label="Full Name" variant="outlined" />
                {regError.name && (
                <Alert className='reg_alart' severity="warning">{regError.name}</Alert>
                )}
                
                <div className='passwordEye'>
                <TextField name='password' onChange={handleChange} type={openEye ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" />
                {!openEye &&
                <FaRegEye className='eye' onClick={()=> setOpeneye(!openEye)}/>
                }
                {openEye && 
                <FaEyeSlash className='eye' onClick={()=> setOpeneye(!openEye)}/>
                }
                {regError.password && (
                <Alert className='reg_alart' severity="warning">{regError.password}</Alert>
                )}
                </div>
                
                    <div>
                      {!loading &&
                        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button> 
                      }
                      {loading &&
                        <InfinitySpin
                          visible={true}
                          width="200"
                          color="#4fa94d"
                          ariaLabel="infinity-spin-loading"
                          />
                      }

                        <p className='regend'>Already  have an account ? <b>Sign In</b></p>
                    </div>

            </div>
        </Grid>



        <Grid item xs={6}>
          <img className='regImg' src={reg} />
        </Grid>
       
      </Grid>
    
    </>
  )
}

export default Registration