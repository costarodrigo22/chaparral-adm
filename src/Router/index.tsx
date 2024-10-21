import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppLayout } from './Layouts/AppLayout';
import { AuthGuard } from './AuthGuard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Users from '@/pages/Users';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Header from '@/pages/Header';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="sections/header" element={<Header />} />
            <Route path="config/dashboard" element={<Dashboard />} />
            <Route path="config/users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
