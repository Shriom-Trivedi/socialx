import React from "react";
import { TextInput } from "../../ui-shared/FormControl/Form/FormControl";
import "./register.css";

const Register = () => {
  return (
    <div className='registerContainer'>
      <div className='registerLeft'>
        <div className='registerLeftWrapper'>
          <div className='registerLeftTop'>
            <p className='registerTitle'>Register</p>
            <p className='registerDesc'>
              Let's get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
          </div>
          <div className='registerLeftCenter'>
            <div className='registerForm'>
              <div className='registerFormField'>
                <TextInput
                  label='Name'
                  placeholder='Enter your name'
                  type='text'
                  id='name'
                  name='name'
                  w='80%'
                />
                <TextInput
                  label='Username'
                  placeholder='Enter your username'
                  type='text'
                  id='username'
                  name='username'
                  w='80%'
                />
              </div>
              <div className='registerFormField'>
                <TextInput
                  label='Country'
                  placeholder='Enter your country'
                  type='text'
                  id='country'
                  name='country'
                  w='80%'
                />
                <TextInput
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  id='email'
                  name='email'
                  w='80%'
                />
              </div>
              <div className='registerFormField'>
                <TextInput
                  label='Password'
                  placeholder='Enter your password'
                  type='password'
                  id='password'
                  name='password'
                  w='80%'
                />
                <TextInput
                  label='Confirm Password'
                  placeholder='Confirm your password'
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  w='80%'
                />
              </div>
            </div>
          </div>
          <div className='registerLeftBottom'>
            <div className='termsAndConditions'>
              <input
                type='checkbox'
                name='termsAndConditions'
                id='termsAndConditions'
                className='termsAndConditionsCheckbox'
              />
              <label htmlFor='termsAndConditions'>
                I agree to all the <span>Terms, Privacy Policy</span> and{" "}
                <span>Fees</span>
              </label>
            </div>
            <div className='createAccountContainer'>
              <button className='createAccountButton'>Create Account</button>
            </div>
            <div className='loginLinkContainer'>
              <span className='loginLinkItem'>Already have an account?</span>
              <span className='loginLinkItem loginLink'>Login</span>
            </div>
          </div>
        </div>
      </div>
      <div className='registerRight'>
        <div className='registerRightWrapper'>
          <div className='registerHeading'>
            <p>
              Few steps away from creating your
              <span className='headingAnimation'>SOCIALX</span> account!
            </p>
          </div>
          <div className='IllustrationContainer'>
            <img
              src='assets/illustrations/register/register_illustration.png'
              alt='login'
              className='registerIllustration'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
