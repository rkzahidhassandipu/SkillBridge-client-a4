"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TutorStudentBanner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-100 overflow-hidden">
      {/* Main content */}
      <div className="container mx-auto px-6 md:px-16 py-20 md:py-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-orange-200">
              <Award className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 50,000+ Students
              </span>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
              <span
                className="block text-gray-900"
                style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif" }}
              >
                Connect with
              </span>
              <span
                className="block bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 bg-clip-text text-transparent relative pb-6"
                style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif" }}
              >
                Expert Tutors
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 500 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 10 Q 250 20, 500 10"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="50%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span
                className="block text-gray-900 mt-4"
                style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif" }}
              >
                Learn Smarter
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              One-on-one personalized learning experiences with qualified
              tutors. Master any subject at your own pace with dedicated
              support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/course" passHref>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Find a Tutor
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
                >
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto lg:h-[600px]">
              <Image
                src="https://i.postimg.cc/CLGzcfvV/a.png"
                alt="Tutor and student illustration"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap");

        @font-face {
          font-family: "Clash Display";
          src: url("https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500,400&display=swap");
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
