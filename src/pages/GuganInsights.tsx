import { Link } from 'react-router-dom'
import './GuganInsights.css'

function GuganInsights() {
  const timelinePosts = [
    {
      id: 1,
      user: 'Guga',
      avatar: '👦',
      hashtags: '#poupanca #tesourdireto',
      text: 'Mais um comparativo entre a poupança e o tesouro direto hoje',
      cardTitle: 'Fundo de emergência',
      cardSubtitle: 'inflação + 6,31%',
      cardColor: '#E5A847'
    },
    {
      id: 2,
      user: 'Guga',
      avatar: '👦',
      hashtags: '#tesourdireto #react',
      text: 'Hoje o Tesouro Direto (opção muito utilizada para montar uma aposentadoria) está com as taxas bem atrativas comparado ao ano passado! Rendimento e fato sobre alguns pontos importantes.',
      cardTitle: 'Tesouro Direto',
      cardSubtitle: 'inflação + 6,31%',
      cardColor: '#4A72A0'
    },
    {
      id: 3,
      user: '',
      avatar: '',
      hashtags: '#ultimosnumeros',
      text: 'Poupança 6% ao ano, Melhor CDB ~3% ao ano, Tesouro Direto 12% ao ano.',
      cardTitle: '',
      cardSubtitle: '',
      cardColor: '#f3f4f6'
    },
    {
      id: 4,
      user: 'Guga',
      avatar: '👦',
      hashtags: '#cdbs',
      text: 'Hoje encontramos CDBs de até 123% CDI. Com o Isra em 13,25% no momento isso equivale a um rendimento de 17% ao ano. Clique no banner a seguir para visualizar todos os CDBs.',
      cardTitle: 'CDBs',
      cardSubtitle: 'até 123% CDI',
      cardColor: '#4AB5A0'
    }
  ]

  return (
    <div className="guga-insights-page">
      <div className="header">
        <Link to="/" className="back-button">← Voltar</Link>
        <h1>Guga Insights</h1>
      </div>

      <div className="timeline-container">
        {timelinePosts.map((post) => (
          <div key={post.id} className={`timeline-post ${!post.user ? 'info-post' : ''}`}>
            {post.user && (
              <div className="post-header">
                <div className="post-avatar">{post.avatar}</div>
                <div className="post-user">
                  <span className="username">{post.user}</span>
                </div>
              </div>
            )}

            <div className="post-content">
              <div className="hashtags">{post.hashtags}</div>
              <div className="post-text">{post.text}</div>

              {post.cardTitle && (
                <div
                  className="investment-card"
                  style={{ backgroundColor: post.cardColor }}
                >
                  <h3>{post.cardTitle}</h3>
                  <p>{post.cardSubtitle}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuganInsights