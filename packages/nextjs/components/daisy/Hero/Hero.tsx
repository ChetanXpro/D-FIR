import React from "react";

export interface HeroProps {
  heading: string;
  subHeading: string;
  onCtaClick: () => void;
}

export default function Hero(props: HeroProps) {
  const { heading, subHeading, onCtaClick } = props;
  return (
    <div className="hero h-full bg-base-200 items-center justify-center mt-16">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{heading}</h1>
          <p className="py-6">{subHeading}</p>
          <button className="btn btn-primary" onClick={() => onCtaClick && onCtaClick()}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
