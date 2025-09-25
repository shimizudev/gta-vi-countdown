"use client";

// biome-ignore assist/source/organizeImports: Default Import
import type React from "react";
import { useEffect, useState } from "react";
import { GTA6_RELEASE_DATE } from "@/lib/date";
import { useIsSSR } from "@react-aria/ssr";
import { LoaderCircle } from "lucide-react";
import {
  differenceInSeconds,
  formatDate,
  intervalToDuration,
  formatDistanceToNow,
} from "date-fns";
import Link from "next/link";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  months: number;
}

const CountdownTimer: React.FC = () => {
  const isSSR = useIsSSR();

  const [timeLeft, setTimeLeft] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    months: 0,
  });

  const [isReleased, setIsReleased] = useState(false);

  const calculateTimeLeft = (): CountdownValues => {
    const now = new Date();
    const duration = intervalToDuration({
      start: now,
      end: GTA6_RELEASE_DATE,
    });

    const difference = differenceInSeconds(GTA6_RELEASE_DATE, now);

    if (difference > 0) {
      return {
        months: duration.months || 0,
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      };
    }

    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: its js
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = differenceInSeconds(GTA6_RELEASE_DATE, now);

      if (difference <= 0) {
        setIsReleased(true);
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsReleased(false);
        setTimeLeft(calculateTimeLeft());
      }
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatValue = (
    value: number,
    type: "regular" | "days" = "regular",
  ): string => {
    return type === "days"
      ? value.toString().padStart(3, "0")
      : value.toString().padStart(2, "0");
  };

  if (isSSR)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircle className="size-8 animate-spin" />
      </div>
    );

  if (isReleased) {
    const relativeTime = formatDistanceToNow(GTA6_RELEASE_DATE, {
      addSuffix: true,
    });

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="p-8 md:p-16 bg-card rounded-lg max-w-4xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-foreground">
            🎉 GTA 6 Already Released!
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground mb-8">
            Released {relativeTime}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
            The wait is finally over! Go play GTA 6 now!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6 sm:p-8 md:p-12 lg:p-16 bg-card rounded-lg max-w-7xl w-full">
        <h2 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-foreground text-balance">
          GTA 6 Release Countdown ⏰
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-center">
          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground">
              <span
                style={{ "--value": timeLeft.months } as React.CSSProperties}
                aria-live="polite"
              >
                {formatValue(timeLeft.months)}
              </span>
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mt-2 md:mt-4 font-medium">
              Months
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground">
              <span
                style={{ "--value": timeLeft.days } as React.CSSProperties}
                aria-live="polite"
              >
                {formatValue(timeLeft.days)}
              </span>
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mt-2 md:mt-4 font-medium">
              Days
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground">
              <span
                style={{ "--value": timeLeft.hours } as React.CSSProperties}
                aria-live="polite"
              >
                {formatValue(timeLeft.hours)}
              </span>
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mt-2 md:mt-4 font-medium">
              Hours
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground">
              <span
                style={{ "--value": timeLeft.minutes } as React.CSSProperties}
                aria-live="polite"
              >
                {formatValue(timeLeft.minutes)}
              </span>
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mt-2 md:mt-4 font-medium">
              Min
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="countdown font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground">
              <span
                style={{ "--value": timeLeft.seconds } as React.CSSProperties}
                aria-live="polite"
              >
                {formatValue(timeLeft.seconds)}
              </span>
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mt-2 md:mt-4 font-medium">
              Sec
            </span>
          </div>
        </div>

        <div className="mt-8 md:mt-12 text-center text-muted-foreground">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Target Date: {formatDate(GTA6_RELEASE_DATE, "MMMM dd, yyyy")}
          </p>
          <p className="text-sm sm:text-lg md:text-2xl lg:text-xl">
            Date Source:{" "}
            <Link
              className="underline decoration-dotted underline-offset-4 hover:no-underline"
              href="https://www.rockstargames.com/newswire/article/258aa538o412ok/grand-theft-auto-vi-is-now-coming-may-26-2026"
              target="blank"
            >
              Rockstar Games
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
