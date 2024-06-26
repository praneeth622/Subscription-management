import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SubscriptionStatus = () => {
  // Mock subscription status
  const isSubscribed = false; 
  const [subscriptionStatus,setSubscriptionStatus] = useState(null)
  const {user} = useUser();
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        try {
          const email = user.emailAddresses[0].emailAddress;
          // console.log(email)
          const response = await axios.post('http://localhost:5000/user/subscription', {
            email
          });;
          setSubscriptionStatus(response.data.subscriptionStatus);
        } catch (error) {
          console.error('Error fetching subscription status:', error);
        }
      }
    };
    fetchSubscriptionStatus();
  }, [user]);

  return (
    <div className=" mx-3 px-3 ">
      {/* <h2 className="text-xl font-bold">Subscription Status</h2> */}
      {subscriptionStatus ? (
        <div onClick={()=>{
          toast.warning("You already Subscribed")
        }} className="text-green-600 cursor-pointer">You are subscribed!</div>
      ) : (
        <a href='/subscribe' className="text-red-600">You are not subscribed.</a>
      )}
    </div>
  );
};

export default SubscriptionStatus;
