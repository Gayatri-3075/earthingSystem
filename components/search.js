"use client";
import React, { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card, CardContent } from "@/components/ui/card";
import { FaChevronDown } from "react-icons/fa";
import StreetLightCard from "./poleCard";

// Mock data for Indian states and areas
const indianStates = {
  Maharashtra: ["Konkan", "Vidarbha", "Marathwada"],
  Karnataka: ["Malenadu", "Coastal Karnataka", "North Karnataka"],
  "Tamil Nadu": ["Chola Nadu", "Kongu Nadu", "Madurai Nadu"],
  Gujarat: ["Kutch", "Saurashtra", "North Gujarat"],
  Rajasthan: ["Mewar", "Marwar", "Hadoti"],
  "West Bengal": ["North Bengal", "Rarh", "Sundarbans"],
  "Uttar Pradesh": ["Awadh", "Rohilkhand", "Purvanchal"],
  Kerala: ["Malabar", "Kochi", "Travancore"],
  "Andhra Pradesh": ["Rayalaseema", "Coastal Andhra", "Uttarandhra"],
  "Madhya Pradesh": ["Malwa", "Bundelkhand", "Baghelkhand"],
  // Additional states and areas can be added as needed
};

const poledata = {
  condition: "Operational",
  authority: "City Maintenance",
  authorityPhone: "123-456-7890",
  electricitySupplier: "PowerCo",
  supplierPhone: "098-765-4321",
  costPerWatt: "$0.12",
  lostPower: "2 hours ago",
  dangerSince: "3 hours ago",
  offlineAt: "2023-09-28 15:30",
  offlineSince: "5 hours",
  reason: "Leakage current too high",
};

const Search = () => {
  const [selectedState, setSelectedState] = useState("Select");
  const [areas, setAreas] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedSuggestions =
      JSON.parse(localStorage.getItem("areaSuggestions")) || [];
    setSuggestions(storedSuggestions);
  }, []);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setAreas(indianStates[state] || []);
    setIsOpen(false); // Close the dropdown menu
  };

  const handleAreaSearch = (area) => {
    if (area && !suggestions.includes(area)) {
      const newSuggestions = [area, ...suggestions.slice(0, 2)];
      setSuggestions(newSuggestions);
      localStorage.setItem("areaSuggestions", JSON.stringify(newSuggestions));
    }
  };

  return (
    <>
      <div className="flex items-center">
        Searching in
        <Card className="bg-gray-400 w-min h-min ml-2 px-1 relative">
          <CardContent className="p-0 h-min">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="text-sm flex px-2 py-0.5 w-max">
                {selectedState} <FaChevronDown className="ml-1 mt-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Command>
                  <CommandInput placeholder="Search states" />
                  <CommandList>
                    <CommandEmpty>No states found.</CommandEmpty>
                    <CommandGroup>
                      {Object.keys(indianStates).map((state) => (
                        <CommandItem
                          key={state}
                          onSelect={() => handleStateSelect(state)}
                        >
                          {state}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>
      <Command className = "">
        <CommandInput placeholder={`Search for area in ${selectedState}`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {suggestions.length > 0 && (
            <>
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion, index) => (
                  <CommandItem key={index}>{suggestion}</CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          <CommandGroup heading="Areas">
            {areas.map((area, index) => (
              <CommandItem key={index} onSelect={() => handleAreaSearch(area)}>
                {area}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <StreetLightCard status="warning" data={poledata} />
    </>
  );
};

export default Search;