import React from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import style from "./Convite.module.css";
import url from "../frontconfig.js"

function Convite() {
    const [nome, setNome] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [gostos, setGostos] = React.useState("")
    const [visible, setVisible] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [groupName, setgroupName] = React.useState(false);
    const [alertMensage, setAlertMensage] = React.useState("");
    const [alertColor, setAlertColor] = React.useState("green");
    const navigate = useNavigate();
    const { id } = useParams(); // Obtém o valor do :id da URL

    React.useEffect(() => {
          if (visible) {
            const timer = setTimeout(() => setVisible(false), 2000); // Tempo total da animação (fadeIn + delay + fadeOut)
            return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
          }
        }, [visible]);

    React.useEffect(()=>{
          async function joinGroup() {
            const data = {
                id: id
            }
            const resposta = await fetch(`${url}/groups/checkgroup`, {
                  method: 'POST', // Método HTTP
                  headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) 
              })
            const gruposResponse = await resposta.json()
            setOpen(gruposResponse.open)
            setgroupName(gruposResponse.groupName)
          }
          joinGroup()
        },[])

    function participar(){
        async function participarEvento() {
            const data = {
                id,
                nome,
                email,
                gostos
            }
            const resposta = await fetch(`${url}/groups/participar`, {
                  method: 'POST', // Método HTTP
                  headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) 
              })
            const gruposResponse = await resposta.json()
            setOpen(gruposResponse.open)
            setAlertColor(gruposResponse.message==='Cadastro Realizado com Sucesso' ? 'green' : 'red' )
            setAlertMensage(gruposResponse.message)
            setVisible(true);
            if(gruposResponse.message==='Cadastro Realizado com Sucesso'){
                navigate('/confirmado')
            }
          }
          participarEvento()
    }
  return (
    <>
    <div className={style.container}>

        {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
        <form action="" className={style.form}>
            <div>
                {open ? 
                (<>
                <div className={style.titulo}>Convite para participar do Amigo secreto:</div>
                <label htmlFor="name"><strong>Nome:</strong></label>
                <small><label htmlFor="name">(Evite nome que outro colega possa usar ou gere dúvida)</label></small>
                <input type="text" name="name" id="name" placeholder='Ex.: Gabriel do RH' onChange={(e)=>{setNome(e.target.value)}} value={nome}/>
                <label htmlFor="email"><strong>Email:</strong></label>
                <input type="text" name="email" id="email" placeholder='Ex.: gabriel@gmail.com' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                <label htmlFor="password"><strong>Preferências:</strong><br/><small>Descreva suas preferências e gostos para ajudar o colega que te sortear</small></label>
                <textarea rows="5" type="text" name="password" id="password" placeholder='Ex.: Gosto de Chocolates e camisas de Rock tamanho M' onChange={(e)=>{setGostos(e.target.value)}} value={gostos}></textarea>
                  <button onClick={(e)=>{e.preventDefault();participar()}} >
                    Participar
                  </button>
                </>)
                 : 
                (<>
                <h3>Convite para participar do Amigo secreto:<br/>{groupName}</h3>
                <hr />
                <h2>O sorteio já foi realizado! :(</h2>
                </>)}
                

            </div>
        </form>
      </div>
      <div>
        {/* Div vazia para manter o form no centro, resolvi tirar o footer, melhorar isso depois se tiver tempo :D */}
      </div>
    </>
  )
}

export default Convite
