import React from 'react'
import style from './CriarGrupo.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function CriarGrupo() {
  const [groupName, setGroupName] = React.useState("")
  const [obs, setObs] = React.useState("")
  const [visible, setVisible] = React.useState(false);
  const [alertMensage, setAlertMensage] = React.useState("");
  const [alertColor, setAlertColor] = React.useState("green");
  const { setActiveMenu } = useOutletContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 4000); // Tempo total da animação (fadeIn + delay + fadeOut)
      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [visible]);

  const handleShowDiv = () => {
    setVisible(true); // Ativa a animação
  };

  async function criarGrupo(e){
    e.preventDefault()
    const token = localStorage.getItem('token');
    const data = {
      groupName,
      obs
    }
    if (!groupName){
      setAlertColor("#d24b4b")
      setAlertMensage("Preencha o nome do Grupo")
      setVisible(true);
      return false
    }
    const resultado = await fetch("http://localhost:3000/groups",{
      method: 'POST', // Método HTTP
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
      body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
    })
    const resposta = await resultado.json()
    if (resposta && resposta.message==="Grupo Criado!"){
      // setAlertColor("#76d96f")
      // setAlertMensage("Grupo Criado!")
      setActiveMenu(2)
      navigate('/home/meusgrupos')
      // setTimeout(()=>{navigate('/home/meusgrupos');setActiveMenu(2)},1000)
    }else{
      setAlertColor("#d24b4b")
      setAlertMensage("Não foi possível criar o grupo")
    }
    handleShowDiv()
    
    
    // ;(async ()=>{
    //   const data = {
    //     email: email,
    //   }
    //   const resposta = await fetch('http://localhost:3000/users/login', {
    //     method: 'POST', // Método HTTP
    //     headers: {
    //         'Content-Type': 'application/json' // Tipo de dado que estamos enviando
    //     },
    //     body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
        
    // })
    //   const respostaTratada = await resposta.json()
    //   if(!resposta.ok){
    //     setAlertColor("#d24b4b")
    //     setAlertMensage(respostaTratada.message)
    //     setVisible(true);
    //   }else{
    //     localStorage.setItem('token', respostaTratada.token);
    //     navigate('/home');
    //   }
    // })()
  }
  const placeHolder = `Ex.: Olá, o envento será dia 24/12/2024 às 23:30 no endereço: Rua Alí perto, Bairro Chique - SP, APT 901, valor médio recomendado do presente de 50 até 100 reais.`
  return (
    <div className={style.container}>
      {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
      <form action="" className={style.form}>
          <div>
              <label htmlFor="name">Nome do Grupo:</label>
              <input type="text" name="name" id="name" placeholder='Família Prontera' onChange={(e)=>{setGroupName(e.target.value)}} value={groupName}/>
              <label htmlFor="obs">Obersvações para os participantes</label>
              <textarea name="obs" id="obs" placeholder={placeHolder} rows="8" onChange={(e)=>{setObs(e.target.value)}} value={obs}></textarea>
              <button onClick={criarGrupo}>
                Criar Grupo
              </button>
          </div>
      </form>
    </div>
  )
}

export default CriarGrupo
