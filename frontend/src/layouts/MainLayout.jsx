import React, { useEffect, useState, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import style from './MainLayout.module.css';
import MainLayoutBody from './MainLayoutBody';
import { useParams } from 'react-router-dom';


const MainLayout = () => {
  const [angulo, setAngulo] = useState(45);
  const anguloRef = useRef(angulo);
  const { id } = useParams(); // Obtém o valor do :id da URL

  // Sincronizar o ref com o estado
  useEffect(() => {
    anguloRef.current = angulo;
  }, [angulo]);

  useEffect(() => {
    const interval = setInterval(() => {
      const body = document.querySelector(`.${style.container}`);
      if (!body) return; // Certifique-se de que o elemento existe

      const currentAngulo = anguloRef.current;

      // Atualiza o estado e o gradiente
      if (currentAngulo >= 360) {
        setAngulo(0);
      } else {
        setAngulo((prev) => prev + 5); // Incrementa em 5 graus
      }

      body.style.background = `linear-gradient(${currentAngulo}deg, rgb(17, 22, 161), rgb(160, 9, 42))`;
    }, 250);

    // Limpa o intervalo ao desmontar
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={style.container}>
        {!id ? (
          <header className={style.header}>
          <div className={style.loginHeader}>
            <div>
              <Link to="/"><span>Amigo</span><span>Secreto</span></Link>
            </div>
            <div>
            <Link to="/login" id="logar">
              <button>
                Logar
              </button>
            </Link>
            <Link to="criarconta">
            <button>
              Criar conta
            </button>
            </Link>

            </div>
          </div>
        </header>
          ) : (
          <></>
          )}
        
        <Outlet />
        {/* <MainLayoutBody / > */}
        
      </div>
    </>
  );
};

export default MainLayout;
