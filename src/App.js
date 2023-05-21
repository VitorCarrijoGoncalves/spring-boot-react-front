import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto pessoa
  const pessoa = {
    id: 0,
    nome: '',
    cpfCNPJ: '',
    registroConselho: ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [pessoas, setPessoas] = useState([]);
  const [objPessoa, setObjPessoa] = useState(pessoa);

  // URL
  const urlPessoa = "http://localhost:8090/pessoa?idsPessoa=220247,94945,36182"; 

  // Use effect
  useEffect(()=>{
    fetch(urlPessoa)
    .then(retorno => retorno.json())
    .then(retorno_convertido => setPessoas(retorno_convertido));
  }, []);

  // Limpar formulário
  const limparFormulario = () => {
    setObjPessoa(pessoa);
    setBtnCadastrar(true);
  }

  // Selecionar Pessoa
  const selecionarPessoa = (indice) => {
    setObjPessoa(pessoas[indice]);
    setBtnCadastrar(false);
  }

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjPessoa({...objPessoa, [e.target.name]:e.target.value});
  }

  // Cadastrar Pessoa
  const cadastrar = () => {
    fetch('http://localhost:8090/pessoa', {
      method: 'post',
      body: JSON.stringify(objPessoa),
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if (retorno_convertido.mensagem !== undefined) {
        alert(retorno_convertido.mensagem);
      } else {
        setPessoas([...pessoas, retorno_convertido]);
        alert('Pessoa cadastrada com sucesso!');
        limparFormulario();
      }
    })
  }

    // Alterar pessoa
    const alterar = () => {
      fetch('http://localhost:8090/alterar', {
        method: 'put',
        body: JSON.stringify(objPessoa),
        headers: {
          'Content-type':'application/json',
          'Accept':'application/json'
        }
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {

          // Mensagem
          alert('Pessoa alterada com sucesso!');

          // Cópia do vetor de pessoa
          let vetorTemp = [...pessoas]

          // Índice
          let indice = vetorTemp.findIndex((p) => {
            return p.id === objPessoa.id;
          });

          // Alterar pessoa do vetorTemp
          vetorTemp[indice] = objPessoa;

          // Atualizar o vetor de pessoas
          setPessoas(vetorTemp);

          // Limpar o formulário
          limparFormulario();
        }
  
      })
    }

  // Remover pessoa
  const remover = () => {
    fetch('http://localhost:8090/remover/'+objPessoa.id, {
      method: 'delete',
      headers: {
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      // Mensagem
      alert(retorno_convertido.mensagem);

      // Cópia do vetor de pessoas
      let vetorTemp = [...pessoas]

      // Índice
      let indice = vetorTemp.findIndex((p) => {
        return p.id === objPessoa.id;
      });

      // Remover pessoa do vetorTemp
      vetorTemp.splice(indice, 1);

      // Atualizar o vetor de pessoas
      setPessoas(vetorTemp);

      // Limpar formulário
      limparFormulario();

    })
  }

  // Retorno  
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} 
      obj={objPessoa} cancelar={limparFormulario} remover={remover} alterar={alterar} />
        <Tabela vetor={pessoas} selecionar={selecionarPessoa} /> 
    </div>
  );
}

export default App;
