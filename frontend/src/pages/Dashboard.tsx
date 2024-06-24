import Navbar from '../components/navbarr';


const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Dashboard</h1>
            </div>
        </div>
    );
};

export default Dashboard;
