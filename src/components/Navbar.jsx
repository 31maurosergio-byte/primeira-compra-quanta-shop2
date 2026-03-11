import React, { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark pb_navbar${scrolled ? ' pb_navbar-scrolled' : ' pb_scrolled-light'}`}
      id="pb-navbar"
    >
      <div className="container">
        <a className="navbar-brand m-3 mr-5" href="https://quantashop.com.br/" target="_blank" rel="noreferrer">
          <img
            src="https://res.cloudinary.com/dryd9bfjj/image/upload/v1715374083/Quanta%20Shop/sbrghbfwx4kzee5vzecj.png"
            alt="Quanta Shop"
            style={{ width: '8rem' }}
          />
        </a>
        <button
          className="navbar-toggler ml-auto m-3"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span><i className="ion-navicon"></i></span>
        </button>
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="probootstrap-navbar">
          <ul className="navbar-nav">
            <li className="nav-item ml-3">
              <a className="nav-link" href="https://quantashop.com.br/" target="_blank" rel="noreferrer">Lojas</a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link" href="https://quantashop.com.br/quem-somos" target="_blank" rel="noreferrer">Quem somos</a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link" href="https://quantashop.com.br/como-funciona" target="_blank" rel="noreferrer">Como funciona</a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link" href="https://quantashop.com.br/credenciar" target="_blank" rel="noreferrer">Credenciamento</a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link" href="https://quantashop.com.br/#" target="_blank" rel="noreferrer">Contato</a>
            </li>
            <li className="nav-item ml-3 cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0">
              <a className="nav-link" href="https://quantabank.com.br/" target="_blank" rel="noreferrer">
                <span className="pb_rounded-4 px-4">Quanta Bank</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
