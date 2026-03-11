# Quanta Shop — Cadastro Facilitado (React)

## Sobre o Projeto

Landing page de cadastro para o programa de cashback da Quanta Shop. Permite que clientes realizem o pré-cadastro da primeira compra enviando CPF, WhatsApp, email, senha, valor da compra e comprovante.

## Stack

- **React 18** + **Vite 5** (dev server na porta 5000)
- **react-imask** — máscaras de CPF, WhatsApp e valor monetário
- **react-toastify** — notificações de sucesso/erro
- **Bootstrap 4** (via CSS estático em `public/assets/css/`)
- **Font Awesome + Ionicons** (via fontes estáticas)

## Estrutura

```
├── index.html               # Entry point HTML com meta tags e CSS imports
├── vite.config.js           # Configuração do Vite (porta 5000, host 0.0.0.0)
├── package.json
├── public/
│   └── assets/
│       ├── css/             # Bootstrap, helpers, style, landing-2, slick
│       └── fonts/           # fontawesome, ionicons, slick
└── src/
    ├── main.jsx             # ReactDOM.createRoot + ToastContainer
    ├── App.jsx              # Navbar + seção hero + footer
    └── components/
        ├── Navbar.jsx       # Navbar responsiva com scroll detection
        └── RegistrationForm.jsx  # Formulário com validação e envio à API
```

## API

Envia POST para `https://api.quantashop.com.br/api/user/primeiraCompra` com:
- `cpf`, `celular`, `email`, `senha`, `valorCompra`, `comprovanteCompra` (base64), `cnpj` (da URL)

## Dev

```bash
npm run dev   # inicia em http://localhost:5000
npm run build # build de produção em dist/
```

## Deploy

Configurado como **autoscale** no Replit, rodando `npm run dev` na porta 5000.
