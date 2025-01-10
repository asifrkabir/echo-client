/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreatePayment, useCreatePaymentIntent } from "@/hooks/payment.hook";
import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { IPayment } from "@/types";
import httpStatus from "http-status";
import { toast } from "sonner";
import { useUser } from "@/context/user.provider";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  postId: string;
  onPaymentSuccess: () => void;
}

const CheckoutForm = ({ postId, onPaymentSuccess }: IProps) => {
  const queryClient = useQueryClient();
  const { mutate: createPaymentIntent } = useCreatePaymentIntent();
  const { mutate: createPayment } = useCreatePayment();
  const { user } = useUser();

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const handleCreatePaymentIntent = async () => {
      setLoading(true);
      const paymentIntentData = { amount: 100 };

      createPaymentIntent(paymentIntentData, {
        onSuccess: (res) => {
          setClientSecret(res.data.clientSecret);
          setLoading(false);
        },
        onError: (error) => {
          toast.error(error.message || "Payment failed. Please try again.");
          setLoading(false);
        },
      });
    };

    handleCreatePaymentIntent();
  }, [createPaymentIntent]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Processing...");

    if (!stripe || !elements) {
      toast.error("An unexpected error occurred. Please try again later", {
        id: toastId,
        duration: 2000,
      });
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      toast.error("An unexpected error occurred. Please try again later", {
        id: toastId,
        duration: 2000,
      });
      setLoading(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[error]", error);
      toast.error(error.message, { id: toastId, duration: 2000 });
      setLoading(false);
      return;
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      console.log("Confirm Error: ", confirmError);
      toast.error(confirmError.message, { id: toastId, duration: 2000 });
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentData: IPayment = {
          post: postId,
          amount: 100,
        };

        createPayment(paymentData, {
          onSuccess: (res) => {
            if (res.statusCode === httpStatus.CREATED) {
              toast.success("Payment successful", {
                id: toastId,
                duration: 2000,
              });
              queryClient.invalidateQueries({
                queryKey: ["ALL_POSTS_NEWSFEED"],
              });
              onPaymentSuccess();
            } else {
              toast.error(res.message);
            }
          },
          onError: (error) => {
            toast.error(error.message || "Payment failed. Please try again.");
          },
        });
      }
    }

    setLoading(false);
  };

  return (
    <Card className="w-full mx-auto p-6 rounded-lg shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold text-center mb-4">
          Complete Your Payment
        </h3>
        <h5 className="text-lg text-blue-600 text-center mb-4">
          Amount to Pay: Tk. 100
        </h5>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 font-medium">Card Details</label>
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              disabled={!stripe || !clientSecret || loading}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  <CreditCard className="mr-2" />
                  Pay Now
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            Your payment is secure and encrypted.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
