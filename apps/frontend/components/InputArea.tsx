"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import startGeneration from "@/actions/generate";
import OverlayAuth from "./OverlayAuth";
import { useUser } from "@clerk/nextjs";

interface InputCardProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const InputCard: React.FC<InputCardProps> = ({ inputValue, setInputValue }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const startGenerate = async () => {
    if (user) {
      console.log("Submitting input:", inputValue);
      try {
        await startGeneration(inputValue);
        console.log("Generation started successfully!");
      } catch (error) {
        console.error("Error in generation:", error);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const StartButton = useMemo(() => {
    return inputValue.trim() ? (
      <Button
        className="absolute bottom-3 right-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
        onClick={startGenerate}
      >
        <Forward />
        Start
      </Button>
    ) : null;
  }, [inputValue]);

  return (
    <>
      <div className="relative">
        <textarea
          placeholder="Describe your app idea..."
          className="w-full py-3 px-5 h-24 md:h-30 border-gray border-[1px] bg-[#30302e] text-white rounded-xl 
                        focus:outline-none focus:ring-0  
                        transition-shadow duration-200 ease-in-out placeholder-gray-400 
                        resize-none leading-relaxed"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            // paddingRight: "7rem",
            textAlign: "left",
            lineHeight: "1.5rem",
          }}
          rows={3}
        />
        {StartButton}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && <OverlayAuth setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default InputCard;
