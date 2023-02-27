import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './router/Router';
import useAuth from './hooks/useAuth';

function App() {
  const auth = useAuth();

  return <Router authProvider={auth} />;
}

export default App;
