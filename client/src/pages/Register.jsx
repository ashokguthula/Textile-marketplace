
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "buyer"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            return toast.error("Passwords do not match.");

        }

        try {

            setLoading(true);

            await API.post("/auth/register", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            toast.success("Registration Successful");

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold text-center mb-8">
                Register
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                >
                    <option value="buyer">Buyer</option>
                    <option value="supplier">Supplier</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

            </form>

        </div>
    );

}

export default Register;