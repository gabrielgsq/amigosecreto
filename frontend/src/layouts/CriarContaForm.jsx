import React from 'react';
import style from "./CriarContaForm.module.css";

function CriarContaForm() {
  return (
    <>
          <div className={style.container}>
            <form action="#" className={style.form}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" placeholder='Ex.: emaildogabriel@gmail.com' />
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" id="password" placeholder='Ex.: ******' />
                    <button>
                      Criar
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

export default CriarContaForm
