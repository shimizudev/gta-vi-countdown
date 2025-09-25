import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  formatDistanceToNow,
  isBefore,
} from "date-fns";

import type { Metadata, Viewport } from "next";
import CountdownTimer from "@/components/Countdown";
import { GTA6_RELEASE_DATE } from "@/lib/date";
import { DOMAIN } from "@/lib/domain";

export const generateViewport = (): Viewport => {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#826092",
  };
};

export const generateMetadata = (): Metadata => {
  const now = new Date();
  const releaseDate = new Date(GTA6_RELEASE_DATE);

  const timeUntilRelease = formatDistanceToNow(releaseDate, {
    addSuffix: true,
  });
  const daysUntilRelease = differenceInDays(releaseDate, now);
  const monthsUntilRelease = differenceInMonths(releaseDate, now);
  const yearsUntilRelease = differenceInYears(releaseDate, now);

  const formattedReleaseDate = format(releaseDate, "MMMM d, yyyy");
  const isoReleaseDate = releaseDate.toISOString();

  const isReleased = isBefore(releaseDate, now);
  const isComingSoon = daysUntilRelease <= 30 && daysUntilRelease > 0;

  let dynamicTitle: string;
  if (isReleased) {
    dynamicTitle = "GTA 6 is Here! | Grand Theft Auto VI Released";
  } else if (isComingSoon) {
    dynamicTitle = `GTA 6 Countdown - Only ${daysUntilRelease} Days Left! | Release ${formattedReleaseDate}`;
  } else if (daysUntilRelease > 0) {
    dynamicTitle = `GTA 6 Countdown - ${timeUntilRelease} | Release ${formattedReleaseDate}`;
  } else {
    dynamicTitle = `GTA 6 Release Date Countdown | Coming ${formattedReleaseDate}`;
  }

  let dynamicDescription: string;
  if (isReleased) {
    dynamicDescription = `Grand Theft Auto VI is now available! The most anticipated game in the series has finally been released. Get ready for the ultimate gaming experience.`;
  } else if (isComingSoon) {
    dynamicDescription = `Only ${daysUntilRelease} days until GTA 6! Track the final countdown to the release of Grand Theft Auto VI on ${formattedReleaseDate}. Don't miss the gaming event of the decade.`;
  } else if (yearsUntilRelease > 0) {
    dynamicDescription = `${yearsUntilRelease} ${yearsUntilRelease === 1 ? "year" : "years"} and ${daysUntilRelease % 365} days until GTA 6 releases on ${formattedReleaseDate}. Stay updated with our live countdown timer for Grand Theft Auto VI.`;
  } else if (monthsUntilRelease > 0) {
    dynamicDescription = `${monthsUntilRelease} ${monthsUntilRelease === 1 ? "month" : "months"} until GTA 6! Track every second leading up to the ${formattedReleaseDate} release of Grand Theft Auto VI.`;
  } else {
    dynamicDescription = `Live countdown to GTA 6 release on ${formattedReleaseDate}. Track the time remaining until Grand Theft Auto VI launches with our real-time countdown timer.`;
  }

  const dynamicKeywords = [
    "GTA 6",
    "Grand Theft Auto VI",
    "GTA 6 release date",
    "GTA 6 countdown",
    formattedReleaseDate,
    "Rockstar Games",
    ...(isComingSoon ? ["coming soon", "almost here"] : []),
    ...(isReleased
      ? ["available now", "released", "download"]
      : ["upcoming", "anticipated"]),
  ];

  return {
    metadataBase: new URL(DOMAIN),
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: dynamicKeywords.join(", "),
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      type: "website",
      url: DOMAIN,
      siteName: "GTA 6 Countdown",
      locale: "en_US",
      images: "/gta6.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: dynamicTitle,
      description: dynamicDescription,
      images: "/gta6.jpg",
      creator: "@sohom_829",
      site: "@sohom_829",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Grand Theft Auto VI Release",
        description: `The official release of GTA 6, ${timeUntilRelease}`,
        startDate: isoReleaseDate,
        eventStatus: isReleased
          ? "https://schema.org/EventScheduled"
          : "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        organizer: {
          "@type": "Organization",
          name: "Rockstar Games",
          url: "https://www.rockstargames.com",
        },
        offers: {
          "@type": "Offer",
          availability: isReleased
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          price: "69.99",
          priceCurrency: "USD",
        },
      }),
    },
    category: "Gaming",
    classification: "Entertainment",
    alternates: {
      canonical: DOMAIN,
      languages: {
        "en-US": DOMAIN,
      },
    },
  };
};

export default function Home() {
  return <CountdownTimer />;
}
