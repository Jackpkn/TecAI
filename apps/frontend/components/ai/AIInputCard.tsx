import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const AiInputCard = () => {
  return (
    <CardContent className="p-2 relative  rounded-xl  backdrop-blur-md z-500 overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-[#30302e]">
      <textarea
        placeholder="Describe your app idea..."
        className="w-full h-full py-3 px-4 bg-transparent border border-gray-300/50  rounded-md focus:outline-none focus:ring text-white resize-none leading-relaxed"
        style={{
          textAlign: "left",
          lineHeight: "1.5rem",
        }}
        rows={5}
      />
      <div className="absolute bottom-3 right-3">
        <Button className="rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 bg-blue-600 hover:bg-blue-700 text-white">
          <Send className="h-4 w-4" /> {/* Smaller Send icon */}
        </Button>
      </div>
    </CardContent>
    // </Card>
  );
};

export default AiInputCard;
