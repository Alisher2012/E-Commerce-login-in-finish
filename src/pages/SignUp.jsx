import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import './SignUp.css';
import { DataContext } from '../context/DataContext';
import { loginFunc, registerFunc } from '../services';

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignUp = async (e) => {
    e.preventDefault();
    alert('Registration is temporarily disabled.');
  };
    
  const {setToken} = useContext(DataContext);

  const navigate = useNavigate();

  //   useEffect (() => {
  //   registerFunc(name, email, password).then((info)=>{
  //     console.log(info);
      
  //   })
  // }, [])

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src="/images/75f394c0a1c7dc5b68a42239311e510f54d8cd59.jpg" alt="Shopping" />
      </div>
      <div className="auth-form-wrapper">
        <form className="auth-form" onSubmit={(e) => {
          e.preventDefault();
          loginFunc(email, password).then((info) => {
            console.log(info);
            if(info?.access){
            navigate("/");
            
            setToken(info?.access);

            }
          });
          registerFunc(email, password, name).then((info) => {
            console.log(info);
            if("Foydalanuvchi muvaffaqiyatli ro'yhatdan o'tdi." === info?.message){
              alert("ro'hatdan o'tingiz")
              navigate('/login');

              localStorage.setItem("token", info?.access);

        } else if ("Bu elektron pochta manzili allaqachon ro'yhatdan o'tgan." === info?.email_or_phone?.[0]) {
          alert(info?.email_or_phone?.[0]);
  }
  });
        }}>
          <h1>Create an account</h1>
          <p>Enter your details below</p>
          
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onInput={(e) => setName(e.target.value)}
              required
              // onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary auth-btn">Create Account</button>
          
          <button type="button" className="btn-google">
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </button>
          
          <div className="auth-footer">
            <span>Already have account?</span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
