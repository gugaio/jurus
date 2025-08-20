import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAssetById, getCdiRate, getIpcaRate } from '../services/dataService'
import { Asset } from '../types'
import './InvestmentChat.css'

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
  hasChart?: boolean
  chartData?: any
}

function InvestmentChat() {
  const { investmentType, assetId } = useParams<{ investmentType?: string; assetId?: string }>()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  
  // Se for um ativo específico, buscar os dados
  const asset = assetId ? getAssetById(assetId) : null
  const cdiRate = getCdiRate()
  const ipcaRate = getIpcaRate()

  const chatContent: Record<string, ChatMessage[]> = {
    'pre-fixado': [
      {
        id: 1,
        text: "Oi! Vou te explicar como funciona o investimento Pré-fixado 😊",
        isBot: true
      },
      {
        id: 2,
        text: "Imagine que você quer investir R$ 1000 por 2 anos. Com pré-fixado, você JÁ sabe quanto vai receber no final!",
        isBot: true
      },
      {
        id: 3,
        text: "Por exemplo: taxa de 13% ao ano = você vai ter R$ 1.276 no final dos 2 anos. Garantido! 💰",
        isBot: true,
        hasChart: true,
        chartData: { 
          initial: 1000, 
          final: 1276, 
          rate: 13, 
          period: "2 anos",
          type: "fixed"
        }
      },
      {
        id: 4,
        text: "É como uma poupança, mas com taxa muito melhor e garantida desde o início! 🎯",
        isBot: true
      },
      {
        id: 5,
        text: "Vantagem: você sabe exatamente quanto vai ganhar\nDesvantagem: se os juros subirem muito, você não aproveita",
        isBot: true
      }
    ],
    'ipca': [
      {
        id: 1,
        text: "Vou te explicar o IPCA+ de um jeito simples! 📈",
        isBot: true
      },
      {
        id: 2,
        text: "IPCA é a inflação - ou seja, quanto os preços sobem no país. Em 2024 está em torno de 4% ao ano.",
        isBot: true
      },
      {
        id: 3,
        text: "No IPCA+, você ganha: Inflação + um bônus extra!",
        isBot: true
      },
      {
        id: 4,
        text: "Exemplo: IPCA + 5%\nSe a inflação for 4%, você ganha 4% + 5% = 9% total no ano! 🚀",
        isBot: true,
        hasChart: true,
        chartData: {
          ipca: 4,
          extra: 5,
          total: 9,
          type: "ipca"
        }
      },
      {
        id: 5,
        text: "Isso protege seu dinheiro! Se tudo ficar mais caro (inflação), seu investimento acompanha + ganha um extra.",
        isBot: true
      },
      {
        id: 6,
        text: "É perfeito para quem quer que o dinheiro não perca valor com o tempo! 🛡️",
        isBot: true
      }
    ],
    'cdi': [
      {
        id: 1,
        text: "Vou explicar o % CDI de forma bem fácil! 💡",
        isBot: true
      },
      {
        id: 2,
        text: "CDI é basicamente a taxa básica de juros do país (hoje está em 11,75%).",
        isBot: true
      },
      {
        id: 3,
        text: "Quando você investe em % CDI, ganha uma porcentagem dessa taxa.",
        isBot: true
      },
      {
        id: 4,
        text: "Exemplo: 100% CDI\nCDI = 11,75%, então você ganha 11,75% ao ano",
        isBot: true,
        hasChart: true,
        chartData: {
          cdiRate: 11.75,
          percentage: 100,
          finalRate: 11.75,
          type: "cdi"
        }
      },
      {
        id: 5,
        text: "Se o governo aumentar os juros (Selic), seu investimento ganha mais automaticamente! 📊",
        isBot: true
      },
      {
        id: 6,
        text: "É ótimo em épocas de juros altos. Quando a Selic sobe, você ganha mais sem fazer nada! 🎢",
        isBot: true
      }
    ]
  }

  // Função para criar chat personalizado para um ativo específico
  const createAssetChat = (asset: Asset): ChatMessage[] => {
    const getDisplayRate = () => {
      switch (asset.type) {
        case 'fixed':
          return `${asset.rate.toFixed(1)}%`
        case 'ipca':
          return `IPCA + ${asset.rate.toFixed(1)}% = ${(ipcaRate + asset.rate).toFixed(1)}%`
        case 'cdi':
          return `${asset.rate}% CDI = ${((cdiRate * asset.rate) / 100).toFixed(1)}%`
        default:
          return `${asset.rate.toFixed(1)}%`
      }
    }


    return [
      {
        id: 1,
        text: `Esse é um CDB do ${asset.issuer}, distribuído na corretora ${asset.broker}`,
        isBot: true
      },
      {
        id: 2,
        text: `Vencimento em ${asset.maturity}. ${asset.hasLiquidity 
          ? "✅ Tem liquidez: você pode sacar seu dinheiro a qualquer momento, sem esperar o vencimento. É como uma poupança!" 
          : "🔒 Sem liquidez: normalmente não é possível sacar antes do vencimento. Às vezes é possível, mas você perde boa parte do investimento."}`,
        isBot: true
      },
      {
        id: 3,
        text: `Rentabilidade: ${getDisplayRate()} ao ano 💰`,
        isBot: true,
        hasChart: true,
        chartData: {
          type: asset.type,
          rate: asset.rate,
          maturity: asset.maturity,
          broker: asset.broker,
          issuer: asset.issuer,
          hasLiquidity: asset.hasLiquidity,
          cdiRate: asset.type === 'cdi' ? cdiRate : undefined,
          ipcaRate: asset.type === 'ipca' ? ipcaRate : undefined
        }
      },
      ...(asset.type === 'ipca' ? [{
        id: 4,
        text: `Expectativa da inflação (IPCA) para os próximos meses:`,
        isBot: true,
        hasChart: true,
        chartData: {
          type: 'ipca-curve',
          months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          values: [0.42, 0.38, 0.35, 0.32, 0.29, 0.31, 0.33, 0.35, 0.37, 0.39, 0.41, 0.43]
        }
      }] : [])
    ]
  }

  useEffect(() => {
    let content: ChatMessage[] = []
    
    if (asset) {
      // Chat para ativo específico
      content = createAssetChat(asset)
    } else if (investmentType) {
      // Chat geral por tipo de investimento
      content = chatContent[investmentType] || []
    }
    
    if (content.length > 0) {
      // Adicionar mensagens gradualmente
      let currentIndex = 0
      const timer = setInterval(() => {
        if (currentIndex < content.length - 1) {
          currentIndex += 1
          setMessages(content.slice(0, currentIndex + 1))
        } else {
          clearInterval(timer)
        }
      }, 500)

      // Primeira mensagem imediata
      setMessages([content[0]])
      
      return () => clearInterval(timer)
    }
  }, [investmentType, assetId, asset])

  const renderChart = (data: any) => {
    if (data.type === 'fixed') {
      return (
        <div className="chart-container">
          <div className="investment-comparison">
            <div className="bar-chart">
              <div className="bar">
                <div className="bar-fill" style={{ height: '60%', backgroundColor: '#4285f4' }}>
                  <span className="bar-label">R$ {data.initial}</span>
                </div>
                <div className="bar-title">Início</div>
              </div>
              <div className="arrow">→</div>
              <div className="bar">
                <div className="bar-fill" style={{ height: '100%', backgroundColor: '#34a853' }}>
                  <span className="bar-label">R$ {data.final}</span>
                </div>
                <div className="bar-title">{data.period}</div>
              </div>
            </div>
            <div className="rate-info">{data.rate}% ao ano garantido!</div>
          </div>
        </div>
      )
    }

    if (data.type === 'ipca') {
      return (
        <div className="chart-container">
          <div className="ipca-breakdown">
            <div className="ipca-parts">
              <div className="ipca-part" style={{ backgroundColor: '#ea4335' }}>
                <span>IPCA: {data.ipca}%</span>
              </div>
              <div className="plus">+</div>
              <div className="ipca-part" style={{ backgroundColor: '#4285f4' }}>
                <span>Extra: {data.extra}%</span>
              </div>
              <div className="equals">=</div>
              <div className="ipca-total" style={{ backgroundColor: '#34a853' }}>
                <span>Total: {data.total}%</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (data.type === 'cdi') {
      return (
        <div className="chart-container">
          <div className="cdi-calculation">
            <div className="cdi-formula">
              <span className="cdi-rate">{data.percentage}% do CDI</span>
              <span className="times">×</span>
              <span className="current-cdi">{data.cdiRate}%</span>
              <span className="equals">=</span>
              <span className="final-rate">{data.finalRate}% ao ano</span>
            </div>
          </div>
        </div>
      )
    }

    if (data.type === 'ipca-curve') {
      const maxValue = Math.max(...data.values)
      return (
        <div className="chart-container">
          <div className="ipca-curve">
            <div className="curve-chart">
              {data.months.map((month: string, index: number) => {
                const height = (data.values[index] / maxValue) * 100
                return (
                  <div key={month} className="curve-point">
                    <div 
                      className="curve-bar" 
                      style={{ height: `${height}%` }}
                    />
                    <div className="curve-value">{data.values[index]}%</div>
                    <div className="curve-month">{month}</div>
                  </div>
                )
              })}
            </div>
            <div className="curve-info">
              Média anual: ~4.0% | Esta é uma projeção baseada no mercado
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const getTitle = () => {
    if (asset) {
      return `${asset.broker} - ${asset.issuer}`
    }
    
    switch (investmentType) {
      case 'pre-fixado':
        return 'Pré-fixado'
      case 'ipca':
        return 'IPCA+'
      case 'cdi':
        return '% CDI'
      default:
        return 'Investimentos'
    }
  }

  const getBackUrl = () => {
    if (asset) {
      // Determinar categoria baseada no ativo
      return '/categoria/cdb' // Por simplicidade, assumindo CDB por agora
    }
    return '/categoria/cdb'
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <Link to={getBackUrl()} className="back-button">← Voltar</Link>
        <h1>{getTitle()}</h1>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isBot ? 'bot' : 'user'}`}>
              <div className="message-avatar">
                {message.isBot ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                {message.hasChart && message.chartData && renderChart(message.chartData)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InvestmentChat