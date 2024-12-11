import React, { useEffect, useState, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import style from './MainLayout.module.css';



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
        <main className={style.main}>
          <div className={style.texto}>
            <h3>Como Funciona?</h3>
            <p>Organize o amigo secreto das festas de final de ano de forma prática e segura. Veja como é fácil:</p>
            <ul>
              <li>1 - Crie um grupo e escolha um nome divertido.</li>
              <li>2 - Receba um link exclusivo para convidar seus amigos.</li>
              <li>3 - Os participantes preenchem suas preferências de presente no site.</li>
              <li>4 - O sorteio é realizado automaticamente, e cada pessoa recebe por e-mail as informações de quem deve presentear</li>
            </ul>
          </div>
          <div className={style.imgContainerRight}>
            <img className={style.img}src="/img/img1.webp" alt="" />
          </div>
          <div className={style.imgContainerLeft}>
            <img className={style.img}src="/img/img2.webp" alt="" />
          </div>
          <div className={style.textoRight}>
            <h3>Por Que Escolher Nosso Site?</h3>
            <p>Deixe a diversão do amigo secreto ainda mais especial com ferramentas que tornam tudo mais organizado</p>
            <ul>
              <li>1 - Praticidade: Criação de grupos e gerenciamento de participantes em poucos cliques.</li>
              <li>2 - Privacidade: Apenas o organizador precisa logar. Os desejos e gostos pessoais ficam visíveis apenas para quem sorteou</li>
              <li>3 - Automatização: Nosso sistema faz o sorteio e envia as informações diretamente por e-mail.</li>
            </ul>
          </div>
          <div className={style.texto}>
            <h3>Benefícios</h3>
            <p></p>
            <ul>
              <li>✔ Evite confusões com sorteios manuais.</li>
              <li>✔ Garanta que todos recebam presentes que realmente combinam com seus gostos.</li>
              <li>✔ Acompanhe o preenchimento das informações de forma organizada.</li>
              <li>✔ Totalmente gratuito e sem complicações!</li>
            </ul>
          </div>
          <div className={style.imgContainerRight}>
            <img className={style.img}src="/img/img3.webp" alt="" />
          </div>
        </main>
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
