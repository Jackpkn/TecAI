"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize: number; // Size in percentage (0-100)
  minSize?: number;
  maxSize?: number;
  direction?: "horizontal" | "vertical";
  collapsed?: boolean;
  className?: string;
}

const ResizablePanel = ({
  children,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  direction = "horizontal",
  collapsed = false,
  className,
}: ResizablePanelProps) => {
  const [size, setSize] = useState(defaultSize);
  const [resizing, setResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  // Handle resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startPosRef.current = direction === "horizontal" ? e.clientX : e.clientY;
    startSizeRef.current = size;
    setResizing(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizing || !panelRef.current?.parentElement) return;

    const parentSize =
      direction === "horizontal"
        ? panelRef.current.parentElement.offsetWidth
        : panelRef.current.parentElement.offsetHeight;

    const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
    const delta = currentPos - startPosRef.current;

    // Calculate new size as percentage of parent
    const deltaPct = (delta / parentSize) * 100;
    let newSize = startSizeRef.current + deltaPct;

    // Clamp size within min/max bounds
    newSize = Math.max(minSize, Math.min(maxSize, newSize));

    setSize(newSize);
  };

  const handleMouseUp = () => {
    setResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className={cn(
        "relative",
        {
          "transition-[width] duration-300 ease-in-out":
            !resizing && direction === "horizontal",
          "transition-[height] duration-300 ease-in-out":
            !resizing && direction === "vertical",
          "w-0 opacity-0 overflow-hidden":
            collapsed && direction === "horizontal",
          "h-0 opacity-0 overflow-hidden":
            collapsed && direction === "vertical",
        },
        className
      )}
      style={{
        width:
          direction === "horizontal" ? (collapsed ? 0 : `${size}%`) : "100%",
        height:
          direction === "vertical" ? (collapsed ? 0 : `${size}%`) : "100%",
      }}
    >
      {children}

      {!collapsed && (
        <div
          className={cn(
            "absolute bg-transparent hover:bg-blue-500/30 z-10 transition-colors",
            {
              "cursor-col-resize right-0 top-0 w-1 h-full":
                direction === "horizontal",
              "cursor-row-resize bottom-0 left-0 h-1 w-full":
                direction === "vertical",
            }
          )}
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  );
};

export default ResizablePanel;
