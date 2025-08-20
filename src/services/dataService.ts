import { Asset, Category } from '../types'

const categories: Category[] = [
  { id: 'tesouro-direto', name: 'Tesouro Direto' },
  { id: 'cdb', name: 'CDB' },
  { id: 'lca', name: 'LCA' },
  { id: 'lci', name: 'LCI' },
  { id: 'cra', name: 'CRA' },
  { id: 'cri', name: 'CRI' },
  { id: 'debentures', name: 'Debêntures' },
  { id: 'lc', name: 'LC' }
]

const CDI_RATE = 11.75 // Taxa CDI mock
const IPCA_RATE = 4.0 // Taxa IPCA mock

const assetsByCategory: Record<string, Asset[]> = {
  'tesouro-direto': [
    // Pré-fixados (ordem crescente de prazo/taxa)
    {
      id: '1',
      broker: 'Banco do Brasil',
      issuer: 'Tesouro Nacional',
      rate: 11.5,
      maturity: '1 ano',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '2',
      broker: 'Santander',
      issuer: 'Tesouro Nacional',
      rate: 11.8,
      maturity: '1 ano',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '3',
      broker: 'Itaú',
      issuer: 'Tesouro Nacional',
      rate: 12.1,
      maturity: '2 anos',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '4',
      broker: 'Bradesco',
      issuer: 'Tesouro Nacional',
      rate: 12.4,
      maturity: '3 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '5',
      broker: 'BTG Pactual',
      issuer: 'Tesouro Nacional',
      rate: 12.7,
      maturity: '4 anos',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '6',
      broker: 'XP',
      issuer: 'Tesouro Nacional',
      rate: 13.0,
      maturity: '5 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '7',
      broker: 'Rico',
      issuer: 'Tesouro Nacional',
      rate: 13.3,
      maturity: '6 anos',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '8',
      broker: 'Clear',
      issuer: 'Tesouro Nacional',
      rate: 13.6,
      maturity: '7 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '9',
      broker: 'C6 Bank',
      issuer: 'Tesouro Nacional',
      rate: 13.9,
      maturity: '8 anos',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '10',
      broker: 'Inter',
      issuer: 'Tesouro Nacional',
      rate: 14.2,
      maturity: '10 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    // IPCA+ (ordem crescente de prazo/taxa extra)
    {
      id: '11',
      broker: 'Banco do Brasil',
      issuer: 'Tesouro Nacional',
      rate: 4.8,
      maturity: '2 anos',
      hasLiquidity: true,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '12',
      broker: 'Itaú',
      issuer: 'Tesouro Nacional',
      rate: 5.2,
      maturity: '3 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '13',
      broker: 'Bradesco',
      issuer: 'Tesouro Nacional',
      rate: 5.6,
      maturity: '4 anos',
      hasLiquidity: true,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '14',
      broker: 'Santander',
      issuer: 'Tesouro Nacional',
      rate: 6.0,
      maturity: '5 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '15',
      broker: 'BTG Pactual',
      issuer: 'Tesouro Nacional',
      rate: 6.4,
      maturity: '6 anos',
      hasLiquidity: true,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '16',
      broker: 'XP',
      issuer: 'Tesouro Nacional',
      rate: 6.8,
      maturity: '7 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '17',
      broker: 'Rico',
      issuer: 'Tesouro Nacional',
      rate: 7.2,
      maturity: '8 anos',
      hasLiquidity: true,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '18',
      broker: 'Clear',
      issuer: 'Tesouro Nacional',
      rate: 7.6,
      maturity: '9 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '19',
      broker: 'C6 Bank',
      issuer: 'Tesouro Nacional',
      rate: 8.0,
      maturity: '10 anos',
      hasLiquidity: true,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '20',
      broker: 'Inter',
      issuer: 'Tesouro Nacional',
      rate: 8.4,
      maturity: '10 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    }
  ],
  'cdb': [
    // Pré-fixados (≤2 anos = com liquidez, >2 anos = sem liquidez)
    {
      id: '21',
      broker: 'Banco do Brasil',
      issuer: 'Banco do Brasil',
      rate: 13.2,
      maturity: '6 meses',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '22',
      broker: 'Itaú',
      issuer: 'Itaú Unibanco',
      rate: 13.5,
      maturity: '1 ano',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '23',
      broker: 'Warren',
      issuer: 'Banco Daycoval',
      rate: 13.6,
      maturity: '18 meses',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '24',
      broker: 'Clear',
      issuer: 'Banco Inter',
      rate: 13.7,
      maturity: '2 anos',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '25',
      broker: 'Bradesco',
      issuer: 'Banco Bradesco',
      rate: 13.8,
      maturity: '3 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '26',
      broker: 'XP',
      issuer: 'Banco Pan',
      rate: 13.9,
      maturity: '4 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '27',
      broker: 'C6 Bank',
      issuer: 'C6 Bank',
      rate: 14.0,
      maturity: '5 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '28',
      broker: 'Santander',
      issuer: 'Banco Santander',
      rate: 14.1,
      maturity: '6 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '29',
      broker: 'Rico',
      issuer: 'Banco Original',
      rate: 14.2,
      maturity: '7 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '30',
      broker: 'BTG Pactual',
      issuer: 'BTG Pactual',
      rate: 14.5,
      maturity: '10 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    // IPCA+ (≤2 anos = com liquidez, >2 anos = sem liquidez)
    {
      id: '31',
      broker: 'C6 Bank',
      issuer: 'C6 Bank',
      rate: 4.7,
      maturity: '2 anos',
      hasLiquidity: true,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '32',
      broker: 'Banco do Brasil',
      issuer: 'Banco do Brasil',
      rate: 4.8,
      maturity: '3 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '33',
      broker: 'BTG Pactual',
      issuer: 'BTG Pactual',
      rate: 4.9,
      maturity: '4 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '34',
      broker: 'Bradesco',
      issuer: 'Banco Bradesco',
      rate: 5.0,
      maturity: '5 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '35',
      broker: 'Rico',
      issuer: 'Banco Original',
      rate: 5.1,
      maturity: '6 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '36',
      broker: 'Itaú',
      issuer: 'Itaú Unibanco',
      rate: 5.2,
      maturity: '7 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '37',
      broker: 'XP',
      issuer: 'Banco Pan',
      rate: 5.3,
      maturity: '8 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '38',
      broker: 'Clear',
      issuer: 'Banco Inter',
      rate: 5.4,
      maturity: '9 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '39',
      broker: 'Santander',
      issuer: 'Banco Santander',
      rate: 5.5,
      maturity: '10 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    {
      id: '40',
      broker: 'Warren',
      issuer: 'Banco Daycoval',
      rate: 5.6,
      maturity: '12 anos',
      hasLiquidity: false,
      type: 'ipca',
      ipcaRate: IPCA_RATE
    },
    // % CDI (ordem crescente de prazo/percentual)
    {
      id: '41',
      broker: 'Banco do Brasil',
      issuer: 'Banco do Brasil',
      rate: 95,
      maturity: '3 meses',
      hasLiquidity: true,
      type: 'cdi',
      cdiPercentage: 95
    },
    {
      id: '42',
      broker: 'Itaú',
      issuer: 'Itaú Unibanco',
      rate: 98,
      maturity: '6 meses',
      hasLiquidity: true,
      type: 'cdi',
      cdiPercentage: 98
    },
    {
      id: '43',
      broker: 'Bradesco',
      issuer: 'Banco Bradesco',
      rate: 102,
      maturity: '1 ano',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 102
    },
    {
      id: '44',
      broker: 'Santander',
      issuer: 'Banco Santander',
      rate: 105,
      maturity: '18 meses',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 105
    },
    {
      id: '45',
      broker: 'BTG Pactual',
      issuer: 'BTG Pactual',
      rate: 108,
      maturity: '2 anos',
      hasLiquidity: true,
      type: 'cdi',
      cdiPercentage: 108
    },
    {
      id: '46',
      broker: 'XP',
      issuer: 'Banco Pan',
      rate: 112,
      maturity: '3 anos',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 112
    },
    {
      id: '47',
      broker: 'Rico',
      issuer: 'Banco Original',
      rate: 115,
      maturity: '4 anos',
      hasLiquidity: true,
      type: 'cdi',
      cdiPercentage: 115
    },
    {
      id: '48',
      broker: 'Clear',
      issuer: 'Banco Inter',
      rate: 118,
      maturity: '5 anos',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 118
    },
    {
      id: '49',
      broker: 'C6 Bank',
      issuer: 'C6 Bank',
      rate: 122,
      maturity: '6 anos',
      hasLiquidity: true,
      type: 'cdi',
      cdiPercentage: 122
    },
    {
      id: '50',
      broker: 'Warren',
      issuer: 'Banco Daycoval',
      rate: 125,
      maturity: '7 anos',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 125
    }
  ],
  'lca': [
    {
      id: '9',
      broker: 'BTG Pactual',
      issuer: 'BTG Pactual',
      rate: 11.5,
      maturity: '2 anos',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '10',
      broker: 'XP',
      issuer: 'Banco Inter',
      rate: 100,
      maturity: '3 anos',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 100
    }
  ],
  'lci': [
    {
      id: '11',
      broker: 'Rico',
      issuer: 'Banco Original',
      rate: 11.8,
      maturity: '18 meses',
      hasLiquidity: false,
      type: 'fixed'
    },
    {
      id: '12',
      broker: 'Clear',
      issuer: 'Banco Pan',
      rate: 95,
      maturity: '2 anos',
      hasLiquidity: false,
      type: 'cdi',
      cdiPercentage: 95
    }
  ],
  'cra': [
    {
      id: '13',
      broker: 'Toro',
      issuer: 'Securitizadora Trust',
      rate: 13.8,
      maturity: '4 anos',
      hasLiquidity: false,
      type: 'fixed'
    }
  ],
  'cri': [
    {
      id: '14',
      broker: 'Modalmais',
      issuer: 'True Sec',
      rate: 14.2,
      maturity: '7 anos',
      hasLiquidity: false,
      type: 'fixed'
    }
  ],
  'debentures': [
    {
      id: '15',
      broker: 'Warren',
      issuer: 'Petrobras',
      rate: 13.0,
      maturity: '2028',
      hasLiquidity: true,
      type: 'fixed'
    },
    {
      id: '16',
      broker: 'Ágora',
      issuer: 'Vale',
      rate: 12.7,
      maturity: '2030',
      hasLiquidity: false,
      type: 'fixed'
    }
  ],
  'lc': [
    {
      id: '17',
      broker: 'C6 Bank',
      issuer: 'C6 Bank',
      rate: 12.1,
      maturity: '1 ano',
      hasLiquidity: true,
      type: 'fixed'
    }
  ]
}

export const getCategories = (): Category[] => {
  return categories
}

export const getAssetsByCategory = (categoryId: string): Asset[] => {
  return assetsByCategory[categoryId] || []
}

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(cat => cat.id === categoryId)
}

export const getCdiRate = (): number => {
  return CDI_RATE
}

export const getIpcaRate = (): number => {
  return IPCA_RATE
}

export const getAssetById = (assetId: string): Asset | undefined => {
  for (const categoryAssets of Object.values(assetsByCategory)) {
    const asset = categoryAssets.find(asset => asset.id === assetId)
    if (asset) return asset
  }
  return undefined
}