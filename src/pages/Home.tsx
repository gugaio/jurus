import { Link } from 'react-router-dom'
import { getCategories } from '../services/dataService'
import './Home.css'

function Home() {
  const categories = getCategories()

  const categoryStyles: Record<string, { background: string; icon: string }> = {
    'tesouro-direto': { background: '#4A72A0', icon: '📄' },
    'cdb': { background: '#4AB5A0', icon: '🏛️' },
    'lci': { background: '#E5A847', icon: '🏠' },
    'cra': { background: '#D67A7A', icon: '📈' },
    'debentures': { background: '#7AB8E5', icon: '📄' },
    'cri': { background: '#8A7AE5', icon: '📄' }
  }

  return (
    <div className="home">
      <h1 className="home-title">Jurus</h1>
      <p className="home-subtitle">Seu parceiro de investimentos</p>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/categoria/${category.id}`} 
            className="category-card"
            style={{ background: categoryStyles[category.id]?.background || '#4A72A0' }}
          >
            <div className="category-icon">
              {categoryStyles[category.id]?.icon || '📄'}
            </div>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
      <div className="insight-section">
        <div className="insight-icon">
          <span>📈</span>
        </div>
        <div className="insight-content">
          <p className="insight-text">
            Veja nossa análise sobre<br />
            os CDBs dessa semana
          </p>
          <button className="insight-button">Ler artigo completo</button>
        </div>
      </div>
    </div>
  )
}

export default Home