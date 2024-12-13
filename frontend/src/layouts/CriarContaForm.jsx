import React from 'react';
import style from "./CriarContaForm.module.css";

function CriarContaForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
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

  const data = {
    email:email,
    senha:password
  }
  
  async function criarConta(e){
    e.preventDefault()
    if (!email || !password){
      setAlertColor("#d24b4b")
      setAlertMensage("Preencha todos os campos")
      setVisible(true);
      return false
    }
    const resultado = await fetch("http://localhost:3000/users",{
      method: 'POST', // Método HTTP
      headers: {
          'Content-Type': 'application/json' // Tipo de dado que estamos enviando
      },
      body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
    })
    const resposta = await resultado.json()
    if (resposta && resposta.menssage==="Cadastro realizado com sucesso"){
      setAlertColor("#76d96f")
      setAlertMensage("Cadastro realizado com sucesso")
      
    }else{
      setAlertColor("#d24b4b")
      setAlertMensage("Email já cadastrado")
    }
    handleShowDiv()
    console.log(resposta)
  } 
  return (
    <>
          <div className={style.container}>
            {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
            <form action="#" className={style.form}>
                <div>
                    <label htmlFor="email">*Email:</label>
                    <input type="text" name="email" id="email" placeholder='Ex.: emaildogabriel@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                    <label htmlFor="password">*Senha:</label>
                    <input type="password" name="password" id="password" placeholder='Ex.: ******' onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    <button onClick={criarConta}>
                      Criar
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

export default CriarContaForm
