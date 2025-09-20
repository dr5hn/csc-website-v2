"use client";

import { cn } from "@/lib/utils";
import testimonials from "@/data/testimonials.json";

const Canopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "group/canopy relative flex h-full w-full overflow-hidden px-6 py-3 [--gap:24px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex shrink-0 [gap:var(--gap)]", {
          "group-hover/canopy:[animation-play-state:paused]": pauseOnHover,
          "[animation-direction:reverse]": reverse,
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({ testimonial, className }) => {
  const generateFallbackAvatar = (name, company) => {
    const displayName = company || name;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=007bff&color=fff&size=128`;
  };

  const handleImageError = (e) => {
    // If the image fails to load, switch to a generated avatar
    e.target.src = generateFallbackAvatar(testimonial.name, testimonial.company);
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <div className="rounded-2xl p-[1px] group-hover:from-blue/20 group-hover:to-green/10 transition-colors duration-300 group relative">
      {/* Card surface */}
      <div
        className={cn(
          "flex w-80 shrink-0 cursor-pointer overflow-hidden rounded-[calc(1rem-1px)] bg-white/80 backdrop-blur-sm border border-light/60 transition-all duration-300 p-6 flex flex-col h-full",
          className
        )}
      >
        {/* Header with avatar and info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 border-light/50 group-hover:border-blue/30 transition-colors duration-300">
            <img
              src={testimonial.avatar || generateFallbackAvatar(testimonial.name, testimonial.company)}
              alt={testimonial.name}
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-blue font-medium">
                {testimonial.name}
              </span>
            </div>
            <div className="text-xs text-lightgray">
              <span className="font-medium">{testimonial.role}</span>
              {testimonial.company && (
                <>
                  <span className="mx-1">•</span>
                  <span>{testimonial.company}</span>
                </>
              )}
            </div>
          </div>
        </div>

      {/* Testimonial text */}
      <p className="text-sm text-darkgray leading-relaxed line-clamp-3 flex-1">
        "{testimonial.testimonial}"
      </p>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-green/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export const Testimonials = ({
  data = testimonials["testimonials"],
  className,
  cardClassName,
}) => (
  <>
    <section className="py-6 md:py-10 xl:py-16">
      <div className="text-center mb-6 md:mb-12 container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 tracking-tight">
          Loved by developers worldwide
        </h2>
        <p className="text-lg text-darkgray">
          See what developers are saying about the CountryStateCity API and
          tools
        </p>
      </div>
      <div className={cn("w-full overflow-x-hidden", className)}>
        {[false, true].map((reverse, index) => (
          <Canopy
            key={`Canopy-${index}`}
            reverse={reverse}
            className="[--duration:200s]"
            pauseOnHover
            applyMask={false}
            repeat={3}
          >
            {data.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                className={cardClassName}
              />
            ))}
          </Canopy>
        ))}
      </div>
    </section>
  </>
);
