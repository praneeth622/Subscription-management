import Sidebar from "../components/navbarr";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Popup } from "@/components/component/popup";


const Dashboard: React.FC = () => {
    const { user } = useUser();
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const userEmail = user.emailAddresses[0].emailAddress;
            const userId = user.id; // Using user id as a temporary password, consider improving this

            setUserEmail(userEmail);
            setUserId(userId);

            const createUser = async (email: string, Id: string) => {
                try {
                    await axios.post('http://localhost:5000/user', {
                        email,
                        Id,
                    });
                    toast.success('User Login successfully');
                } catch (error) {
                    console.error('Error creating user:', error);
                    toast.error('Failed to create user');
                }
            };

            createUser(userEmail, userId);
        }
    }, [user]);

    return (

        <div className="flex">
            <Sidebar />
            <div className="flex-1 min-h-screen bg-gray-100 flex flex-col items-center ">
                <h1 className="text-4xl font-bold mt-5">Welcome, {user?.firstName}</h1>
                <div className="bg-customPurple p-6 rounded-lg h-[40%] w-[90%] mt-[20px]">
                  <h1> Welcome to Artistry</h1>
                   <Popup/>
                  <button 
      className="bg-buttonPurple hover:bg-darkP text-white font-bold py-2 px-4 rounded"
      onClick={() => navigate('/create')}
    >
      Click Me
    </button>


</div>

            </div>
            
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
