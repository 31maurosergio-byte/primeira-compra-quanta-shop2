import React from 'react'
import Navbar from './components/Navbar.jsx'
import RegistrationForm from './components/RegistrationForm.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <section
        className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light"
        id="section-home"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <h2 className="heading mb-3">
                Cadastre-se no <strong>Quanta Shop</strong> e receba cashback nas
                suas compras!
              </h2>
              <div className="sub-heading">
                <p className="mb-4">
                  Aproveite a oportunidade de economizar com o Quanta Shop! Ao se
                  cadastrar, você receberá cashback das suas compras.
                </p>
                <p className="mb-4">
                  É simples, rápido e você ganha de volta uma parte do valor
                  gasto. Preencha o formulário e comece a economizar hoje mesmo.
                </p>
                <p className="mb-4">
                  Não perca essa chance de fazer suas compras valerem ainda mais
                  com o Quanta Shop!
                </p>
              </div>
            </div>

            <div className="col-md-5 mt-5 relative align-self-center">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="pb_footer" style={{ background: '#1a1a2e', padding: '2rem 0', marginTop: '2rem' }}>
        <div className="container text-center text-white">
          <p className="mb-0" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Quanta Shop. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}
