import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahdev",
    company: "TechFlow Inc",
    role: "Senior Developer",
    image: "/placeholder.svg",
    description:
      "The CountryStateCity API saved us weeks of development time. Clean, fast, and exactly what we needed for our global app.",
  },
  {
    name: "Marcus Rodriguez",
    handle: "@marcusbuilds",
    company: "StartupLab",
    role: "CTO",
    image: "/placeholder.svg",
    description:
      "Best location data API I've used. The documentation is excellent and the response times are incredibly fast.",
  },
  {
    name: "Emily Watson",
    handle: "@emilycodes",
    company: "DataViz Pro",
    role: "Full Stack Developer",
    image: "/placeholder.svg",
    description:
      "Switched from building our own location database to using this API. Game changer for our productivity and accuracy.",
  },
  {
    name: "David Kim",
    handle: "@davidkimdev",
    company: "GlobalTech Solutions",
    role: "Lead Engineer",
    image: "/placeholder.svg",
    description:
      "The open-source approach combined with the API service is perfect. We use both depending on our project needs.",
  },
  {
    name: "Lisa Thompson",
    handle: "@lisabuilds",
    company: "InnovateCorp",
    role: "Product Manager",
    image: "/placeholder.svg",
    description:
      "Our team loves how easy it is to integrate. The data quality is outstanding and support is responsive.",
  },
  {
    name: "Alex Johnson",
    handle: "@alexcodes",
    company: "DevStudio",
    role: "Frontend Developer",
    image: "/placeholder.svg",
    description:
      "Perfect for our e-commerce platform. The city/state/country data is always up-to-date and comprehensive.",
  },
  {
    name: "Maria Garcia",
    handle: "@mariadev",
    company: "CloudFirst",
    role: "Backend Engineer",
    image: "/placeholder.svg",
    description:
      "Reliable, fast, and well-documented. This API has become an essential part of our development stack.",
  },
  {
    name: "James Wilson",
    handle: "@jameswilson",
    company: "TechVentures",
    role: "Software Architect",
    image: "/placeholder.svg",
    description:
      "The combination of free open-source data and premium API access gives us flexibility for all our projects.",
  },
];

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
      "group relative flex h-full w-full overflow-hidden p-2 [--duration:10s] [--gap:12px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex shrink-0 [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
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

const TestimonialCard = ({ testimonial, className }) => (
  <div
    className={cn(
      "group mx-2 flex h-32 w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent p-3 transition-all hover:border-blue-400 hover:shadow-[0_0_10px_#60a5fa] dark:hover:border-blue-400",
      className
    )}
  >
    <div className="flex items-start gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-600">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-full w-full not-prose object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-foreground">
            {testimonial.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {testimonial.handle}
          </span>
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-foreground">
          {testimonial.description}
        </p>
      </div>
    </div>
  </div>
);

export const Testimonials = ({
  data = testimonials,
  className,
  cardClassName,
}) => (
  <div className={cn("w-full overflow-x-hidden py-4", className)}>
    {[false, true, false].map((reverse, index) => (
      <Canopy
        key={`Canopy-${index}`}
        reverse={reverse}
        className="[--duration:25s]"
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
);
