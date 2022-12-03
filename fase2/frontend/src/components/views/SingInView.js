import React, {useState} from 'react';
import { SignInInput } from "../items/SignInInput"
import { SignInButton } from "../items/SignInButton";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../../hooks/useAuth'
import '../../css/views/SignInView.scss'

export const SignInView = () => {
  const { signin } = useUserAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [birth, setBirth] = useState("");
  const [nif, setNIF] = useState("");
  const [nic, setNIC] = useState("");
  const [address, setAddr] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !pass | !birth | !nif | !nic | !address) {
      setError("Preencha todos os campos");
      return;
    }
    const res = signin(email,pass,birth,nif,nic,address);
    if(res) {
      setError(res);
      return;
    }
    nav("/home");
  };

  return (
    <div className='signin-container'> 
      <label className="label"> RASBET </label>
      <div className='gl-content'>
        <SignInInput
          type="email"
          placeholder="Insira o seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
        <SignInInput
          type="pass"
          placeholder="Insira a sua Password"
          value={pass}
          onChange={(e) => [setPass(e.target.value), setError("")]}
          />
        <SignInInput
          type="birth"
          placeholder="Insira a sua Data de Nascimento"
          value={birth}
          onChange={(e) => [setBirth(e.target.value), setError("")]}
          />
        <SignInInput
          type="nif"
          placeholder="Insira o seu NIF"
          value={nif}
          onChange={(e) => [setNIF(e.target.value), setError("")]}
          />
        <SignInInput
          type="nic"
          placeholder="Insira o seu NIC"
          value={nic}
          onChange={(e) => [setNIC(e.target.value), setError("")]}
          />
        <SignInInput
          type="address"
          placeholder="Insira a sua Morada"
          value={address}
          onChange={(e) => [setAddr(e.target.value), setError("")]}
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
  );
};
