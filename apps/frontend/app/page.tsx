"use client";
import React, { useState } from "react";
import InputCard from "@/components/InputArea";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3f3f3] text-gray-800 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-gray-900 mb-2">
          Bring Your App Ideas to Life, Instantly
        </h1>
        <p className="text-lg text-gray-600">
          Your AI-powered full-stack engineer, Ready when you are
        </p>
      </div>

      {/* Input Component */}
      <InputCard inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
}
