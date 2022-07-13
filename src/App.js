import LoginPage from './pages/login/index';
import Home from './pages/home/index';
import { useContext } from 'react';
import { appContext } from './context/index';

function App() {
  const { user } = useContext(appContext);

  return <div className='App'>{user.email ? <Home /> : <LoginPage />}</div>;
}

export default App;
