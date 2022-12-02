import React, {useState} from 'react';
import Input from "../signin/input"
import Button from "../signin/button";
import * as C from "../signin/styles"; 
import {Link, useNavigate} from "react-router-dom";
import userAuth from '../../hooks/useAuth'

const SingIn = () => {
  const {signin} = userAuth();
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
    <C.Container> 
      <C.Label> RASBET </C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Insira o seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
        <Input
          type="pass"
          placeholder="Insira a sua Password"
          value={pass}
          onChange={(e) => [setPass(e.target.value), setError("")]}
          />
        <Input
          type="birth"
          placeholder="Insira a sua Data de Nascimento"
          value={birth}
          onChange={(e) => [setBirth(e.target.value), setError("")]}
          />
        <Input
          type="nif"
          placeholder="Insira o seu NIF"
          value={nif}
          onChange={(e) => [setNIF(e.target.value), setError("")]}
          />
        <Input
          type="nic"
          placeholder="Insira o seu NIC"
          value={nic}
          onChange={(e) => [setNIC(e.target.value), setError("")]}
          />
        <Input
          type="address"
          placeholder="Insira a sua Morada"
          value={address}
          onChange={(e) => [setAddr(e.target.value), setError("")]}
          />
        <C.labelError> {error} </C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registe-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default SingIn;