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
                        path="/product/:id"
                        element={<ProductDetails />}/>

                    <Route
                        path="/add-product"
                        element={<AddProduct />}/>

                    <Route
                      path="/dashboard"
                      element={<Dashboard />}/>

                    <Route
                      path="/edit-product/:id"
                      element={<EditProduct />}/>

                </Routes>
                

            </main>

            <Footer />

        </BrowserRouter>

    );

}

export default App;