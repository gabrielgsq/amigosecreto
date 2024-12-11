import React, { useEffect, useState, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import style from './MainLayout.module.css';
import MainLayoutBody from './mainLayoutBody';



const MainLayout = () => {
  const [angulo, setAngulo] = useState(45);
  const anguloRef = useRef(angulo);

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

      body.style.background = `linear-gradient(${currentAngulo}deg, rgb(44, 44, 144), rgb(119, 16, 119))`;
    }, 250);

    // Limpa o intervalo ao desmontar
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={style.container}>

        <header className={style.header}>
          <div className={style.loginHeader}>
            <div>
              Amigo <span>Secreto</span>
            </div>
            <button>
              Criar conta
            </button>
          </div>
        </header>
        <MainLayoutBody / >
        <footer className={style.footer}>
            <h3>Depoimentos de Quem Já Usou</h3>
              <ul>
                <li>🎄 'Organizar nosso amigo secreto ficou muito mais fácil! Adorei!' – Gabriel</li>
                <li>🎁 'O sistema de gostos pessoais é incrível. Todo mundo amou!' – Carla</li>
                <li>✨ 'Finalmente um site que realmente resolve o problema do sorteio.' – Lima"</li>
              </ul>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
