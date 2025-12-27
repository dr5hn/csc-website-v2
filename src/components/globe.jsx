"use client";
import React from "react";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(
  () => import("./ui/globe").then((m) => m.CobeGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square bg-gradient-to-b from-blue-950/20 to-transparent rounded-full" />
    ),
  }
);

export function Globe() {
  const markers = [
    { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
    { location: [40.7128, -74.006], size: 0.05 }, // New York
    { location: [51.5072, -0.1276], size: 0.05 }, // London
    { location: [48.8566, 2.3522], size: 0.03 }, // Paris
    { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
    { location: [22.3193, 114.1694], size: 0.04 }, // Hong Kong
    { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
    { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
    { location: [28.6139, 77.209], size: 0.04 }, // Delhi
    { location: [55.7558, 37.6173], size: 0.04 }, // Moscow
    { location: [-23.5505, -46.6333], size: 0.04 }, // São Paulo
    { location: [52.52, 13.405], size: 0.03 }, // Berlin
    { location: [31.2304, 121.4737], size: 0.04 }, // Shanghai
    { location: [34.0522, -118.2437], size: 0.03 }, // Los Angeles
    { location: [41.9028, 12.4964], size: 0.03 }, // Rome
  ];

  return (
    <div className="flex flex-row items-center justify-center relative w-full">
      <div className="w-full relative overflow-hidden aspect-square">
        <CobeGlobe
          markers={markers}
        />
      </div>
    </div>
  );
}
