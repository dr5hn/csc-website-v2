import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Mail, Star } from "lucide-react";
import Link from "next/link";

export default function PricingCard({ plan }) {
  const isPopular = plan.popular;
  const Icon = plan.ctaIcon;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-[1px] bg-gradient-to-br from-light to-transparent h-full",
        isPopular ? "from-orange/30 to-orange/10" : "from-light to-transparent"
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange text-white text-sm font-bold shadow-lg">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="relative rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] h-full flex flex-col p-8">
        {plan.badge && (
          <div className="absolute top-4 right-4">
            <span className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", 
              plan.accent === "blue" && "bg-blue/10 text-blue", 
              plan.accent === "orange" && "bg-orange/10 text-orange",
              plan.accent === "green" && "bg-green/10 text-green"
            )}>
              {plan.badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-dark mb-2">{plan.name}</h3>
          {plan.credits && (
            <p className="text-sm font-semibold text-lightgray uppercase mb-4">
              {plan.credits}
            </p>
          )}

          {/* Price */}
          <div className="mb-4">
            <span className="text-5xl font-black text-dark font-mono">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-lightgray ml-2">{plan.period}</span>
            )}
            {plan.pricePerCredit && (
              <div className="text-sm text-lightgray mt-1">
                {plan.pricePerCredit}
              </div>
            )}
          </div>

          <p className="text-darkgray">{plan.description}</p>
        </div>

        {/* Features */}
        <div className="mb-8 flex-grow">
          <ul className="space-y-4">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-green-500" />
                </div>
                <span className="text-darkgray">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-auto">
          <Button
            asChild
            className={cn(
              "w-full text-lg font-bold h-14 rounded-xl transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg",
              plan.accent === "orange" &&
              "bg-gradient-to-r from-orange to-orange/90 hover:from-orange/90 hover:to-orange text-white",
              plan.accent === "blue" &&
              "bg-gradient-to-r from-blue to-blue/90 hover:from-blue/90 hover:to-blue text-white",
              plan.accent === "green" &&
              "bg-gradient-to-r from-green to-green/90 hover:from-green/90 hover:to-green text-white", 
              plan.accent === "gray" && "bg-dark text-white hover:bg-dark/90"
            )}
          >
            <Link 
              href={plan.href || "#"}
              target={plan.target || "_self"}
              rel={plan.target === "_blank" ? "noopener noreferrer" : undefined}
            >
              {Icon && <Icon className="w-5 h-5 mr-2" />}
              {plan.cta}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
