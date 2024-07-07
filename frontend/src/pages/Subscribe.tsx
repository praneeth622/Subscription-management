import axios from "axios";
import Sidebar from "../components/navbarr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Razorpay from "razorpay";
import { LoaderCircle } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  amount: Number;
  period: string;
  features: string[];
}

function Subscribe() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userId = user?.emailAddresses;

  const handlePayment = async (amount: Number) => {
    if (amount === 0) {
      return toast.success("Free Plan Activated");
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/payment/razorpay', {
        amount, // Ensure amount is converted to number
        userId
      });

      const { data } = res;
      console.log("data", data);

      const options = {
        key: "rzp_test_7kbetSV9IQQW2J",
        amount: data.amount,
        currency: "INR",
        name: "Subscription Management",
        description: "For testing purpose",
        order_id: data.id,
        handler: function (response: any) {
          console.log("response", response);
          const paymentResponse = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            userEmail: data.userEmail
          };
          console.log(paymentResponse);
          axios.post('http://localhost:5000/payment/razorpay/callback', paymentResponse)
            .then(res => {
              if (res.data.status === 'Payment verified successfully') {
                toast.success('Payment Successful');
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              } else {
                toast.error('Payment verification failed');
                navigate('/payment-failure');
              }
            })
            .catch(error => {
              console.error('Error verifying payment:', error);
              toast.error('Payment verification failed');
              navigate('/payment-failure');
            });
        },
        theme: {
          color: '#528FF0',
        },
      };

      //@ts-ignore
      let rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function (response: any) {
        toast.error(`Failed Error Code: ${response.error.code}`);
        toast.error(`Failed Due to: ${response.error.description}`);
        toast.error(response.error.reason);
        toast.error(response.error.metadata.order_id);
        toast.error(response.error.metadata.payment_id);
        setTimeout(() => {
          navigate('/payment-failure');
        }, 10000);
      });
    } catch (error) {
      console.error('Error initiating payment at frontend:', error);
      toast.error('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  const pricingPlans: PricingPlan[] = [
    {
      title: "Starter",
      description: "Best option for personal use & for your next project.",
      price: "Free",
      amount: 0,
      period: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 1 developer",
        "Premium support: 6 months",
        "Free updates: 6 months",
      ],
    },
    {
      title: "Basic",
      description: "Relevant for multiple users, extended & premium support.",
      price: "10",
      amount: 10,
      period: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 10 developers",
        "Premium support: 24 months",
        "Free updates: 24 months",
      ],
    },
    {
      title: "Enterprise",
      description:
        "Best for large scale uses and extended redistribution rights.",
      price: "50",
      amount: 50,
      period: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        `Team size: 100+ developers`,
        "Premium support: 36 months",
        "Free updates: 36 months",
      ],
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <section className="bg-white">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="space-y-8 md:grid md:grid-cols-3 md:gap-12 md:space-y-0">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8"
                >
                  <h3 className="mb-4 text-2xl font-semibold">
                    {plan.title}
                  </h3>
                  <p className="font-light text-gray-500 sm:text-lg">
                    {plan.description}
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handlePayment(plan.amount)}
                    disabled={loading}
                  >
                    {loading ? (
                      <LoaderCircle size={20} color={"#ffffff"} />
                    ) : (
                      "Get started"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Subscribe;
