"use client";
import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import logo from "@/public/logo.svg";
// import { Card } from "@/components/ui/card"; // Keep if used in ChatMessage
import {
  Terminal,
  Code,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AiInputCard from "@/components/ai/AIInputCard"; // Assuming this exists and takes onSubmit
import ChatMessage, { Message } from "@/components/chat/ChatMessage";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Import Shadcn Resizable
import type { ImperativePanelGroupHandle } from "react-resizable-panels"; // Type still useful
import UserInfo from "@/components/UserInfo";
import { UserButton } from "@clerk/nextjs";

const COLLAPSED_SIZE_PERCENT = 4; // Use percentages for Shadcn Resizable default sizes
const DEFAULT_CHAT_SIZE_PERCENT = 35;

export default function AppLayout() {
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, sender: "user", text: "Create a Next.js app with a dashboard" },
    {
      id: 2,
      sender: "ai",
      text: "Okay, I'll start setting up a Next.js project with a basic dashboard structure. What components or data should it display initially?",
    },
    {
      id: 3,
      sender: "user",
      text: "Add charts using Chart.js and a user list component.",
    },
    {
      id: 4,
      sender: "ai",
      text: "Got it. I'm adding Chart.js for data visualization and creating a placeholder for the user list. I'll need some sample data structure for the users.",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  // Ref for programmatic control (resize, collapse) using Shadcn's imperative handle
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      // Access the viewport element within Shadcn's ScrollArea
      const scrollViewport = chatContainerRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollViewport) {
        // Use setTimeout to ensure scrolling happens after potential DOM updates
        setTimeout(() => {
          scrollViewport.scrollTop = scrollViewport.scrollHeight;
        }, 0);
      }
    }
  }, [chatMessages]); // Trigger effect when messages change

  const toggleChatSidebar = () => {
    const panelGroup = panelGroupRef.current;
    if (!panelGroup) return;

    // Get the ID of the first panel (chat panel)
    const chatPanelId = panelGroup.getId() + ":panel-0"; // Default ID pattern

    if (isChatCollapsed) {
      // Expand the chat panel
      panelGroup.resize(chatPanelId, DEFAULT_CHAT_SIZE_PERCENT);
    } else {
      // Collapse the chat panel
      panelGroup.collapse(chatPanelId);
    }
    // The onCollapse/onExpand props will update the state
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setChatMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: `Okay, I've processed: "${message.substring(0, 30)}...". Updating files...`,
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  const toggleFullscreenPreview = () => {
    setIsFullscreenPreview(!isFullscreenPreview);
  };

  const loadPreview = () => {
    setTimeout(() => setPreviewReady(true), 500);
  };

  const addTestMessages = () => {
    const newMessages: Message[] = [];
    const baseId = Date.now();
    for (let i = 0; i < 10; i++) {
      newMessages.push({
        id: baseId + i,
        sender: i % 2 === 0 ? "user" : "ai",
        text: `This is test message ${i + 1} demonstrating scrolling. Lorem ipsum dolor sit amet.`,
      });
    }
    setChatMessages((prev) => [...prev, ...newMessages]);
  };

  // Callback for Shadcn ResizablePanelGroup layout changes
  const handlePanelLayout = (sizes: number[]) => {
    if (sizes.length > 0) {
      const chatPanelSize = sizes[0];
      // Check if the panel size is at or below the collapsed threshold
      const collapsed = chatPanelSize <= COLLAPSED_SIZE_PERCENT;
      if (collapsed !== isChatCollapsed) {
        // This might be redundant if onCollapse/onExpand work reliably,
        // but can serve as a fallback sync mechanism.
        // setIsChatCollapsed(collapsed);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#18181b]">
      {/* Fixed Header */}
      <div className="h-12 bg-[#18181b] border-b border-gray-700 flex items-center justify-between px-4 z-20 shrink-0">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Image src={logo} alt="logo" width={30} height={30} />
          </div>
          <Code className="mr-2 text-blue-400" size={20} />
          <h1 className="font-medium text-white">CodeAssist Studio</h1>
        </div>
        <div className="text-white">Ats-resume-harmony</div>
        <div className="flex items-center gap-2">
          <UserInfo />
          <UserButton />
        </div>
      </div>

      {/* Main Content Area with Shadcn Resizable Panels */}
      {/* Assign an ID for potential imperative control */}
      <ResizablePanelGroup
        id="main-layout"
        direction="horizontal"
        ref={panelGroupRef} // Add ref here
        className="flex-grow border border-transparent rounded-none" // flex-grow to take height, border-transparent helps prevent layout shifts sometimes
        onLayout={handlePanelLayout} // Listen for layout changes
      >
        {/* Left Panel - Chat */}
        <ResizablePanel
          id="chat-panel" // Assign ID for imperative control
          defaultSize={DEFAULT_CHAT_SIZE_PERCENT}
          minSize={15} // Set a reasonable minimum size
          collapsible={true}
          collapsedSize={COLLAPSED_SIZE_PERCENT} // Size when collapsed
          onCollapse={() => {
            console.log("Chat panel collapsed");
            setIsChatCollapsed(true);
          }}
          onExpand={() => {
            console.log("Chat panel expanded");
            setIsChatCollapsed(false);
          }}
          // Order is important for default layout. This is the first (left) panel.
          className="flex flex-col h-full !overflow-y-hidden" // Use !important if needed to override default overflow
        >
          {/* Inner container for flex layout */}
          <div className="flex flex-col h-full min-h-0 bg-[#18181b]">
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-700 flex justify-between items-center shrink-0">
              <h2 className="text-base font-medium text-white truncate pr-2">
                Chat
              </h2>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addTestMessages}
                  className="text-xs text-blue-400 hover:text-blue-300 whitespace-nowrap"
                  title="Add test messages"
                >
                  Test Data
                </Button>
              </div>
            </div>

            {/* Chat Messages - Scrollable */}
            {/* Use flex-grow on the ScrollArea itself */}
            <div className="flex-grow overflow-hidden">
              <ScrollArea
                ref={chatContainerRef}
                className="h-full" // Takes up available space
                type="auto" // Show scrollbar when needed
              >
                <div className="p-3 space-y-3">
                  {chatMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Input - Fixed at Bottom */}
            <div className="p-3 border-t border-gray-700 bg-[#18181b] shrink-0">
              <AiInputCard onSubmit={handleSendMessage} />
              {/* <AiInputCard /> */}
            </div>
          </div>
        </ResizablePanel>

        {/* Resize Handle with Optional Toggle Button */}
        <ResizableHandle
          withHandle
          className="relative bg-gray-700 w-1.5 hover:bg-blue-600 active:bg-blue-500 data-[resize-handle-active]:bg-blue-500 transition-colors duration-100"
        >
          {/* Place the toggle button absolutely positioned relative to the handle */}
          {/* Adjust left/transform as needed for precise centering */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline" // Use outline or ghost
              size="icon"
              className="h-6 w-6 rounded-full bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"
              onClick={toggleChatSidebar}
              title={isChatCollapsed ? "Expand Chat" : "Collapse Chat"}
            >
              {isChatCollapsed ? (
                <ChevronRight size={14} />
              ) : (
                <ChevronLeft size={14} />
              )}
            </Button>
          </div>
        </ResizableHandle>

        {/* Right Panel - Tabs (Code, Shell, Preview) */}
        {/* Assign an ID */}
        <ResizablePanel
          id="main-content-panel"
          minSize={30} // Minimum reasonable size for content
          className="flex flex-col h-full !overflow-y-hidden" // Ensure it takes height and manages overflow
        >
          {/* Conditional Rendering for Fullscreen Preview */}
          {isFullscreenPreview && activeTab === "preview" ? (
            <div className="fixed inset-0 top-12 bg-white z-30">
              {previewReady ? (
                <iframe
                  srcDoc="<html><head><title>Preview</title></head><body style='display:flex; align-items:center; justify-content:center; height:100vh; font-family: sans-serif; background-color: #f0f0f0;'><h1>Application Preview (Fullscreen)</h1></body></html>"
                  className="w-full h-full border-none"
                  title="App Preview (Fullscreen)"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                  <p className="text-gray-500 mb-4">Loading Preview...</p>
                  <Button
                    variant="default"
                    onClick={loadPreview}
                    className="gap-2"
                  >
                    <Monitor size={16} /> Load Preview
                  </Button>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreenPreview}
                className="absolute top-2 right-14 m-2 gap-1 z-40 bg-white/80 hover:bg-white"
              >
                <Minimize2 size={16} /> Exit Fullscreen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("about:blank", "_blank")}
                className="absolute top-2 right-2 m-2 gap-1 z-40 bg-white/80 hover:bg-white"
              >
                <ExternalLink size={16} /> Open
              </Button>
            </div>
          ) : (
            // Regular Tab View
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              // Use flex-col and h-full to make Tabs fill the ResizablePanel
              className="h-full flex flex-col bg-gray-800"
            >
              {/* Tab Triggers - keep shrink-0 */}
              <div className="p-2 shrink-0 border-b border-gray-700">
                <TabsList className="bg-gray-700">
                  <TabsTrigger
                    value="editor"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Code size={16} className="mr-1.5" /> Editor
                  </TabsTrigger>
                  <TabsTrigger
                    value="shell"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Terminal size={16} className="mr-1.5" /> Shell
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <Monitor size={16} className="mr-1.5" /> Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content - Use flex-grow to take remaining space */}
              {/* Important: Set overflow-auto/hidden on TabsContent or ScrollArea inside */}
              <TabsContent
                value="editor"
                className="flex-grow bg-[#1e1e1e] text-white m-0 overflow-auto"
              >
                <div className="p-4 font-mono text-sm h-full">
                  <pre>{`// editor content
import React from 'react';

function Dashboard() {
  return <div>Dashboard Content</div>;
}`}</pre>
                </div>
              </TabsContent>

              <TabsContent
                value="shell"
                className="flex-grow bg-black text-green-400 m-0 overflow-auto"
              >
                <div className="p-4 font-mono text-sm h-full">
                  $ npm run dev
                  <br /> ✓ Ready
                </div>
              </TabsContent>

              <TabsContent
                value="preview"
                className="flex-grow bg-white m-0 relative overflow-auto"
              >
                {previewReady ? (
                  <iframe
                    srcDoc="<html><body style='display:flex;align-items:center;justify-content:center;height:100vh;'><h1>Preview</h1></body></html>"
                    className="w-full h-full border-none"
                    title="App Preview"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-center p-4">
                    <Monitor size={40} className="text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Preview not ready.</p>
                    <Button
                      variant="default"
                      onClick={loadPreview}
                      className="gap-2"
                    >
                      <Monitor size={16} /> Simulate Load
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
