import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const AuthForm = (props: any) => {
  const history = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const switchLoginHandler = () => {
    setIsLogin(true);
    setIsSignup(false);
  }
  const switchSignUpHandler = () => {
    setIsSignup(true);
    setIsLogin(false);
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    //Add Validation
    setIsLoading(true);
    let url;
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFDepjvDONzcTylY1XE6iRzV_i3TMzRsA';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFDepjvDONzcTylY1XE6iRzV_i3TMzRsA';
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          displayName: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then(res => {
        setIsLoading(false);
        if(res.ok) {
          return res.json();
        } else {
          res.json();
          let errorMessage = 'Authentication Failed';
          throw new Error(errorMessage);
        }
      }).then(data => {
        authCtx.login(data.idToken);
        localStorage.setItem('name', data.displayName)
        history('/todos');
      }).catch(err =>{
        alert(err.message);
      });
  };

  return (
    <section className="auth">
      <div className="auth__title">
          <button type='button' className={isLogin ? "auth__toggle active" : "auth__toggle"} onClick={switchLoginHandler} >Login</button>
          <button type='button' className={isSignup ? "auth__toggle active" : "auth__toggle"} onClick={switchSignUpHandler} >Signup</button>
      </div>
      <form className='auth__form' onSubmit={submitHandler}>
       {isSignup && <div className="auth__item">
          <label  className='auth__label' htmlFor='name'>Your Name</label>
          <input className='auth__input' type='text' id='name' required ref={nameInputRef}/>
        </div>}
        <div className="auth__item">
          <label className='auth__label' htmlFor='email'>Your Email</label>
          <input className='auth__input' type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className="auth__item">
          <label className='auth__label' htmlFor='password'>Your Password</label>
          <input className='auth__input' type='password' id='password' autoComplete="off" required ref={passwordInputRef}/>
        </div>
        {isLoading && <LoadingSpinner/>}

        {isLogin && !isLoading && <button className='auth__submit'>Login</button>}
        {isSignup && !isLoading && <button className='auth__submit'>Sign Up</button>}
        
      </form>
    </section>
  );
};

export default AuthForm;
