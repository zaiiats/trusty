import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute allowedRoles={['client', 'employee']}>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
