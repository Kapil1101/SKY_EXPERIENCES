"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/stats";

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="font-heading text-4xl font-bold text-gold sm:text-5xl">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-navy to-navy/95 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-white sm:text-4xl mb-12">
          Impact in Numbers
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <AnimatedNumber target={stat.numericValue} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

