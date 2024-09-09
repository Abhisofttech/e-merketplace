import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ForgetResetPassword from './pages/ForgetResetPassword.jsx';
import Admindashboard from './pages/Admindashboard.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import BuyerDashboard from './pages/BuyerDashboard.jsx';
import CreateProduct from './components/CreateProduct.jsx';
import UpdateProduct from './components/UpdateProduct.jsx';
import DeleteProduct from './components/DeleteProduct.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import AllProducts from './components/AllProducts.jsx';
import BuyerCart from './pages/BuyerCart.jsx';
import ChangeAddress from './pages/ChangeAddress .jsx';
import UserProfile from './pages/UserProfile.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import SellerOrders from './pages/SellerOrders.jsx';
import SalesAnalytics from './components/AdminDashboard/SalesAnalytics.jsx';
import UserBehaviorAnalytics from './components/AdminDashboard/UserBehaviorAnalytics.jsx';
import CustomReports from './components/AdminDashboard/CustomReports.jsx';
import InventoryManagement from './components/AdminDashboard/InventoryManagement.jsx';
import AdminHome from './pages/AdminHome.jsx';
import SellerHome from './pages/SellerHome.jsx';

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forget-reset-password/:token" element={<ForgetResetPassword />} />
        <Route path="/admin-dashboard/*" element={<Admindashboard />} >

          <Route path="" element={<AdminHome />} />
          <Route path="reset-password/" element={<ResetPassword />} />
          <Route path="change-address" element={<ChangeAddress />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="sales-analytics" element={<SalesAnalytics />} />
          <Route path="user-behaviour" element={<UserBehaviorAnalytics />} />
          <Route path="custom-reports" element={<CustomReports />} />
          <Route path="inventry" element={<InventoryManagement />} />
        </Route>
        <Route path="/seller-dashboard/*" element={<SellerDashboard />} >
          <Route path="" element={<SellerHome />} />
          <Route path="show-product" element={<ShowProduct  />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="delete-product" element={<DeleteProduct />} />
          <Route path="reset-password/" element={<ResetPassword />} />
          <Route path="change-address" element={<ChangeAddress />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<SellerOrders />} />
        </Route>
        <Route path="/buyer-dashboard/*" element={<BuyerDashboard />} >
          <Route path="" element={<AllProducts />} />
          <Route path="cart" element={<BuyerCart />} />
          <Route path="change-address" element={<ChangeAddress />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="place-order" element={<PlaceOrder />} />
          <Route path="payment/order-confirmation" element={<OrderSuccess />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


