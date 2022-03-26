import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className='loginContainer'>
      <div className='loginContainerLeft'>
        <img
          src='assets/illustrations/login/login_illustration.png'
          alt='login'
          className='loginIllustration'
        />
      </div>
      <div className='loginContainerRight'>
        <div className='loginContainerRightWrapper'>
          <div className='loginForm'>
            <div className='loginTitle'>
              <span>SOCIALX</span>
            </div>
            <div className='loginHeading'>
              <p>Welcome to Social Experience</p>
            </div>
            <div className='loginFormControl'>
              <div className='formGroup'>
                <label htmlFor='email' className='loginLabel'>
                  Email or Username
                </label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className='loginInput'
                  placeholder='Enter your email or username'
                />
              </div>
              <div className='formGroup'>
                <label htmlFor='password' className='loginLabel'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='loginInput'
                  placeholder='Enter your password'
                />
                <span className='forgotPassword'>Forgot Password?</span>
              </div>
              <div className='rememberMe'>
                <input
                  type='checkbox'
                  name='rememberMe'
                  id='rememberMe'
                  className='rememberMeCheckbox'
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
            </div>
            <button className='loginBtn'>Sign In</button>
            <div className='createAccount'>
              <span>New to SOCIALX?</span>
              <span className='createAccountLink'>Create Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
