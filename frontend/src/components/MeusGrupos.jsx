import React from 'react'
import style from './MeusGrupos.module.css';
import url from "../frontconfig.js"

function MeusGrupos() {
    const [groupName, setGroupName] = React.useState("")
    const [dbChanges, setDbChanges] = React.useState(0)
    const [visible, setVisible] = React.useState(false);
    const [grupos, setGrupos] = React.useState([])
    const [alertMensage, setAlertMensage] = React.useState("");
    const [alertColor, setAlertColor] = React.useState("green");
    const [urlConvite, setUrlConvite] = React.useState("");
    

    React.useEffect(()=>{
      if (url==="http://localhost:3000"){
        setUrlConvite("http://localhost:5173")
      }else{
        setUrlConvite(url)
      }

    },[])

    React.useEffect(() => {
      if (visible) {
        const timer = setTimeout(() => setVisible(false), 2000); // Tempo total da animação (fadeIn + delay + fadeOut)
        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
      }
    }, [visible]);

    React.useEffect(()=>{
      
      async function findGroups() {
        const token = localStorage.getItem('token');
        const resposta = await fetch(`${url}/groups/meusgrupos`, {
              method: 'POST', // Método HTTP
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
            },
            body: "" // JSON.stringify(data) 
          })
        const gruposResponse = await resposta.json()
        setGrupos(gruposResponse.groups)

      }
      findGroups()
    },[dbChanges])

  
    const handleShowDiv = () => {
      setVisible(true); // Ativa a animação
    };

    function deletarGrupo(id){
      ;(async(id)=>{
        const token = localStorage.getItem('token');
        const data = { id }
            const resposta = await fetch(`${url}/groups/delgroup`, {
              method: 'POST', // Método HTTP
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
              },
              body: JSON.stringify(data) 
            })
            const respostaTratada = await resposta.json()
            setDbChanges((antigo)=>{setDbChanges(antigo+1)})
      })(id)
    }

    function sortearGrupo(id){
      ;(async(id)=>{
        const token = localStorage.getItem('token');
        const data = { id }
            const resposta = await fetch(`${url}/groups/sorteargroup`, {
              method: 'POST', // Método HTTP
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
              },
              body: JSON.stringify(data) 
            })
            const respostaTratada = await resposta.json()

            setAlertColor("yellow")
            setAlertMensage(respostaTratada.message)
            setVisible(true);
            console.log(respostaTratada)
            setDbChanges((antigo)=>{setDbChanges(antigo+1)})
      })(id)
    }

  

    const copiarParaClipboard = async (texto) => {
      try {
        await navigator.clipboard.writeText(texto);
        setAlertColor("green")
        setAlertMensage("Link Copiado para Ctrl+C")
        setVisible(true);
      } catch (err) {
        console.error("Erro ao copiar para o clipboard:", err);
      }
    };
    return (
      <div className={style.container}>
        {visible && (<div className={style.menssage} style={{backgroundColor:alertColor}}>{alertMensage}</div>)}
       {grupos && grupos.map((grupo)=>{
        if (grupo.open){
        return(
          <>
          <form action="" className={style.form} key={grupo._id}>
            <div>
                <div>Grupo: {grupo.groupName}</div>
                <hr />
                <div>Envie o link para seus amigos se cadastrarem:</div>
                <div>{urlConvite}/convite/{grupo._id}</div>
                <button onClick={(e)=>{e.preventDefault(); copiarParaClipboard(`${urlConvite}/convite/${grupo._id}`)}}>
                  <img src="/svg/copy.png" alt="" />Copiar
                </button>
                <hr />
                <div>Observações para o grupo:</div>
                <div>{grupo.obs}</div>
                <hr />
                <div>Amigos já cadastrados:</div>
                {grupo?.participantes?.length > 0 ? (<>
                  <ul>
                    {grupo.participantes && grupo.participantes.map((participante)=>{
                      return (<>
                        <li key={participante.email}> {participante.nome}</li>
                      </>)
                    })}
                </ul>
                </>) : (<>
                  <p>Aguardando inscrições (divulgue seu link)</p>
                </>)}
                
                <hr />
                <div>Finalizar o cadastro e realizar o sorteio</div>
                <button onClick={(e)=>{e.preventDefault();sortearGrupo(grupo._id)}}>
                  Sortear
                </button>
                <button onClick={(e)=>{e.preventDefault();deletarGrupo(grupo._id)}}>
                  Excluir Grupo
                </button>
            </div>
        </form>
          </>
        )} else {
          return (
            <>
            <form action="" className={style.form}>
              <div>
                  <div>Grupo: Família Prontera</div>
                  <hr />
                  <div>Sorteio realizado, e-mails enviados para os participantes 🎁
                  </div>
                  <hr />
                  <div>Certifique-se de que todos os participantes receberam o e-mail 😊</div>
                  <button onClick={(e)=>{e.preventDefault();deletarGrupo(grupo._id)}}>
                    Excluir Grupo
                  </button>
              </div>
            </form>
            </>
          )
        }

       })}
        
      </div>
    )
  }

export default MeusGrupos
