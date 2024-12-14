import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import style from './Home.module.css'




const Home = () => {
  const [auth, setAuth] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState(1)
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token){
      navigate('/login');
    }
  async function checkAuth() {
    const response = await fetch('http://localhost:3000/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
    },
  })
    const data = await response.json();
      if (data.message !== 'Autorizado'){
        navigate('/login');
      }else{
        setAuth(true)
      }
    }
  checkAuth();
  },[])


  if (auth){
    return (
    <>
      <div className={style.container}>
        <div className={style.cardMaster}>
          <div className={style.grid}>
            <div className={style.header}>
              <div>
              Gerencie Seus Eventos
              </div>
              <div>
              < Link to="/">
                  <div className={style.sair}>Sair</div>
                </Link>
              </div>
            </div>
            <div className={style.col1}>
                <Link to="/home" className={`${activeMenu==1 ? style.ativo : ""}`} onClick={()=>{setActiveMenu(1)}}>
                  <div>Criar Grupo</div>
                </Link>
                <Link to="/home/meusgrupos" className={`${activeMenu==2 ? style.ativo : ""}`} onClick={()=>{setActiveMenu(2)}}>
                  <div>Meus Grupos</div>
                </Link>
                <Link to="/home/alterarsenha" className={`${activeMenu==3 ? style.ativo : ""}`} onClick={()=>{setActiveMenu(3)}}>
                  <div>Alterar Senha</div>
                </Link>
                <Link to="/home/excluirconta" className={`${activeMenu==4 ? style.ativo : ""}`} onClick={()=>{setActiveMenu(4)}}>
                  <div>Excluir Conta</div>
                </Link>
            </div>
            <div className={style.col2}>
              <div>
                <Outlet context={{ setActiveMenu }}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>)
  } else{
    return (<></>)
  }
};

export default Home;
