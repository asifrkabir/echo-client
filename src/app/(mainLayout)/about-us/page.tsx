import Image from "next/image";
import aboutUsImage1 from "../../../assets/images/about-us-1.jpg";
import aboutUsImage2 from "../../../assets/images/about-us-2.jpg";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";

const AboutUsPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 lg:p-12 bg-default">
        <section className="w-full max-w-6xl text-center">
          <h1 className="text-4xl font-bold text-default mb-8">About Us</h1>
          <p className="text-lg text-default leading-relaxed">
            Welcome to <strong>Pawfect</strong>! We’re your go-to platform for
            everything related to pet care. Whether you&apos;re looking for
            expert tips on taking care of your pets, sharing stories, or
            calculating nutrition needs, our platform provides all the tools you
            need to ensure your pets are happy and healthy.
          </p>
        </section>

        {/* Mission Section */}
        <section className="w-full max-w-6xl mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-default">Our Mission</h2>
              <p className="mt-4 text-default leading-relaxed">
                At Pawfect, we believe in the power of knowledge to create
                happier and healthier pets. Our mission is to provide pet owners
                with reliable, expert advice and tools that empower them to
                offer the best care for their beloved pets.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={aboutUsImage1}
                alt="Our Mission"
                className="rounded-md shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="w-full max-w-6xl mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <Image
                src={aboutUsImage2}
                alt="Our Vision"
                className="rounded-md shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-default">Our Vision</h2>
              <p className="mt-4 text-default leading-relaxed">
                We envision a world where every pet owner has easy access to
                resources that improve their pet’s quality of life. Through our
                platform, we aim to build a strong community of pet lovers and
                experts who share and contribute their experiences and knowledge
                to benefit every pet.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full max-w-6xl mt-16 text-center">
          <h2 className="text-3xl font-bold text-default">
            Join the Pawfect Community!
          </h2>
          <p className="mt-4 text-default leading-relaxed">
            Become a part of our growing community of pet lovers. Whether you’re
            a new pet owner or a seasoned one, Pawfect is here to support you in
            your pet care journey.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="px-6 py-3 text-black bg-[#FCBE4F] rounded-lg hover:bg-[#e6a93c] transition"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </div>
    </Suspense>
  );
};

export default AboutUsPage;
