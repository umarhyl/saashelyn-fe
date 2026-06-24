"use client";

import { useAuth } from "@/components/auth/AuthContext";
import { API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { QrCode, CheckCircle2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId;
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = async () => {
    if (!token) return;
    setIsPaying(true);
    
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/pay`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing payment.");
    } finally {
      setIsPaying(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-background">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="font-heading text-4xl mb-4 text-center">Payment Successful!</h1>
        <p className="text-muted-foreground font-light mb-8 text-center max-w-md">
          Thank you for your purchase. Your order is now being processed. Redirecting to your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-secondary/5 border border-border/50 p-8 flex flex-col items-center shadow-sm">
          <h1 className="font-heading text-3xl mb-2 text-center">Complete Payment</h1>
          <p className="text-sm font-light text-muted-foreground mb-8 text-center uppercase tracking-widest">
            Order #{orderId}
          </p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 w-full flex flex-col items-center">
            <QrCode className="w-48 h-48 text-primary" />
            <p className="mt-4 font-heading text-lg">SAASHELYN OFFICIAL</p>
            <p className="text-sm text-muted-foreground">Scan with any supported e-wallet app</p>
          </div>
          
          <p className="text-center text-sm font-light leading-relaxed mb-8 text-foreground/80">
            This is a mock payment for testing purposes. Please pretend you have scanned the QR code and paid the required amount.
          </p>
          
          <Button 
            onClick={handlePay} 
            disabled={isPaying}
            className="w-full tracking-widest uppercase font-light h-14 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPaying ? "Verifying..." : "I Have Paid"}
          </Button>
        </div>
      </div>
    </div>
  );
}
