import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [token, setToken] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  //const [objProduto, setObjProduto] = useState(produto);

  // UseState
  //const [btnCadastrar, setBtnCadastrar] = useState(true);
  //const [produtos, setProdutos] = useState([]);
  //const [objProduto, setObjProduto] = useState(produto);

  const urlAuthenticate = "http://localhost:8090/authenticate";
  const urlPessoa = "http://localhost:8090/pessoa?idsPessoa=220247";

  // Use effect
  // useEffect(()=>{
  //   fetch(urlAuthenticate, {
  //     method: "post",
  //     body: JSON.stringify({
  //       "username": "corejur",
  //       "password": "oab123"
  //     }),
  //     headers: {
  //       "Content-type": "application/json",
  //       "Accept": "application/json"
  //     }
  //   })
  //   .then(retorno => retorno.json())
  //   .then(retorno_convertido => setToken(retorno_convertido));
  // }, []);

  axios.post(urlAuthenticate, {
      "username": "corejur",
      "password": "oab123"
  })
  .then(function (response) {
    console.log("Response data = " + response.data);
    console.log("Response status = " + response.status);
  });
  
  useEffect(()=>{
    fetch(urlPessoa, {
      method: "get",
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: "application/json"
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => setPessoas(retorno_convertido));
  }, []);

  // Use effect
  //useEffect(()=>{
  //  fetch("http://localhost:8090/listar")
  //  .then(retorno => retorno.json())
  //  .then(retorno_convertido => setProdutos(retorno_convertido));
  //}, []);

  // Obtendo os dados do formulário
  /*const aoDigitar = (e) => {
    console.log(e.target);
  }*/

  // Retorno  
  return (
    <div>      
      <Formulario botao={btnCadastrar} />
      <Tabela vetor={pessoas} /> 
    </div>
  );
}

export default App;
