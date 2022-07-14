import LoginPage from './pages/login/index';
import Home from './pages/home/index';
import { useContext } from 'react';
import { appContext } from './context/index';

function App() {
  const { user, loggedIn } = useContext(appContext);

  return (
    <div className='App'>
      {user.email && loggedIn ? <Home /> : <LoginPage />}
    </div>
  );
}

export default App;
