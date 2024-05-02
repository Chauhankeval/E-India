import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  json,
} from "react-router-dom";
import Home from "./pages/home/Home";

import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashbord/DashBord";
import NoPage from "./pages/nopages/Nopages";
import MyState from "./context/data/MyState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllProduct from "./pages/AllProduct/AllProduct";
import Order from "./pages/order/Order"

function App() {
  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/cart" element={<Cart />} />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteForAdmin>
                  <Dashboard />
                </ProtectedRouteForAdmin>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route
              path="/addproduct"
              element={
                <ProtectedRouteForAdmin>
                  <AddProduct />
                </ProtectedRouteForAdmin>
              }
            />
            <Route
              path="/updateproduct"
              element={
                <ProtectedRouteForAdmin>
                  <UpdateProduct />
                </ProtectedRouteForAdmin>
              }
            />
            <Route path="/allproducts" element={<AllProduct />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// admin

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin.user.email === "kevalachauhan2017@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
