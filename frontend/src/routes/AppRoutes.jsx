import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import LoginForm from '../layouts/LoginForm.jsx';
import Home from '../pages/Home/Home.jsx';
import About from '../pages/About/About.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import MainLayoutBody from '../layouts/MainLayoutBody.jsx';
import CriarContaForm from '../layouts/CriarContaForm.jsx';
import CriarGrupo from '../components/CriarGrupo.jsx';
import MeusGrupos from '../components/MeusGrupos.jsx';
import AlterarSenha from '../components/AlterarSenha.jsx';
import ExcluirConta from '../components/ExcluirConta.jsx';
import Convite from '../components/Convite.jsx';
import ParticiparOk from '../components/ParticiparOk.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainLayoutBody />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="criarconta" element={<CriarContaForm />} />
          <Route path="convite/:id" element={<Convite />} />
          <Route path="confirmado" element={<ParticiparOk />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path='/home' element={<Home />}>
          <Route index element={<CriarGrupo />} />
          <Route path='meusgrupos' element={<MeusGrupos />} />
          <Route path='alterarsenha' element={<AlterarSenha />} />
          <Route path='excluirconta' element={<ExcluirConta />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
