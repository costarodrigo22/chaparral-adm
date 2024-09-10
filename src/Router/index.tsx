import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppLayout } from './Layouts/AppLayout';
import { AuthGuard } from './AuthGuard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<h1>dashboard</h1>} />
            <Route path="/tela" element={<h1>tela 2</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
