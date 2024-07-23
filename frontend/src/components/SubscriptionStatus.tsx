import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

const SubscriptionStatus = () => {
  const navigate = useNavigate();

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
    <div className=" mx-1 px-1 ">
      {/* <h2 className="text-xl font-bold">Subscription Status</h2> */}
      {subscriptionStatus ? (
        <div onClick={()=>{
          toast.warning("You already Subscribed")
        }} className="text-green-600 cursor-pointer">You are subscribed!</div>
      ) : (
        <div className="mt-auto ">
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full" onClick={() => navigate('/subscribe')}>
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
      )}
        {/* <a href='/subscribe' className="text-red-600">You are not subscribed.</a> */}
        </div>
  );
};

export default SubscriptionStatus;
