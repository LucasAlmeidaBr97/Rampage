import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './Css/index.css';


//Paginas
import HomeBackOffice from './Pages/backoffice/HomeBackOffice';
import LoginBackOffice from './Pages/backoffice/LoginBackoffice/LoginBackOffice';
import ProductTable from './Pages/backoffice/ProductTable';
import UsersList from './Pages/backoffice/internalUser/UsersList';
import Cart from './Pages/site/Cart/Cart';
import OrderSummary from './Pages/site/Checkout/OrderSummary/OrderSummary';
import Payment from './Pages/site/Checkout/Payment/Payment';
import SelectAddress from './Pages/site/Checkout/SelectAddress/SelectAddress';
import ConsumerRegister from './Pages/site/ConsumerRegister';
import LandingPage from './Pages/site/LandingPage';
import ProductDetails from './Pages/site/Product-Details/ProductDetails';
import UserConsumerLogin from './Pages/site/UserConsumerLogin';
import RegisterAddress from './Pages/site/Checkout/RegisterAddress/RegisterAddress';
import RegisteredOrder from './Pages/site/Checkout/RegisteredOrder/RegisteredOrder';
import OrderList from './Pages/site/OrderList/OrderList';
import MyAccount from './Pages/site/MyAccount/MyAccount';
import EditProduct from './Pages/backoffice/EditProduct';
import ProtectedRoute from './Infra/ProtectedRoute';
import OrderDetails from './Pages/site/OrderDetails/OrderDetails';
import BackOfficeOrderList from './Pages/backoffice/BackOfficeOrderList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
            <Route path="/"                           element={<LoginBackOffice     />} />
            <Route path="/back-home"                  element={<ProtectedRoute      allowedRoles={["ADMIN", "STOKIST"]}><HomeBackOffice/>         </ProtectedRoute>} />
            <Route path="/back-users-list"            element={<ProtectedRoute      allowedRoles={["ADMIN", "STOKIST"]}><UsersList/>              </ProtectedRoute>} />
            <Route path="/back-order-list"            element={<ProtectedRoute      allowedRoles={["ADMIN", "STOKIST"]}><BackOfficeOrderList/>    </ProtectedRoute>} />
            <Route path="/back-product-list"          element={<ProtectedRoute      allowedRoles={["ADMIN", "STOKIST"]}><ProductTable/>           </ProtectedRoute>} />
            <Route path="/back-product-edit"          element={<ProtectedRoute      allowedRoles={["ADMIN", "STOKIST"]}><EditProduct/>            </ProtectedRoute>} />
            <Route path="/user-cadastrar"             element={<ConsumerRegister    />} />
            <Route path="/login_consumer"             element={<UserConsumerLogin   />} />
            <Route path="/pagina-principal"           element={<LandingPage         />} />
            <Route path="/product-detail"             element={<ProductDetails      />} />
            <Route path="/cart"       	              element={<Cart                />} />
            <Route path="/checkout/select-address"    element={<ProtectedRoute      allowedRoles={["CONSUMER"]} checkout={true}><SelectAddress/>    </ProtectedRoute>} />
            <Route path="/checkout/register-address"  element={<ProtectedRoute      allowedRoles={["CONSUMER"]} checkout={true}><RegisterAddress/>  </ProtectedRoute>} />
            <Route path="/checkout/payment"           element={<ProtectedRoute      allowedRoles={["CONSUMER"]} checkout={true}><Payment/>          </ProtectedRoute>} />
            <Route path="/order-summary"              element={<ProtectedRoute      allowedRoles={["CONSUMER"]} checkout={true}><OrderSummary/>     </ProtectedRoute>} />
            <Route path="/checkout/login"             element={<UserConsumerLogin   />} />
            <Route path="/registered-order"   	      element={<ProtectedRoute      allowedRoles={["CONSUMER"]}><RegisteredOrder/>  </ProtectedRoute>} />
            <Route path="/my-orders"   	              element={<ProtectedRoute      allowedRoles={["CONSUMER"]}><OrderList/>        </ProtectedRoute>} />
            <Route path="/order-details"   	          element={<ProtectedRoute      allowedRoles={["CONSUMER"]}><OrderDetails/>     </ProtectedRoute>} />
            <Route path="/my-account"   	            element={<ProtectedRoute      allowedRoles={["CONSUMER"]}><MyAccount/>        </ProtectedRoute>} />
            </Routes>
      </Router>
  </React.StrictMode>
);
