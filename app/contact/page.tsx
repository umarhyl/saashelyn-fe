"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="text-center mb-20">
          <h1 className="font-heading text-4xl md:text-5xl font-normal tracking-wide mb-6">Contact Us</h1>
          <p className="font-light tracking-wide text-muted-foreground uppercase text-sm max-w-2xl mx-auto leading-relaxed">
            We invite you to reach out for any inquiries regarding our collections, your orders, or our atelier.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-12">
            <div>
              <h3 className="font-heading text-xl font-normal mb-4">Client Services</h3>
              <p className="font-light text-muted-foreground leading-relaxed mb-2">
                Available Monday to Friday, 9am - 6pm.
              </p>
              <a href="mailto:clientservices@saashelyn.com" className="text-sm tracking-wide uppercase hover:underline underline-offset-4">
                clientservices@saashelyn.com
              </a>
            </div>

            <div>
              <h3 className="font-heading text-xl font-normal mb-4">Press Inquiries</h3>
              <a href="mailto:press@saashelyn.com" className="text-sm tracking-wide uppercase hover:underline underline-offset-4">
                press@saashelyn.com
              </a>
            </div>

            <div>
              <h3 className="font-heading text-xl font-normal mb-4">Atelier</h3>
              <p className="font-light text-muted-foreground leading-relaxed">
                1234 Jl. Dr Angka<br />
                Surabaya, 55018<br />
                Indonesia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <form className="space-y-8 bg-secondary/10 p-8 md:p-12 border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">First Name</label>
                  <Input className="rounded-none border-border/50 bg-background h-12 font-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Last Name</label>
                  <Input className="rounded-none border-border/50 bg-background h-12 font-light" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Email Address</label>
                <Input type="email" className="rounded-none border-border/50 bg-background h-12 font-light" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Order Number (Optional)</label>
                <Input className="rounded-none border-border/50 bg-background h-12 font-light" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Message</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-none border border-border/50 bg-background font-light focus:outline-none focus:ring-1 focus:ring-ring"
                ></textarea>
              </div>

              <Button size="lg" className="w-full md:w-auto px-12 rounded-none h-14 uppercase tracking-widest font-light" type="button">
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
