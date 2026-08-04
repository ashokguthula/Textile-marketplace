import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyerDashboard from "./pages/BuyerDashboard";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <main className="max-w-7xl mx-auto p-6 min-h-screen">

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute
                                allowedRoles={["buyer"]}
                            >
                                <Cart />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/product/:id"
                        element={<ProductDetails />}/>

                    <Route
                        path="/add-product"
                        element={
                            <ProtectedRoute allowedRoles={["supplier"]}>
                                <AddProduct />
                            </ProtectedRoute> }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["supplier"]}>
                                <Dashboard />
                            </ProtectedRoute>}
                    />
                    <Route
                        path="/edit-product/:id"
                        element={
                            <ProtectedRoute allowedRoles={["supplier"]}>
                                <EditProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/buyer-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <BuyerDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute allowedRoles={["buyer"]}>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                    
                </Routes>
                

            </main>

            <Footer />

        </BrowserRouter>

    );

}

export default App;