import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppLayout } from './Layouts/AppLayout';
import { AuthGuard } from './AuthGuard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Users from '@/pages/Users';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile/inde';
import Header from '@/pages/Header';
import Institutional from '@/pages/Institutional';
import BeAPartner from '@/pages/BeAPartner';
// import Details from '@/pages/Details';
import PDVs from '@/pages/PDVs';
import Recipes from '@/pages/Recipes';
import About from '@/pages/About';
import MissionValues from '@/pages/MissionValues';
import BusinessProfile from '@/pages/BusinessProfile';
import PickupLocations from '@/pages/PickupLocations';
import Sustainability from '@/pages/Sustainability';

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
            <Route path="sections/about" element={<About />} />
            <Route path="sections/mission_values" element={<MissionValues />} />
            <Route path="sections/institutional" element={<Institutional />} />
            <Route path="sections/recipes" element={<Recipes />} />
            <Route path="sections/be-a-partner" element={<BeAPartner />} />
            <Route path="sections/PDVs" element={<PDVs />} />
            <Route
              path="sections/sustainability"
              element={<Sustainability />}
            />

            {/* Configurações da página */}
            <Route
              path="config/BusinessProfile"
              element={<BusinessProfile />}
            />
            <Route path="config/users" element={<Users />} />
            <Route
              path="config/PickupLocations"
              element={<PickupLocations />}
            />

            <Route path="config/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
