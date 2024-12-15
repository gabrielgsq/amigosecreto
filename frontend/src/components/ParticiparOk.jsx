import React from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import style from "./Convite.module.css";
import url from "../frontconfig.js"

function ParticiparOk() {
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


  return (
    <>
    <div className={style.container}>
        <form action="" className={style.form}>
            <div>
                <h3>Você foi cadastrado com sucesso</h3>
                <hr />
                <p>Agora é só aguardar o fim do período de cadastro dos demais participantes e verificar seu e-mail. Boas festas!</p>
            </div>
        </form>
      </div>
      <div>
        {/* Div vazia para manter o form no centro, resolvi tirar o footer, melhorar isso depois se tiver tempo :D */}
      </div>
    </>
  )
}

export default ParticiparOk
