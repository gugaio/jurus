import { useState, useEffect } from 'react'
import { getCdiRate, getIpcaRate } from '../services/dataService'
import { Asset } from '../types'
import './InlineAssetChat.css'

interface ChatMessage {
  id: number
  text: string
  isBot: boolean
  hasChart?: boolean
  chartData?: any
}

interface InlineAssetChatProps {
  asset: Asset
}

function InlineAssetChat({ asset }: InlineAssetChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const cdiRate = getCdiRate()
  const ipcaRate = getIpcaRate()

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
    const content = createAssetChat(asset)
    
    if (content.length > 0) {
      // Mostrar todas as mensagens de uma vez
      setMessages(content)
    }
  }, [asset])

  const renderChart = (data: any) => {
    if (data.type === 'fixed') {
      return (
        <div className="inline-chart-container">
          <div className="investment-comparison">
            <div className="bar-chart">
              <div className="bar">
                <div className="bar-fill" style={{ height: '60%', backgroundColor: '#4285f4' }}>
                  <span className="bar-label">Início</span>
                </div>
              </div>
              <div className="arrow">→</div>
              <div className="bar">
                <div className="bar-fill" style={{ height: '100%', backgroundColor: '#34a853' }}>
                  <span className="bar-label">Final</span>
                </div>
              </div>
            </div>
            <div className="rate-info">{data.rate}% ao ano garantido!</div>
          </div>
        </div>
      )
    }

    if (data.type === 'ipca') {
      return (
        <div className="inline-chart-container">
          <div className="ipca-breakdown">
            <div className="ipca-parts">
              <div className="ipca-part" style={{ backgroundColor: '#ea4335' }}>
                <span>IPCA: {data.ipcaRate}%</span>
              </div>
              <div className="plus">+</div>
              <div className="ipca-part" style={{ backgroundColor: '#4285f4' }}>
                <span>Extra: {data.rate}%</span>
              </div>
              <div className="equals">=</div>
              <div className="ipca-total" style={{ backgroundColor: '#34a853' }}>
                <span>Total: {(data.ipcaRate + data.rate).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (data.type === 'cdi') {
      return (
        <div className="inline-chart-container">
          <div className="cdi-calculation">
            <div className="cdi-formula">
              <span className="cdi-rate">{data.rate}% do CDI</span>
              <span className="times">×</span>
              <span className="current-cdi">{data.cdiRate}%</span>
              <span className="equals">=</span>
              <span className="final-rate">{((data.cdiRate * data.rate) / 100).toFixed(1)}% ao ano</span>
            </div>
          </div>
        </div>
      )
    }

    if (data.type === 'ipca-curve') {
      const maxValue = Math.max(...data.values)
      return (
        <div className="inline-chart-container">
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

  return (
    <div className="inline-chat">
      <div className="inline-messages">
        {messages.map((message) => (
          <div key={message.id} className="inline-message">
            <div className="inline-message-avatar">🤖</div>
            <div className="inline-message-content">
              <div className="inline-message-text">{message.text}</div>
              {message.hasChart && message.chartData && renderChart(message.chartData)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InlineAssetChat