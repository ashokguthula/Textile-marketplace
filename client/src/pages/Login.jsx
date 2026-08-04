import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";
function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await API.post(
                "/auth/login",
                formData
            );

            // Save token
            localStorage.setItem("token", data.token);

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            toast.success("Login Successful");

            // Redirect based on role
            if (data.user.role === "supplier") {

                navigate("/dashboard");

            } else {

                navigate("/buyer-dashboard");

            }
        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );
            } finally {

            setLoading(false);

        }
    };

    const [loading, setLoading] = useState(false);

    return (
        <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold text-center mb-8">
                Login
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"/>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6"/>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700">
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>
    );
}

export default Login;