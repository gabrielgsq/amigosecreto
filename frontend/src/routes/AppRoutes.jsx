import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import LoginForm from '../layouts/LoginForm.jsx';
import Home from '../pages/Home/Home.jsx';
import About from '../pages/About/About.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import MainLayoutBody from '../layouts/mainLayoutBody.jsx';
import CriarContaForm from '../layouts/CriarContaForm.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainLayoutBody />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="criarconta" element={<CriarContaForm />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
