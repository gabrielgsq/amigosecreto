import React from 'react'
import style from "./MainLayoutBody.module.css"

function MainLayoutBody() {
  return (
    <>
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
    </>
  )
}

export default MainLayoutBody
