import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import login from "../assets/login.jpg"
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { FaRegEye, FaEyeSlash  } from "react-icons/fa";
import { InfinitySpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Login = () => {
  const auth = getAuth();
  let [openEye, setOpeneye]=  useState(false);
  let [loading, setloading]=  useState(false);
  let navigate =useNavigate();

    let [regData,setRegData]= useState({
    email:"",
   
    password:"",
  });

  let [regError,setRegError]= useState({
    email:"",
    
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
    
    else if(!regData.password){
      setRegError({...regError, password:"password required"});
    }else if(regData.password.length < 6){
      setRegError({...regError, password:"password must be geater then 6"});
    }
    
    else{
      setloading(true)
      signInWithEmailAndPassword(auth, regData.email, regData.password)
  .then((userCredential) => {
    setloading(false);
    toast("Login successfull")
  navigate("/home")
  })
  .catch((error) => {
    setloading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    if(error.message.includes("invalid-credential")){

      setRegError({...regError, email:"Invalid credential please try again"})
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
                <h1>Login to your account!</h1>

                <TextField name='email' onChange={handleChange} id="outlined-basic" label="Youraddres@email.com" variant="outlined" />
               
                {regError.email && (
                <Alert className='reg_alart' severity="warning">{regError.email}</Alert>
                )}
                
                <div className='passwordEye'>
                <TextField name='password' onChange={handleChange} type={openEye ? "text" : "password"} id="outlined-basic" label="Enter your password" variant="outlined" />
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
                        <Button variant="contained" onClick={handleSubmit}>Login to Continue</Button> 
                      }
                      {loading &&
                        <InfinitySpin
                          visible={true}
                          width="200"
                          color="#4fa94d"
                          ariaLabel="infinity-spin-loading"
                          />
                      }

                        <p className='regend'>Don’t have an account? <a href="/">Sign Up</a></p>
                    </div>

            </div>
        </Grid>



        <Grid item xs={6}>
          <img className='regImg' src={login} />
        </Grid>
       
      </Grid>
    
    </>
  )
}

export default Login