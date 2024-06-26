import Navbar from '../components/navbarr';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useUser();
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

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
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Dashboard</h1>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Dashboard;
