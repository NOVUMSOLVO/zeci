import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersonaProvider } from './PersonaContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Orders from './pages/Orders';
import CRM from './pages/CRM';
import Payments from './pages/Payments';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import PaymentDemoRoutes from './pages/PaymentDemo';

function App() {
  return (
    <PersonaProvider>
      <Router>
        <Routes>
          {/* Demo routes (outside of main layout) */}
          <Route path="/demo/*" element={<PaymentDemoRoutes />} />
          
          {/* Main application routes */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/store" element={<Store />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/crm" element={<CRM />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          } />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </PersonaProvider>
  );
}

export default App;