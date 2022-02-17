import React, {useContext} from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import ErrorPage from './pages/ErrorPage';
import TodosPage from './pages/TodosPage';
import AuthContext from './store/auth-context';

const App: React.FC<any> = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!authCtx.isLoggedIn && <Route path='/' element={<AuthPage />} />}
        {authCtx.isLoggedIn &&<Route path='/todos' element={<TodosPage />} />}
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </Layout>
  );
}

export default App;
