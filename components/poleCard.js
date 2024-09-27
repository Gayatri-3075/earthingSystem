"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FiPhone as PhoneIcon,
  FiZap as BoltIcon,
  FiDollarSign as CurrencyDollarIcon,
  FiAlertTriangle as ExclamationTriangleIcon,
  FiClock as ClockIcon,
  FiXCircle as XCircleIcon,
} from "react-icons/fi";

const StatusIcon = ({ status }) => {
  switch (status) {
    case "normal":
      return (
        <div className="w-3 h-3 rounded-full bg-green-500" title="Normal" />
      );
    case "warning":
      return (
        <div className="w-3 h-3 rounded-full bg-yellow-500" title="Warning" />
      );
    case "critical":
      return (
        <div className="w-3 h-3 rounded-full bg-red-500" title="Critical" />
      );
    default:
      return null;
  }
};

  const fields = [
    { icon: BoltIcon, tooltip: "Working Condition", key: "condition" },
    {
      icon: PhoneIcon,
      tooltip: "Under Authority of",
      key: "authority",
      phone: "authorityPhone",
    },
    {
      icon: BoltIcon,
      tooltip: "Electricity supplied by",
      key: "electricitySupplier",
      phone: "supplierPhone",
    },
    {
      icon: CurrencyDollarIcon,
      tooltip: "Electricity cost per watt",
      key: "costPerWatt",
    },
    ...(status === "warning" || status === "normal"
      ? [
          {
            icon: ExclamationTriangleIcon,
            tooltip: "Lost power",
            key: "lostPower",
          },
          {
            icon: ClockIcon,
            tooltip: "Been in danger since",
            key: "dangerSince",
          },
        ]
      : []),
    ...(status === "critical"
      ? [
          { icon: XCircleIcon, tooltip: "Went Offline at", key: "offlineAt" },
          { icon: ClockIcon, tooltip: "Offline Since", key: "offlineSince" },
          { icon: ExclamationTriangleIcon, tooltip: "Reason", key: "reason" },
        ]
      : []),
  ];


const IconWithTooltip = ({ icon: Icon, tooltip, onClick }) => (
  <Tooltip>
    <TooltipTrigger>
      <Icon className="w-4 h-4 cursor-pointer" onClick={onClick} />
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

const getStatusColor = (value) => {
  if (value === "Operational") return "text-green-500";
  if (value.includes("Offline")) return "text-red-500";
  return "text-yellow-500";
};

const StreetLightCard = ({ status, data }) => {
  const handlePhoneClick = (phoneNumber) => {
    navigator.clipboard.writeText(phoneNumber);
    alert("Phone number copied to clipboard");
  };


  return (
    <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <StatusIcon status={status} />
          <h2 className="text-lg font-semibold">Street Light Status</h2>
        </div>
        <TooltipProvider>
          <div className="space-y-2 text-sm">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="flex items-center">
                  <IconWithTooltip icon={field.icon} tooltip={field.tooltip} />
                  {field.phone && data[field.key]}
                </span>
                <span className="flex items-center">
                  {field.phone ? (
                    <IconWithTooltip
                      icon={PhoneIcon}
                      tooltip={`Call ${data[field.phone]}`}
                      onClick={() => handlePhoneClick(data[field.phone])}
                    />
                  ) : (
                    <>
                      :&nbsp;
                      <span className={getStatusColor(data[field.key])}>
                        {data[field.key]}
                      </span>
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default StreetLightCard;
