import React from 'react';
import style from "./LoginForm.module.css";
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = React.useState("")
  const [senha, setSenha] = React.useState("")
  const [visible, setVisible] = React.useState(false);
  const [alertMensage, setAlertMensage] = React.useState("");
  const [alertColor, setAlertColor] = React.useState("green");
  const [recSenha, setRecSenha] = React.useState("Recuperar Senha");
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
    if(!email || !senha){
        setAlertColor("red")
        setAlertMensage("Preencha todos os campos")
        setVisible(true);
        return false
    }
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

  async function recuperarSenha(e) {
    e.preventDefault()
    setRecSenha("Aguarde...")
    const temporizador = setTimeout(()=>{setRecSenha("Recuperar Senha"); clearInterval(temporizador)},3000)
    if(!email){
        setAlertColor("red")
        setAlertMensage("Preencha o Campo Email")
        setVisible(true);
    }else{
      ;(async ()=>{
        const data = {
          email: email,
        }
        const resposta = await fetch('http://localhost:3000/users/recuperarsenha', {
          method: 'POST', // Método HTTP
          headers: {
              'Content-Type': 'application/json' // Tipo de dado que estamos enviando
          },
          body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
          
      })
        const respostaTratada = await resposta.json()
        console.log(respostaTratada)
        if(respostaTratada.message=='Email encontrado'){
          setAlertColor("green")
          setAlertMensage("Nova senha enviada para o e-mail")
          setVisible(true);
        }else{
          setAlertColor("red")
          setAlertMensage("Email não cadastradao")
          setVisible(true);
        }
      })()
    }
  }

  return (
    <>
      <div className={style.container}>
        {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
        <form action="" className={style.form}>
            <div>
                <div className={style.titulo}>Login</div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" placeholder='Ex.: emaildogabriel@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" placeholder='Ex.: ******' onChange={(e)=>{setSenha(e.target.value)}} value={senha}/>
                  <button onClick={entrar}>
                    Entrar
                  </button>
                <button onClick={recuperarSenha} style={{background: recSenha=="Aguarde..." ? "gray": "", cursor: recSenha=="Aguarde..." ? "default": "pointer"}} disabled={recSenha === "Aguarde..."}>
                  {recSenha}
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
