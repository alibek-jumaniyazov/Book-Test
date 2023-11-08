import React, { useEffect, useRef, useState } from 'react'
import facebook from '../../images/facebook.png'
import google from '../../images/Google.png'
import { signUp } from '../../context/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [state, setState] = useState({
    login: 'none',
    register: 'loginCard'
  })

  function OpenLogin() {
    setState({
      login: 'loginCard',
      register: 'none'
    })
  }

  function OpenRegis() {
    setState({
      login: 'none',
      register: 'loginCard'
    })
  }

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const registerUser = async () => {

    console.log("registerUser")

    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      key: usernameRef.current.value,
      secret: passwordRef.current.value,
    }

    console.log(body)

    try {
      const request = await signUp(body)

      if (request.status > 200 || request.status < 300) {
        localStorage.setItem('userInfo', JSON.stringify(request.data.data));
        navigate('/');
        console.log(`Yuborilgan ma'lumot`, request.data.data);
      }
      else {
        alert(request.data.message)
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (

    <div className="Login">
      <div className={`${state.login}`}>
        <h1 className="loginTitle">Sign in</h1>
        <div className="loginNetworks">
          <div className="loginNetwork">
            <img src={google} alt="" />
            <p>Continue with Google</p>
          </div>
          <div className="loginNetwork">
            <img src={facebook} alt="" />
            <p>Continue with Google</p>
          </div>
        </div>
        <div className="loginHandle">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <div className="loginCardInputs">
          <div className="loginInput">
            <p>Your name</p>
            <input ref={nameRef} type="text" name='name' placeholder='Enter your name' />
          </div>

          <div className="loginInput">
            <p>Your username</p>
            <input ref={usernameRef}  type="text" name='username' placeholder='Enter your username' />
          </div>

          <div className="loginInput">
            <p>Your email</p>
            <input ref={emailRef}  type="email" name='email' placeholder='Enter your email' />
          </div>

        </div>
        <div className="loginFooter">
          <button className="loginInfoSend" >Sing in</button>
          <span>Already signed up? <p onClick={() => OpenRegis()}>Go to sign up.</p> </span>
        </div>
      </div>

      <div className={`${state.register}`}>
        <h1 className="loginTitle">Sign up</h1>
        <div className="loginNetworks">
          <div className="loginNetwork">
            <img src={google} alt="" />
            <p>Continue with Google</p>
          </div>
          <div className="loginNetwork">
            <img src={facebook} alt="" />
            <p>Continue with Google</p>
          </div>
        </div>
        <div className="loginHandle">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <div className="loginCardInputs">
          <div className="loginInput">
            <p>Your name</p>
            <input type="text" name='name' placeholder='Enter your name' ref={nameRef} />
          </div>

          <div className="loginInput">
            <p>Your username</p>
            <input type="text" name='username' placeholder='Enter your username' ref={usernameRef} />
          </div>

          <div className="loginInput">
            <p>Your email</p>
            <input type="email" name='email' placeholder='Enter your email' ref={emailRef} />
          </div>

          <div className="loginInput">
            <p>Your password</p>
            <input type="text" name='password' placeholder='Enter your password' ref={passwordRef} />
          </div>

        </div>
        <div className="loginFooter">
          <button className="loginInfoSend" onClick={() => registerUser()}>Sing Up</button>
          <span>Already signed up? <p onClick={() => OpenLogin()}>Go to sign in.</p> </span>
        </div>
      </div>
    </div>
  )
}
