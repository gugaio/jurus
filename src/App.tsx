import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import InvestmentChat from './pages/InvestmentChat'
import GuganInsights from './pages/GuganInsights'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:categoryId" element={<Category />} />
        <Route path="/chat/:investmentType" element={<InvestmentChat />} />
        <Route path="/guga-insights" element={<GuganInsights />} />
      </Routes>
    </Router>
  )
}

export default App