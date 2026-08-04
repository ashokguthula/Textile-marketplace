function BuyerDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-4">
                Buyer Dashboard
            </h1>

            <p className="text-gray-600">
                Welcome,
                <span className="font-semibold">
                    {" "}{user?.fullName}
                </span>
            </p>

            <div className="mt-10 bg-white shadow rounded-xl p-6">

                <h2 className="text-2xl font-semibold">
                    Your Account
                </h2>

                <p className="mt-4">
                    Name: {user?.fullName}
                </p>

                <p>
                    Email: {user?.email}
                </p>

                <p>
                    Role: {user?.role}
                </p>

            </div>

        </div>

    );

}

export default BuyerDashboard;