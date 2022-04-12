import React from "react";
import "./login.css";
import { TextInput } from "../../ui-shared/FormControl/Form/FormControl";

const Login = () => {
  return (
    <div className='loginContainer'>
      <div className='loginContainerLeft'>
        <div className='loginHeadingContainer'>
          <p className='loginLeftHeading'>
            Welcome back to <span>SOCIALX</span>
          </p>
          <p className='loginLeftDesc'>we surely missed you</p>
        </div>
        <div className='imgContainer'>
          <img
            src='assets/illustrations/login/login_illustration.png'
            alt='login'
            className='loginIllustration'
          />
        </div>
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
              <TextInput
                label='Email or Username'
                placeholder='Email or Username'
                type='text'
                name='email'
                id='email'
                w='60%'
              />
              <TextInput
                label='Password'
                placeholder='Enter your password'
                type='password'
                name='password'
                id='password'
                w='60%'
              />
              <div className='forgotPassword'>
                <p>Forgot Password?</p>
              </div>
              <div className='rememberMe'>
                <input
                  type='checkbox'
                  name='rememberMe'
                  id='rememberMe'
                  className='rememberMeCheckbox'
                />
                <label htmlFor='rememberMe'>Remember Me</label>
              </div>
            </div>
            <div className='signInBtn'>
              <button className='loginBtn'>Sign In</button>
            </div>
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
