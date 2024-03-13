import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Family from './components/family'
import Footer from './components/footer'
import Header from './components/header'
import UserList from './components/user/UserList'

function App() {
  return (
    <>
     
      <BrowserRouter> 
      <Header />
        <Routes>
          <Route path="/" element={<Family />} />
          <Route path="/user" element={<UserList />} />
        </Routes>
        <Footer />
        </BrowserRouter>
        <Family />
     </> 
  )
}
export default App
