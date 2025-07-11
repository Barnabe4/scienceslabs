import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Training from './pages/Training';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Management from './pages/Management';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ManagementProvider } from './context/ManagementContext';
import { DashboardProvider } from './context/DashboardContext';
import { OrderProvider } from './context/OrderContext';
import { SettingsProvider } from './context/SettingsContext';
import OrderManagement from './pages/OrderManagement';
import UserManagement from './pages/UserManagement';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import RoleManagement from './pages/RoleManagement';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <DashboardProvider>
          <OrderProvider>
            <CartProvider>
              <ManagementProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/boutique" element={<Shop />} />
                        <Route path="/produit/:id" element={<ProductDetail />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/formations" element={<Training />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/panier" element={<Cart />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/gestion" element={<Management />} />
                        <Route path="/gestion-commandes" element={<OrderManagement />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin/utilisateurs" element={<UserManagement />} />
                        <Route path="/admin/utilisateurs/ajouter" element={<AddUser />} />
                        <Route path="/admin/utilisateurs/:id/editer" element={<EditUser />} />
                        <Route path="/admin/roles" element={<RoleManagement />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </Router>
              </ManagementProvider>
            </CartProvider>
          </OrderProvider>
        </DashboardProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;