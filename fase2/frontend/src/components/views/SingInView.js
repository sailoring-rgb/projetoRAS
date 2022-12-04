import React, { useState } from 'react';
import { SignInInput } from "../items/SignInInput"
import { SignInButton } from "../items/SignInButton";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { useUserAuth } from '../../hooks/useAuth'
import '../../css/views/SignInView.scss'
import { useStateValue } from '../../state';

export const SignInView = () => {
  const { signin } = useUserAuth()
  const { dispatch } = useStateValue()
  const nav = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError("Preencha todos os campos")
      return
    }
    const res = await signin({ email, password })
    
    if(!res.status) {
      setError(res.msg)
      return
    }

    dispatch({ type: 'setAuthUser', value: res.userData })

    nav('/todos')
  }

  return (
    <div className='signin-container'> 
      <label className="label"> RASBET </label>
      <div className='gl-content'>
        <SignInInput
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
        <SignInInput
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
          />
        <label className='label-error'> {error} </label>

        <SignInButton Text="Entrar" onClick={handleLogin} />
        <label className='label-signup'>
          Não tem conta?
          <b className='strong'>
            <Link to="/signup">&nbsp;Registe-se</Link>
          </b>
        </label>
      </div>
    </div>
  )
}
