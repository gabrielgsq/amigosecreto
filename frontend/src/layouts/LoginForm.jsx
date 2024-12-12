import React from 'react';
import style from "./LoginForm.module.css";
import { Link } from 'react-router-dom';

function LoginForm() {

  function entrar(e){
    e.preventDefault()
    ;(async ()=>{
      const data = {
        name: "João",
        email: "joao@example.com",
        message: "Olá, mundo!"
      }
      await fetch('http://localhost:3000/users', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Tipo de dado que estamos enviando
        },
        body: JSON.stringify(data) // Dados a serem enviados no corpo da requisição
    })
    })()
  }

  return (
    <>
      <div className={style.container}>
        <form action="" className={style.form}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" placeholder='Ex.: emaildogabriel@gmail.com' />
                <label htmlFor="password">Senha:</label>
                <input type="password" name="password" id="password" placeholder='Ex.: ******' />
                  <button onClick={entrar}>
                    Entrar
                  </button>
                <button>
                  Recuperar senha
                </button>
            </div>
        </form>
      </div>
      <div>
        {/* Div vazia para manter o form no centro, resolvi tirar o footer, melhorar isso depois se tiver tempo :D */}
      </div>
    </>
  )
}

export default LoginForm
