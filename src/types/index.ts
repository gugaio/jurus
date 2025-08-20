export type AssetType = 'fixed' | 'ipca' | 'cdi'

export interface Asset {
  id: string
  broker: string
  issuer: string
  rate: number
  maturity: string
  hasLiquidity: boolean
  type: AssetType
  ipcaRate?: number // Para tipo IPCA
  cdiPercentage?: number // Para tipo CDI
}

export interface Category {
  id: string
  name: string
}