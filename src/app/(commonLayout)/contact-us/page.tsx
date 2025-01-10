"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";

const ContactUsPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 lg:p-12 bg-default">
        <section className="w-full max-w-6xl text-center">
          <h1 className="text-4xl font-bold text-default mb-8">Contact Us</h1>
          <p className="text-lg text-default leading-relaxed">
            Got any questions, feedback, or suggestions? We would love to hear
            from you! Feel free to reach out to us using the form below, or
            through our provided contact details.
          </p>
        </section>

        {/* Contact Form */}
        <section className="w-full max-w-3xl mt-12">
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      placeholder="Type your message here."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Contact Info Section */}
        <section className="w-full max-w-6xl mt-16 text-center">
          <h2 className="text-3xl font-bold text-default mb-8">
            Our Contact Details
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-default">
            <div className="flex flex-col items-center">
              <Mail className="text-[#FCBE4F]" size={48} />
              <h3 className="text-xl font-semibold mt-4">Email Us</h3>
              <p className="mt-2">support@pawfect.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="text-[#FCBE4F]" size={48} />
              <h3 className="text-xl font-semibold mt-4">Call Us</h3>
              <p className="mt-2">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="text-[#FCBE4F]" size={48} />
              <h3 className="text-xl font-semibold mt-4">Visit Us</h3>
              <p className="mt-2">123 Pawfect Street, Pet City, PC 45678</p>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default ContactUsPage;
