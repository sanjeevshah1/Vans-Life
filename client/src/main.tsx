import React from 'react'
import ReactDOM from 'react-dom/client'
import  {BrowserRouter, Routes, Route} from "react-router-dom"
import App from './App.tsx'
import "./App.css"
import './index.css'
import "./../server.js"
import Home from "./Pages/Home.tsx"
import About from "./Pages/About.tsx"
import Vans from './Pages/Vans.tsx'
import VanDetail from './Pages/VanDetail'
import Layout from './Components/Layout.tsx'
import Dashboard from './Pages/Host/Dashboard.tsx'
import Income from './Pages/Host/Income.tsx'
import Reviews from './Pages/Host/Reviews.tsx'
import HostLayout from './Pages/Host/HostLayout.tsx'
import HostVans from "./Pages/Host/HostVans"
import HostVanDetails from './Pages/Host/HostVanDetails.tsx'
import Details from './Pages/Host/Details.tsx'
import Pricing from './Pages/Host/Pricing.tsx'
import Photo from './Pages/Host/Photo.tsx'
import PageNotFound from './Pages/PageNotFound.tsx'
import Login from './Pages/Login.tsx'
import AuthRequired from './Pages/Host/AuthRequired.tsx'
import Users from './Pages/Host/Users.tsx'
import Register from './Components/Register.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route  element={<AuthRequired/>}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetails/>}>
                <Route index element={<Details />}/>
                <Route path="pricing" element={<Pricing />}/>
                <Route path="photo" element={<Photo/>}/>
              </Route>
              <Route path="reviews" element={<Reviews />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>


  </React.StrictMode>,
)
