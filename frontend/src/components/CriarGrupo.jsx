import React from 'react'
import style from './CriarGrupo.module.css';

function CriarGrupo() {
  const [groupName, setGroupName] = React.useState("")
  const [visible, setVisible] = React.useState(false);
  const [alertMensage, setAlertMensage] = React.useState("");
  const [alertColor, setAlertColor] = React.useState("green");

  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 4000); // Tempo total da animação (fadeIn + delay + fadeOut)
      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
  }, [visible]);

  const handleShowDiv = () => {
    setVisible(true); // Ativa a animação
  };

  function criarGrupo(e){
    e.preventDefault()
    // ;(async ()=>{
    //   const data = {
    //     email: email,
    //     senha: senha
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

  return (
    <div className={style.container}>
      {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
      <form action="" className={style.form}>
          <div>
              <label htmlFor="name">Nome do Grupo:</label>
              <input type="text" name="name" id="name" placeholder='Família Prontera' onChange={(e)=>{setGroupName(e.target.value)}} value={groupName}/>
              <button onClick={criarGrupo}>
                Cria Grupo
              </button>
          </div>
      </form>
    </div>
  )
}

export default CriarGrupo
