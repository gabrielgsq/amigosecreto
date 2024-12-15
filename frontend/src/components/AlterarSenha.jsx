import React from 'react'
import style from './AlterarSenha.module.css';
import url from "../frontconfig.js"

function AlterarSenha() {
  const [oldPassword, setOldPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
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
 

   async function changePass(e){
     e.preventDefault()
     if (!oldPassword || !newPassword){
      setAlertColor("#d24b4b")
      setAlertMensage("Preencha todos os campos")
      setVisible(true);
      return false
    }
    const data = {
      oldPassword,
      newPassword
    }
    const token = localStorage.getItem('token');
    const resultado = await fetch(`${url}/users/changepass`,{
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
    })
    const resposta = await resultado.json()
    if (resposta?.message && resposta?.message==="Senha atualizada"){
      setAlertColor("green")
      setAlertMensage("Senha atualizada")
      setVisible(true);
      handleShowDiv()
      
    }else if (resposta?.message && resposta?.message==="Senha incorreta!"){
      setAlertColor("red")
      setAlertMensage("Senha antiga incorreta")
      setVisible(true);
      handleShowDiv()

    }
    handleShowDiv()
   }
 
   return (
     <div className={style.container}>
       {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
       <form action="" className={style.form}>
           <div>
               <label htmlFor="oldPassword">Senha Antiga:</label>
               <input type="password" name="oldPassword" id="oldPassword" placeholder='*****' onChange={(e)=>{setOldPassword(e.target.value)}} value={oldPassword}/>
               <hr />
               <label htmlFor="newPassword">Senha Nova:</label>
               <input type="password" name="newPassword" id="newPassword" placeholder='********' onChange={(e)=>{setNewPassword(e.target.value)}} value={newPassword}/>
               <button onClick={changePass}>
                 Atualizar Senha
               </button>
           </div>
       </form>
     </div>
   )
 }

export default AlterarSenha
