"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { createContext, useContext, useState } from "react";
import { useMap } from "./utils/context";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";



export function NavigateTo({ pole }) {
  const { setCenter } = useMap();

  const handleOnClick = (event) => {
    if(!pole.coordinates) return;
    if (event.ctrlKey || event.metaKey) {
      // If Ctrl or Cmd key is pressed, navigate to the URL in a new tab
      window.open(
        `https://maps.google.com/?q=${pole.coordinates.lat},${pole.coordinates.lng}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      // Prevent default link behavior
      event.preventDefault();
      // Call the setCenter function with the pole's coordinates
      setCenter(pole.coordinates);
    }
  };

  return (
    <a
      rel="noopener noreferrer"
      onClick={handleOnClick}
      className="cursor-pointer"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage
                src="/icons/map.png"
                alt="Location"
                className="size-6"
              />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ctrl + Click to open in new tab</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </a>
  );
}
