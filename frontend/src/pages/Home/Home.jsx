import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [auth, setAuth] = React.useState(false)
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
    return (<>
      <h1>Você está em uma área logada!</h1>
      <div>
            {/* Div vazia para manter o form no centro, resolvi tirar o footer, melhorar isso depois se tiver tempo :D */}
          </div>
      </>)
  } else{
    return (<></>)
  }
};

export default Home;
