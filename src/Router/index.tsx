import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppLayout } from './Layouts/AppLayout';
import { AuthGuard } from './AuthGuard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Users from '@/pages/Users';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile/inde';
import Header from '@/pages/Header';
import Institutional from '@/pages/Institutional';
import BeAPartner from '@/pages/BeAPartner';
// import Details from '@/pages/Details';
import PDVs from '@/pages/PDVs';

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

            {/* Seções da página */}
            <Route path="sections/header" element={<Header />} />
            {/* <Route path="sections/details" element={<Details />} /> */}
            <Route path="sections/products" element={<Header />} />
            <Route path="sections/institutional" element={<Institutional />} />
            <Route path="sections/recipes" element={<Header />} />
            <Route path="sections/be-a-partner" element={<BeAPartner />} />
            <Route path="sections/PDVs" element={<PDVs />} />

            <Route path="config/dashboard" element={<Dashboard />} />
            <Route path="config/users" element={<Users />} />
            <Route path="config/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
