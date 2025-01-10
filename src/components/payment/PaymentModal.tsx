import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import envConfig from "@/config/envConfig";
import { IPost } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { LockOpen } from "lucide-react";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

interface IProps {
  post: IPost;
}

const stripePromise = loadStripe(envConfig.stripePublishableKey as string);

const PaymentModal = ({ post }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="px-4 py-2 rounded-lg bg-emerald-600 gap-x-2 mx-auto"
        >
          <LockOpen /> Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Purchase Post</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Make payment.</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="">
          <Elements stripe={stripePromise}>
            <CheckoutForm postId={post._id} onPaymentSuccess={handleClose} />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
