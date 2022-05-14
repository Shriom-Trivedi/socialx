import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../ui-shared/FormControl/Form/FormControl";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const name = useRef();
  const username = useRef();
  const country = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      // TODO: Add some error message in UI.
      alert("Passwords Don't Match");
    } else {
      const user = {
        name: name.current.value,
        username: username.current.value,
        country: country.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        // TODO: handle error later/maybe add something on UI.
        console.log(error);
      }
    }
  };
  return (
    <div className='registerContainer'>
      <div className='registerLeft'>
        <form className='registerLeftWrapper'>
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
                  inputRef={name}
                />
                <TextInput
                  label='Username'
                  placeholder='Enter your username'
                  type='text'
                  id='username'
                  name='username'
                  w='80%'
                  inputRef={username}
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
                  inputRef={country}
                />
                <TextInput
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  id='email'
                  name='email'
                  w='80%'
                  inputRef={email}
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
                  inputRef={password}
                />
                <TextInput
                  label='Confirm Password'
                  placeholder='Confirm your password'
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  w='80%'
                  inputRef={passwordAgain}
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
            <div className='createAccountContainer' onClick={handleSubmit}>
              <button className='createAccountButton'>Create Account</button>
            </div>
            <div className='loginLinkContainer'>
              <span className='loginLinkItem'>Already have an account?</span>
              <span className='loginLinkItem loginLink'>Login</span>
            </div>
          </div>
        </form>
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
