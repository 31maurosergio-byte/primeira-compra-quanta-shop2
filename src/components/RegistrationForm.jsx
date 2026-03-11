import React, { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { toast } from 'react-toastify'

const initialForm = {
  cpf: '',
  whatsapp: '',
  email: '',
  senha: '',
  valor: '',
  aceito: false,
  comprovante: '',
}

function keepOnlyNumbers(str) {
  return str ? str.replace(/\D/g, '') : str
}

function extractCnpjFromUrl() {
  const url = window.location.href
  const match = url.match(/br\/([^/]+)/)
  return match ? match[1] : null
}

function parseCurrency(str) {
  if (!str) return 0
  const clean = str.replace(/\./g, '').replace(',', '.')
  return parseFloat(clean) || 0
}

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({ ...prev, comprovante: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  function validateForm() {
    const errs = {}
    const cpfClean = keepOnlyNumbers(form.cpf)
    const whatsClean = keepOnlyNumbers(form.whatsapp)
    const valorNum = parseCurrency(form.valor)

    if (!cpfClean.match(/^\d{11}$/)) {
      errs.cpf = 'CPF é obrigatório e deve ter 11 dígitos.'
    }
    if (!whatsClean.match(/^\d{10,11}$/)) {
      errs.whatsapp = 'WhatsApp é obrigatório e deve ter entre 10 e 11 dígitos.'
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errs.email = 'Email é obrigatório e deve ser válido.'
    }
    if (valorNum <= 0) {
      errs.valor = 'Valor da compra é obrigatório e deve ser maior que 0.'
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
    if (!form.senha.match(passwordRegex)) {
      errs.senha = 'A senha deve ter pelo menos 8 caracteres, incluindo letras e números.'
    }
    if (!form.aceito) {
      errs.aceito = 'Você deve aceitar os termos e condições.'
    }
    if (!form.comprovante) {
      errs.comprovante = 'Você deve enviar o comprovante da compra.'
    }
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validateForm()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    const cpfClean = keepOnlyNumbers(form.cpf)
    const whatsClean = keepOnlyNumbers(form.whatsapp)
    const valorNum = parseCurrency(form.valor)

    const payload = {
      cpf: cpfClean,
      celular: whatsClean,
      email: form.email,
      valorCompra: valorNum,
      senha: form.senha,
      comprovanteCompra: form.comprovante,
      cnpj: extractCnpjFromUrl(),
    }

    try {
      const response = await fetch('https://api.quantashop.com.br/api/user/primeiraCompra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (response.ok) {
        setForm(initialForm)
        setFileName('')
        if (fileInputRef.current) fileInputRef.current.value = ''
        toast.success('Cadastro realizado com sucesso!')
      } else {
        const msg =
          data.erros && data.erros.length > 0
            ? data.erros[0].mensagem
            : 'Erro ao realizar o cadastro'
        toast.error(msg)
      }
    } catch (err) {
      toast.error('Erro ao conectar com o servidor.')
    } finally {
      setLoading(false)
    }
  }

  function FieldError({ field }) {
    if (!errors[field]) return null
    return (
      <span
        className="d-inline-block ml-1"
        title={errors[field]}
        data-toggle="tooltip"
        data-placement="top"
      >
        <i className="fa fa-info-circle text-danger" aria-hidden="true"></i>
      </span>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded pb_form_v1" noValidate>
      <h2 className="mb-4 mt-0 text-center">Informe seus dados</h2>

      <div className="form-group d-flex align-items-center">
        <IMaskInput
          mask="000.000.000-00"
          value={form.cpf}
          onAccept={(value) => setForm(prev => ({ ...prev, cpf: value }))}
          className={`form-control pb_height-50 reverse${errors.cpf ? ' border border-danger rounded' : ''}`}
          placeholder="CPF"
          autoComplete="off"
        />
        <FieldError field="cpf" />
      </div>

      <div className="form-group d-flex align-items-center">
        <IMaskInput
          mask="(00) 00000-0000"
          value={form.whatsapp}
          onAccept={(value) => setForm(prev => ({ ...prev, whatsapp: value }))}
          className={`form-control pb_height-50 reverse${errors.whatsapp ? ' border border-danger rounded' : ''}`}
          placeholder="WhatsApp"
          autoComplete="off"
        />
        <FieldError field="whatsapp" />
      </div>

      <div className="form-group d-flex align-items-center">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`form-control pb_height-50 reverse${errors.email ? ' border border-danger rounded' : ''}`}
          placeholder="Email"
          autoComplete="email"
        />
        <FieldError field="email" />
      </div>

      <div className="form-group d-flex align-items-center">
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          className={`form-control pb_height-50 reverse${errors.senha ? ' border border-danger rounded' : ''}`}
          placeholder="Senha"
          autoComplete="new-password"
        />
        <FieldError field="senha" />
      </div>

      <div className="form-group d-flex align-items-center">
        <IMaskInput
          mask={Number}
          scale={2}
          thousandsSeparator="."
          padFractionalZeros={true}
          normalizeZeros={true}
          radix=","
          mapToRadix={['.']}
          min={0}
          max={999999}
          value={form.valor}
          onAccept={(value) => setForm(prev => ({ ...prev, valor: value }))}
          className={`form-control pb_height-50 reverse${errors.valor ? ' border border-danger rounded' : ''}`}
          placeholder="Valor da compra (R$ 0,00)"
          autoComplete="off"
        />
        <FieldError field="valor" />
      </div>

      <div className="form-group d-flex align-items-center">
        <div
          className={`d-flex flex-column fileUpload${errors.comprovante ? ' border border-danger rounded' : ''}`}
        >
          <label htmlFor="txtAnexarComprovante" className="mb-0 ml-3" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
            <i className="fa fa-folder-open mr-1"></i>
            {fileName || 'Anexar comprovante da compra'}
          </label>
          <input
            id="txtAnexarComprovante"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="upload"
            ref={fileInputRef}
          />
        </div>
        <FieldError field="comprovante" />
      </div>

      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            className={`form-check-input${errors.aceito ? ' border border-danger' : ''}`}
            id="termos"
            name="aceito"
            checked={form.aceito}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="termos">
            Eu aceito os{' '}
            <a href="https://quantashop.com.br/termos" target="_blank" rel="noreferrer" style={{ color: '#665fee', fontWeight: 500 }}>
              termos e condições
            </a>
          </label>
        </div>
        {errors.aceito && (
          <small className="text-danger d-block mt-1">{errors.aceito}</small>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
              Enviando...
            </>
          ) : (
            'Cadastrar'
          )}
        </button>
      </div>
    </form>
  )
}
