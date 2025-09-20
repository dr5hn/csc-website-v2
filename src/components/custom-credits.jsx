"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { customCreditsOption } from "@/data/export-pricing";
import Link from "next/link";

export default function CustomCredits() {
  const [credits, setCredits] = useState(1);

  const handleIncrement = () => {
    if (credits < customCreditsOption.maxCredits) {
      setCredits(credits + 1);
    }
  };

  const handleDecrement = () => {
    if (credits > customCreditsOption.minCredits) {
      setCredits(credits - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= customCreditsOption.minCredits && value <= customCreditsOption.maxCredits) {
      setCredits(value);
    }
  };

  const totalPrice = credits * 1.00;

  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/30 to-purple-500/10">
      <div className="relative rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] h-full flex flex-col p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-dark mb-2">{customCreditsOption.name}</h3>
          <p className="text-sm font-semibold text-lightgray uppercase mb-4">
            Buy exactly what you need
          </p>

          {/* Price per credit */}
          <div className="mb-4">
            <span className="text-2xl font-black text-dark font-mono">
              $1.00
            </span>
            <span className="text-lightgray ml-2">per credit</span>
          </div>

          <p className="text-darkgray">{customCreditsOption.description}</p>
        </div>

        {/* Credits selector */}
        <div className="mb-6">
          <label htmlFor="credits-input" className="block text-sm font-semibold text-dark mb-2">
            Number of credits
          </label>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrement}
              disabled={credits <= customCreditsOption.minCredits}
              className="h-10 w-10 rounded-full p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <input
              id="credits-input"
              type="number"
              value={credits}
              onChange={handleInputChange}
              min={customCreditsOption.minCredits}
              max={customCreditsOption.maxCredits}
              className="w-20 h-12 text-center text-xl font-bold rounded-lg border border-light/80 bg-white/70 text-dark focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrement}
              disabled={credits >= customCreditsOption.maxCredits}
              className="h-10 w-10 rounded-full p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-lightgray text-center mt-2">
            Max {customCreditsOption.maxCredits} credits per purchase
          </p>
        </div>

        {/* Total price display */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-center">
            <div className="text-sm font-semibold text-purple-600 mb-1">
              Total Cost:
            </div>
            <div className="text-3xl font-black font-mono text-purple-600">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8 flex-grow">
          <h4 className="font-semibold text-dark mb-3">What you can export:</h4>
          <ul className="space-y-2 text-sm">
            {customCreditsOption.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-darkgray">
                <div className="flex-shrink-0 w-4 h-4 bg-green-500/10 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-auto">
          <Button
            asChild
            className="w-full text-lg font-bold h-14 rounded-xl transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
          >
            <Link 
              href={customCreditsOption.href}
              target={customCreditsOption.target}
              rel={customCreditsOption.target === "_blank" ? "noopener noreferrer" : undefined}
            >
              Purchase {credits} Credit{credits !== 1 ? "s" : ""}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
