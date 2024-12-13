import React from 'react';
import style from "./LoginForm.module.css";
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = React.useState("")
  const [senha, setSenha] = React.useState("")
  const [visible, setVisible] = React.useState(false);
  const [alertMensage, setAlertMensage] = React.useState("");
  const [alertColor, setAlertColor] = React.useState("green");
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

  function entrar(e){
    e.preventDefault()
    ;(async ()=>{
      const data = {
        email: email,
        senha: senha
      }
      const resposta = await fetch('http://localhost:3000/users/login', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Tipo de dado que estamos enviando
        },
        body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
        
    })
      const respostaTratada = await resposta.json()
      if(!resposta.ok){
        setAlertColor("#d24b4b")
        setAlertMensage(respostaTratada.message)
        setVisible(true);
      }else{
        localStorage.setItem('token', respostaTratada.token);
        navigate('/home');
      }
    })()
  }

  return (
    <>
      <div className={style.container}>
        {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
        <form action="" className={style.form}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" placeholder='Ex.: emaildogabriel@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" placeholder='Ex.: ******' onChange={(e)=>{setSenha(e.target.value)}} value={senha}/>
                  <button onClick={entrar}>
                    Entrar
                  </button>
                <button>
                  Recuperar senha
                </button>
            </div>
        </form>
      </div>
      <div>
        {/* Div vazia para manter o form no centro, resolvi tirar o footer, melhorar isso depois se tiver tempo :D */}
      </div>
    </>
  )
}

export default LoginForm
