import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getAssetsByCategory, getCategoryById, getCdiRate } from '../services/dataService'
import { Asset } from '../types'
import InlineAssetChat from '../components/InlineAssetChat'
import './Category.css'

function Category() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = getCategoryById(categoryId || '')
  const assets = getAssetsByCategory(categoryId || '')
  const cdiRate = getCdiRate()
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null)
  
  if (!category) {
    return (
      <div className="category-page">
        <div className="header">
          <Link to="/" className="back-button">← Voltar</Link>
          <h1>Categoria não encontrada</h1>
        </div>
      </div>
    )
  }

  const getDisplayRate = (asset: Asset) => {
    switch (asset.type) {
      case 'fixed':
        return asset.rate
      case 'ipca':
        return (asset.ipcaRate || 0) + asset.rate
      case 'cdi':
        return (cdiRate * asset.rate) / 100
      default:
        return asset.rate
    }
  }


  const fixedAssets = assets.filter(asset => asset.type === 'fixed')
  const ipcaAssets = assets.filter(asset => asset.type === 'ipca')
  const cdiAssets = assets.filter(asset => asset.type === 'cdi')

  const parseMaturityToYears = (maturity: string): number => {
    const match = maturity.match(/(\d+)\s*(meses?|anos?|m|a)/i)
    if (!match) return 0
    
    const value = parseInt(match[1])
    const unit = match[2].toLowerCase()
    
    if (unit.includes('mes') || unit === 'm') {
      return value / 12 // converter meses para anos
    }
    return value // já está em anos
  }

  const renderTimeline = (asset: Asset) => {
    const years = parseMaturityToYears(asset.maturity)
    const maxYears = 10
    const position = Math.min((years / maxYears) * 100, 100) // % da posição na timeline
    
    // Formatação do label (manter formato extenso)
    const formatLabel = (maturity: string) => {
      return maturity // manter como está: "2 anos", "6 meses", etc.
    }

    return (
      <div className="timeline">
        <div className="timeline-text-fixed">
          {formatLabel(asset.maturity)}
        </div>
        <div className="timeline-track">
          <div className="timeline-line"></div>
          {asset.hasLiquidity ? (
            <div 
              className="timeline-fill has-liquidity" 
              style={{ width: `${position}%` }}
            />
          ) : (
            <>
              <div 
                className="timeline-fill no-liquidity" 
                style={{ width: `${position}%` }}
              />
              <div 
                className="timeline-marker" 
                style={{ left: `${position}%` }}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  const renderSection = (title: string, sectionAssets: Asset[], description: string) => {
    if (sectionAssets.length === 0) return null

    // Ordenar por taxa crescente
    const sortedAssets = [...sectionAssets].sort((a, b) => {
      return a.rate - b.rate // Crescente (menor primeiro)
    })

    const maxSectionRate = Math.max(...sortedAssets.map(getDisplayRate))

    const getTitleLink = () => {
      switch (title) {
        case "Pré-fixados":
          return "/chat/pre-fixado"
        case "Inflação (IPCA + %)":
          return "/chat/ipca"
        case "Pós-fixado (% CDI)":
          return "/chat/cdi"
        default:
          return "#"
      }
    }

    return (
      <div className="asset-section">
        <Link to={getTitleLink()} className="section-title-link">
          <h2 className="section-title">{title}</h2>
        </Link>
        <p className="section-description">{description}</p>
        <div className="assets-list">
          {sortedAssets.map(asset => {
            const displayRate = getDisplayRate(asset)
            const widthPercentage = (displayRate / maxSectionRate) * 100

            const renderRateDisplay = () => {
              switch (asset.type) {
                case 'fixed':
                  return (
                    <div className="rate-bar">
                      <div 
                        className="rate-fill rate-fill-fixed" 
                        style={{ width: `${widthPercentage}%` }}
                      />
                      <span className="rate-text">{asset.rate.toFixed(1)}%</span>
                    </div>
                  )
                
                case 'ipca':
                  const ipcaWidth = ((asset.ipcaRate || 0) / maxSectionRate) * 100
                  const extraWidth = (asset.rate / maxSectionRate) * 100
                  return (
                    <div className="rate-container-ipca">
                      <div className="rate-bar">
                        <div 
                          className="rate-fill rate-fill-ipca" 
                          style={{ width: `${ipcaWidth}%` }}
                        >
                          {ipcaWidth > 15 && <span className="ipca-text">IPCA</span>}
                        </div>
                        <div 
                          className="rate-fill rate-fill-ipca-extra" 
                          style={{ 
                            width: `${extraWidth}%`,
                            left: `${ipcaWidth}%`
                          }}
                        >
                          {extraWidth > 20 && <span className="extra-text">+{asset.rate.toFixed(1)}%</span>}
                        </div>
                      </div>
                    </div>
                  )
                
                case 'cdi':
                  const cdiMarkPosition = (cdiRate / maxSectionRate) * 100
                  return (
                    <div className="rate-container-cdi">
                      {cdiMarkPosition <= 100 && (
                        <div 
                          className="cdi-label" 
                          style={{ left: `${cdiMarkPosition}%` }}
                        >
                          CDI
                        </div>
                      )}
                      <div className="rate-bar">
                        <div 
                          className="rate-fill rate-fill-cdi" 
                          style={{ width: `${widthPercentage}%` }}
                        />
                        {cdiMarkPosition <= 100 && (
                          <div 
                            className="cdi-mark" 
                            style={{ left: `${cdiMarkPosition}%` }}
                          />
                        )}
                        <span className="rate-text">{asset.rate}% CDI</span>
                      </div>
                    </div>
                  )
                
                default:
                  return null
              }
            }

            return (
              <div key={asset.id}>
                <div 
                  className={`asset-row ${expandedAsset === asset.id ? 'expanded' : ''}`}
                  onClick={() => setExpandedAsset(expandedAsset === asset.id ? null : asset.id)}
                >
                  <div className="asset-info">
                    <div className="broker">{asset.broker}</div>
                    <div className="issuer">{asset.issuer}</div>
                  </div>
                  
                  <div className="rate-container">
                    {renderRateDisplay()}
                  </div>
                  
                  <div className="asset-details">
                    <div className="timeline-container">
                      {renderTimeline(asset)}
                    </div>
                  </div>
                </div>
                
                {expandedAsset === asset.id && (
                  <div className="asset-chat-container">
                    <InlineAssetChat asset={asset} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <div className="header">
        <Link to="/" className="back-button">← Voltar</Link>
        <h1>{category.name}</h1>
      </div>
      
      <div className="sections-container">
        {renderSection("Pré-fixados", fixedAssets, "Você sabe exatamente quanto vai ganhar quando investe. É como uma poupança com taxa garantida.")}
        {renderSection("Inflação (IPCA + %)", ipcaAssets, "Protege seu dinheiro da inflação (IPCA) + ganha um extra. Melhor que poupança contra a alta de preços.")}
        {renderSection("Pós-fixado (% CDI)", cdiAssets, "Ganha uma % da taxa básica do país. Quanto maior a Selic, mais você ganha.")}
        
        {assets.length === 0 && (
          <div className="no-assets">
            Nenhum ativo disponível nesta categoria
          </div>
        )}
      </div>
    </div>
  )
}

export default Category