"use client";
import React, { useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import startGeneration from "@/actions/generate";

interface InputCardProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const InputCard: React.FC<InputCardProps> = ({ inputValue, setInputValue }) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const startGenerate = async () => {
    console.log("Submitting input:", inputValue);
    try {
      await startGeneration(inputValue);
      console.log("Generation started successfully!");
    } catch (error) {
      console.error("Error in generation:", error);
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
    <Card className="w-full max-w-3xl shadow-md rounded-2xl border-2 border-white bg-white/20 backdrop-blur-3xl overflow-hidden">
      <CardContent className="p-3">
        <div className="relative">
          <textarea
            placeholder="Describe your app idea..."
            className="w-full py-3 px-5 h-24 md:h-30 bg-gray-50 text-gray-800 rounded-xl 
                      focus:outline-none focus:ring-0 focus:border-gray-300 
                      transition-shadow duration-200 ease-in-out placeholder-gray-400 
                      resize-none leading-relaxed"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              paddingRight: "7rem",
              textAlign: "left",
              lineHeight: "1.5rem",
              maxHeight: "7.5rem",
            }}
            rows={3}
          />
          {StartButton}
        </div>
      </CardContent>
    </Card>
  );
};

export default InputCard;
