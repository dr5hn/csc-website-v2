"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Zap, Users, Database, Globe, Star, ShieldCheck, Layers } from "lucide-react";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { usePlatformStats } from "@/hooks/use-platform-stats";
import { createGitHubStarsStat } from "@/lib/stats";

// Custom hook to detect when an element is in view
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, inView];
}

// Animated counter component
function AnimatedCounter({ end, decimals = 0, suffix = "" }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: end },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.span>
      {number.to((n) => `${n.toFixed(decimals)}${suffix}`)}
    </animated.span>
  );
}

// Main Stats component
export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const { formattedStars, loading: starsLoading } = useGitHubStars("dr5hn", "countries-states-cities-database");
  const { totalRequests, countries, states, cities } = usePlatformStats();

  const stats = [
    { icon: Zap,        ...totalRequests, label: "Total API Requests",  color: "blue"   },
    { icon: Users,      value: 40, suffix: "K+", decimals: 0, label: "Developers Worldwide", color: "green"  },
    { icon: Database,   ...cities,        label: "Cities",              color: "orange" },
    { icon: Layers,     ...states,        label: "States & Regions",    color: "blue"   },
    { icon: Globe,      ...countries,     label: "Countries",           color: "green"  },
    { icon: ShieldCheck, value: 99.9, suffix: "%", decimals: 1, label: "API Uptime", color: "orange" },
    createGitHubStarsStat(formattedStars, starsLoading, { label: "Open Source Stars", color: "green" }),
  ];

  return (
    <>
      <div>
        <div className="h-px bg-gradient-to-r from-transparent via-light to-transparent"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent transform translate-y-[-1px]"></div>
      </div>
      <section ref={ref} className="relative py-4 md:py-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              Powering Applications Worldwide
            </h2>
            <p className="mt-3 text-lg md:text-xl text-darkgray">
              Real-time statistics from our global platform serving developers
              and businesses
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const accentColor =
                stat.color === "green"
                  ? "bg-green/10 text-green"
                  : stat.color === "orange"
                    ? "bg-orange/10 text-orange"
                    : "bg-blue/10 text-blue";

              const gradientText =
                stat.color === "green"
                  ? "from-green to-green/80"
                  : stat.color === "orange"
                    ? "from-orange to-orange/80"
                    : "from-blue to-blue/80";

              return (
                <div
                  key={index}
                  className="text-center flex flex-col items-center"
                >
                  <div
                    className={`mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${accentColor}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div
                    className={`text-4xl font-black bg-gradient-to-r ${gradientText} bg-clip-text text-transparent`}
                  >
                    {inView ? (
                      <AnimatedCounter
                        end={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    ) : (
                      `0${stat.suffix || ""}`
                    )}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-darkgray">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div>
        <div className="h-px bg-gradient-to-r from-transparent via-light to-transparent"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent transform translate-y-[-1px]"></div>
      </div>
    </>
  );
}
