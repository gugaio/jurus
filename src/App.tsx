import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import InvestmentChat from './pages/InvestmentChat'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:categoryId" element={<Category />} />
        <Route path="/chat/:investmentType" element={<InvestmentChat />} />
        <Route path="/ativo/:assetId" element={<InvestmentChat />} />
      </Routes>
    </Router>
  )
}

export default App