import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../Assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../util/ApiRoute';

const Register = () => {
    const navigate = useNavigate();
    const [values,setValues] = useState({username:"", email: "", password: "", confirmPassword: ""})
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme:"dark"
    }
    useEffect(()=>
  {
    if(localStorage.getItem("authToken"))
    {
        console.log("s");
      navigate('/pageNotFound');
    }
  }, [localStorage.getItem("authToken")])
    const handleSubmit= async(e)=>
    {
        e.preventDefault();
        if(handleValidation())
        {
            console.log("s", registerRoute);
            const {username, email, password } = values;
            const data = await axios.post(registerRoute, 
                {username, email, password}
                );
                console.log(data.data.success);
               if(data.data.success)
               {
                toast.success("Registerd SuccessFully", {toastOption})
                localStorage.setItem('authToken', data.data.authToken)
             
                localStorage.setItem('chat-app-user', data.data.User)
                navigate('/')
               }
               else 
               {
                toast.error(data.data.msz, toastOption)
               }
        }
    }
  
    const handleValidation = ()=>
    {
        const {username, email, password, confirmPassword } = values;
        // console.log(password)
        if(password!== confirmPassword)
        {
            console.log("error")
            toast.error("Password and confirm Password must be same", {
              toastOption
            } )
            return false;
        }
        
        else if(username.length<3)
        {
            toast.error("UserName should be greater than 3 char", toastOption);
            return false;
        }
        else if(email === "")
        {
            toast.error("email should not be blank", toastOption);
            return false;
        }
        else if(password.length<8)
        {
            toast.error("Password should be greater than 8 char", toastOption)
            return false;

        }
        return true;
    }
    const handleChange = (e)=>
    {
        setValues({...values , [e.target.name]: e.target.value});
    }
      
    
  return (
    <>
    <FormContainer>
      <form onSubmit={handleSubmit}>
      <div className="brand">
        <img src={Logo} alt="" />
        <h1>snappy</h1>
      </div>
        <input type="text" name="username" id="username" placeholder='Username' value={values.username} onChange={handleChange}/>
        <input type="email" name="email" id="email" placeholder='email' value={values.email} onChange={handleChange}/>
        <input type="password" name="password" id="password" placeholder='password' value={values.password} onChange={handleChange}/>
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='confirm password' value={values.confirmPassword} onChange={handleChange}/>
        <button type='submit'>Create User</button>
        <span > 
        {/* <Link to="#"  style={{float: 'left'}}> forget Password </Link> 
        <Link to="/login"  style={{float: 'right'}}> Already Registered  </Link>  */}
        Already Have Account? <Link to='/login'>Login</Link>
        </span>
      
      </form>
     </FormContainer>
     <ToastContainer/>
     </>
  )
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
        text-transform : uppercase;
    }
}
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem 3rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            font-size: 1rem;
            width: 100%;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.2s ease-in-out;
            &:hover{
                background-color: #4e0eff;

            }
        }
        span {
            color: white;
            text-transform: uppercase;
            // font-size: 0.64rem;
            
            a{
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
            a:hover
            {
                color: #997af0;
                text-decoration: underline;
            }
        }
    }
}
`



export default Register
