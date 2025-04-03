"use client";
import React, { useState } from "react";
import InputCard from "@/components/InputArea";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-gray-800 relative overflow-hidden">
      <div className="text-center mb-8 z-10 mt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2">
          Bring Your App Ideas to Life, Instantly
        </h1>
        <p className="text-lg text-gray-400">
          Your AI-powered full-stack engineer, Ready when you are
        </p>
      </div>

      <div className="relative w-full max-w-3xl px-4">
        <InputCard inputValue={inputValue} setInputValue={setInputValue} />
      </div>
    </div>
  );
}
