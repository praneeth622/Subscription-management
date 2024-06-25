import axios from "axios";
import { useState } from "react";
import Navbar from "../components/navbarr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Razorpay from "razorpay";

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
}

function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentId,setPaymentId] = useState('')

  const handlePayment = async (amount: number) => {
    try {
      const response = await axios.post('http://localhost:5000/payment/razorpay', {
        amount, // Ensure amount is converted to number
      });

      const { data } = response;
      const options = {
        key: "rzp_test_zgAAsQPNkntJ1P",
        key_secret: "Qhj1owYbcPBUWhAgBP8MIgnc",
        amount: data.amount*100,
        currency: "INR",
        order_receipt: 'order_rcptid_' + data.name,
        name: "Subscribtion managment",
        description: "for testing purpose",
        handler: function (response: any) {
          toast.success('Payment Successful');
          setPaymentId(response.razorpay_payment_id)
        },
        theme: {
          color: '#528FF0',
        },
      };

      let rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Error initiating payment at frontend: ', error);
      toast.error('Failed to initiate payment');
    }
  };

  const pricingPlans: PricingPlan[] = [
    {
      title: "Starter",
      description: "Best option for personal use & for your next project.",
      price: "Free",
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
      period: "/month",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 100+ developers",
        "Premium support: 36 months",
        "Free updates: 36 months",
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="App">
        <section className="bg-white ">
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
                    onClick={() => handlePayment(parseInt(plan.price))}
                  >
                    Get started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default Subscribe;
