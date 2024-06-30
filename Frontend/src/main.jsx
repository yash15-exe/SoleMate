import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { persistor, store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Admin from "./pages/Admin";
import LoginPage from "./pages/LoginPage";
import ProductDisplay from "./pages/ProductDisplay";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import CheckoutPage from "../src/pages/CheckoutPage";
import SuccessPage from "./components/SuccessPage";
import FailurePage from "./components/FailurePage";
import AllProducts from "./components/adminComponents/AllProducts";
import Analytics from "./components/adminComponents/Analytics";
import UserOrders from "./components/UserOrders";
import UserProfile from "./components/UserProfile";
import AddProductForm from "./components/adminComponents/AddProducts";
import AllOrders from "./components/adminComponents/AllOrders";
import CancelledOrders from "./components/adminComponents/CancelledOrders";
import CancellationRequests from "./components/adminComponents/CancellationRequests";
import Feedback from "./components/adminComponents/ComplaintsAdmin";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/orders/success" element={<SuccessPage />} />
        <Route path="/orders/failure" element={<FailurePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/userOrders" element={<UserOrders />} />
        <Route path="/contactUs" element={<ContactUsPage/>} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route
          path="/products/search/:searchTerm"
          element={<ProductDisplay />}
        />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route path="/admin/products/allProducts" element={<AllProducts />} />
        <Route path="/admin/products/addProducts" element={<AddProductForm />} />
        <Route path="/admin/orders/allOrders" element={<AllOrders />} />
        <Route path="/admin/orders/cancelledOrders" element={<CancelledOrders />} />
        <Route path="/admin/cancellationRequests" element={<CancellationRequests />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/feedback" element={<Feedback />} />
        
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
