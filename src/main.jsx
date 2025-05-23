import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import FinalResume from './FinalResume.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/final-resume" element={<FinalResume/>}/>
    </Routes>
  </BrowserRouter>
  
)
