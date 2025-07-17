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
import { CategoryProvider } from './context/CategoryContext';
import { DashboardProvider } from './context/DashboardContext';
import { OrderProvider } from './context/OrderContext';
import { SettingsProvider } from './context/SettingsContext';
import { QuoteProvider } from './context/QuoteContext';
import OrderManagement from './pages/OrderManagement';
import UserManagement from './pages/UserManagement';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import RoleManagement from './pages/RoleManagement';
import ClientManagement from './pages/ClientManagement';
import AddClient from './pages/AddClient';
import ClientProfile from './pages/ClientProfile';
import ProductManagement from './pages/ProductManagement';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import CategoryManagement from './pages/CategoryManagement';
import ProductPreview from './pages/ProductPreview';
import QuoteManagement from './pages/QuoteManagement';
import Finance from './pages/Finance';
import FinancialDashboard from './pages/FinancialDashboard';
import RevenueManagement from './pages/RevenueManagement';
import ExpenseManagement from './pages/ExpenseManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import FinancialReports from './pages/FinancialReports';
import FinancialSettings from './pages/FinancialSettings';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CategoryProvider>
          <DashboardProvider>
            <OrderProvider>
              <QuoteProvider>
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
                            <Route path="/admin/utilisateurs/:id" element={<EditUser />} />
                            <Route path="/admin/roles" element={<RoleManagement />} />
                            <Route path="/admin/clients" element={<ClientManagement />} />
                            <Route path="/admin/clients/ajouter" element={<AddClient />} />
                            <Route path="/admin/clients/:id/fiche" element={<ClientProfile />} />
                            <Route path="/admin/clients/:id/editer" element={<AddClient />} />
                            <Route path="/admin/produits" element={<ProductManagement />} />
                            <Route path="/admin/produits/ajouter" element={<AddProduct />} />
                            <Route path="/admin/produits/:id/editer" element={<EditProduct />} />
                            <Route path="/admin/produits/:id/preview" element={<ProductPreview />} />
                            <Route path="/admin/categories" element={<CategoryManagement />} />
                            <Route path="/admin/devis" element={<QuoteManagement />} />
                            <Route path="/admin/factures" element={<InvoiceManagement />} />
                            <Route path="/finance" element={<Finance />} />
                            <Route path="/finance/dashboard" element={<FinancialDashboard />} />
                            <Route path="/finance/revenus" element={<RevenueManagement />} />
                            <Route path="/finance/depenses" element={<ExpenseManagement />} />
                            <Route path="/finance/factures" element={<InvoiceManagement />} />
                            <Route path="/finance/rapports" element={<FinancialReports />} />
                            <Route path="/finance/parametres" element={<FinancialSettings />} />
                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    </Router>
                  </ManagementProvider>
                </CartProvider>
              </QuoteProvider>
            </OrderProvider>
          </DashboardProvider>
        </CategoryProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;