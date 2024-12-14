import React from 'react'
import style from './excluirConta.module.css';
import { useNavigate } from 'react-router-dom';

function ExcluirConta() {
  const navigate = useNavigate();
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
 
   async function excluirMinhaConta(e){
     e.preventDefault()

    const token = localStorage.getItem('token');
    const resultado = await fetch("http://localhost:3000/users/excluirconta",{
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    })
    const resposta = await resultado.json()
    if (resposta?.message==="Excluído"){
      localStorage.removeItem("token");
      navigate('/login');
    }else{
      setAlertColor("red")
      setAlertMensage("Não foi possível excluir o usuário")
      setVisible(true);
    }
    
   }
 
   return (
     <div className={style.container}>
       {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
       <form action="" className={style.form}>
           <div>
               <button onClick={excluirMinhaConta}>
                 Excluir Conta!
               </button>
           </div>
       </form>
     </div>
   )
 }

export default ExcluirConta
