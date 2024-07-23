import Sidebar from "../components/navbarr";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Popup } from "@/components/component/popup";
import { getStarted } from "@/components/component/get-started";


const Dashboard: React.FC = () => {
    const { user } = useUser();
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
          const userEmail = user.emailAddresses[0].emailAddress;
          const userId = user.id; // Using user id as a temporary password
    
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
                   <Popup/>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
