import './App.css';
import Router from './router/Router'
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  return <Router authProvider={auth} />

}

export default App;
