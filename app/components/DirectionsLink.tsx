"use client";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export default function DirectionsLink({
  href,
  storeName,
  className,
}: {
  href: string;
  storeName: string;
  className: string;
}) {
  const trackDirectionsClick = () => {
    (window as AnalyticsWindow).gtag?.("event", "directions_click", {
      link_url: href,
      store_name: storeName,
    });
  };

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener"
      aria-label={`Directions to ${storeName}`}
      onClick={trackDirectionsClick}
      data-directions-button=""
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 2.75a7.25 7.25 0 0 0-7.25 7.25c0 5.04 6.36 10.63 6.63 10.86a.95.95 0 0 0 1.24 0c.27-.23 6.63-5.82 6.63-10.86A7.25 7.25 0 0 0 12 2.75Zm0 10.08A2.83 2.83 0 1 1 12 7.17a2.83 2.83 0 0 1 0 5.66Z"
          fill="currentColor"
        />
      </svg>
      <span>Directions</span>
    </a>
  );
}
