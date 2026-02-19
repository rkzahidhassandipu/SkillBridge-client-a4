import { Logo } from "@/components/logo";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 bg-orange-100 sm:pt-16 lg:pt-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://i.ibb.co/YBMTTLhq/t-1.png"
                width={32}
                height={32}
                alt="Logo"
                className="object-contain"
              />
              <span className="font-bold text-lg">TutorHub</span>
            </Link>

            <p className="mt-7 text-base leading-relaxed text-gray-600">
              Bringing Experienced Tutors and Motivated Learners Together to Achieve Academic Success
            </p>

            <ul className="flex items-center mt-9 space-x-3">
              {/* Social icons unchanged */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              {["About", "Features", "Works", "Career"].map((item) => (
                <li key={item}>
                  <a className="text-base text-black hover:text-blue-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              {[
                "Customer Support",
                "Delivery Details",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a className="text-base text-black hover:text-blue-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to newsletter
            </p>

            <form className="mt-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 border rounded-md focus:border-blue-600 outline-none"
              />

              <button className="w-full mt-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          © Copyright 2021, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
