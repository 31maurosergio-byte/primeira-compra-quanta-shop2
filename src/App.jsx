import { useState, useMemo } from 'react'
import './App.css'

const PRODUCTS = [
  {
    id: 1,
    name: 'Smartphone Pro Max',
    category: 'Eletrônicos',
    price: 1299.90,
    oldPrice: 1599.90,
    emoji: '📱',
    rating: 4.8,
    reviews: 312,
    badge: 'Oferta',
  },
  {
    id: 2,
    name: 'Fone de Ouvido Bluetooth',
    category: 'Eletrônicos',
    price: 349.90,
    oldPrice: 499.90,
    emoji: '🎧',
    rating: 4.6,
    reviews: 218,
    badge: null,
  },
  {
    id: 3,
    name: 'Tênis Esportivo Runner',
    category: 'Calçados',
    price: 289.90,
    oldPrice: 399.90,
    emoji: '👟',
    rating: 4.7,
    reviews: 145,
    badge: 'Oferta',
  },
  {
    id: 4,
    name: 'Mochila Urbana 30L',
    category: 'Acessórios',
    price: 159.90,
    oldPrice: null,
    emoji: '🎒',
    rating: 4.5,
    reviews: 87,
    badge: 'Novo',
  },
  {
    id: 5,
    name: 'Notebook UltraSlim',
    category: 'Eletrônicos',
    price: 3499.90,
    oldPrice: 4299.90,
    emoji: '💻',
    rating: 4.9,
    reviews: 431,
    badge: 'Oferta',
  },
  {
    id: 6,
    name: 'Camiseta Básica Premium',
    category: 'Vestuário',
    price: 79.90,
    oldPrice: null,
    emoji: '👕',
    rating: 4.3,
    reviews: 56,
    badge: 'Novo',
  },
  {
    id: 7,
    name: 'Relógio Smartwatch',
    category: 'Eletrônicos',
    price: 599.90,
    oldPrice: 799.90,
    emoji: '⌚',
    rating: 4.7,
    reviews: 203,
    badge: null,
  },
  {
    id: 8,
    name: 'Livro: Finanças para Iniciantes',
    category: 'Livros',
    price: 49.90,
    oldPrice: 69.90,
    emoji: '📚',
    rating: 4.6,
    reviews: 98,
    badge: null,
  },
  {
    id: 9,
    name: 'Câmera Mirrorless 24MP',
    category: 'Eletrônicos',
    price: 4799.90,
    oldPrice: 5999.90,
    emoji: '📷',
    rating: 4.9,
    reviews: 175,
    badge: 'Oferta',
  },
  {
    id: 10,
    name: 'Panela de Pressão Elétrica',
    category: 'Casa',
    price: 249.90,
    oldPrice: 329.90,
    emoji: '🍳',
    rating: 4.5,
    reviews: 122,
    badge: null,
  },
  {
    id: 11,
    name: 'Óculos de Sol Polarizado',
    category: 'Acessórios',
    price: 189.90,
    oldPrice: null,
    emoji: '🕶️',
    rating: 4.4,
    reviews: 63,
    badge: 'Novo',
  },
  {
    id: 12,
    name: 'Kit Skincare Completo',
    category: 'Beleza',
    price: 199.90,
    oldPrice: 279.90,
    emoji: '🧴',
    rating: 4.8,
    reviews: 289,
    badge: 'Oferta',
  },
]

const CATEGORIES = ['Todos', 'Eletrônicos', 'Calçados', 'Vestuário', 'Acessórios', 'Casa', 'Livros', 'Beleza']

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {hasHalf ? '½' : ''}
      {'☆'.repeat(5 - full - (hasHalf ? 1 : 0))}
    </span>
  )
}

function ProductCard({ product, onAddToCart, addedId }) {
  const isAdded = addedId === product.id
  return (
    <div className="product-card">
      <div className="product-image">
        {product.emoji}
        {product.badge && (
          <span className={`product-badge ${product.badge === 'Novo' ? 'new' : ''}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-rating">
          <StarRating rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-footer">
          <div className="product-price">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="price-old">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <button
            className={`add-to-cart ${isAdded ? 'added' : ''}`}
            onClick={() => onAddToCart(product)}
          >
            {isAdded ? '✓ Adicionado' : '+ Carrinho'}
          </button>
        </div>
      </div>
    </div>
  )
}

function CartModal({ cart, onClose, onUpdateQty, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 299 ? 0 : 19.90
  const total = subtotal + shipping

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>🛒 Meu Carrinho</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="emoji">🛍️</div>
              <p>Seu carrinho está vazio</p>
              <p style={{ marginTop: 8, fontSize: '0.85rem' }}>Adicione produtos para continuar</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-emoji">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                  <button className="remove-btn" onClick={() => onRemove(item.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Frete</span>
                <span>{shipping === 0 ? 'Grátis 🎉' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <div className="cart-summary-row" style={{ fontSize: '0.8rem', color: '#a855f7' }}>
                  <span>Faltam {formatPrice(299 - subtotal)} para frete grátis</span>
                </div>
              )}
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button className="checkout-btn">
              Finalizar Compra →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [addedId, setAddedId] = useState(null)
  const [toast, setToast] = useState(null)

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'Todos' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  function handleAddToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
    showToast(`${product.emoji} ${product.name} adicionado!`)
  }

  function handleUpdateQty(id, qty) {
    if (qty <= 0) {
      handleRemove(id)
      return
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function handleRemove(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            Quanta<span>Shop</span>
          </div>
          <div className="header-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="header-actions">
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              🛒 Carrinho
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Sua <span>Primeira Compra</span> com desconto especial!</h1>
          <p>Produtos incríveis com os melhores preços do Brasil</p>
          <span className="hero-badge">✨ Frete grátis acima de R$ 299</span>
        </div>
      </section>

      <main className="main-content">
        <div className="categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="section-header">
          <h2>
            {search ? `Resultados para "${search}"` : activeCategory === 'Todos' ? 'Todos os Produtos' : activeCategory}
          </h2>
          <span className="product-count">{filtered.length} produtos</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">🔍</div>
            <h3>Nenhum produto encontrado</h3>
            <p>Tente buscar por outro termo ou categoria</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                addedId={addedId}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 <strong>QuantaShop</strong> — Sua primeira compra com a melhor experiência</p>
      </footer>

      {cartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
