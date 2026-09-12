import React from "react"

export function CuteDoctorIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Cute Doctor Avatar"
    >
      <defs>
        {/* Soft gradient for doctor coat */}
        <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        {/* Scrub cap / headband gradient */}
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        {/* Stethoscope gradient */}
        <linearGradient id="stethGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Doctor Coat / Shoulders */}
      <g filter="url(#softShadow)">
        <path
          d="M24 116 C24 88 40 82 60 82 C80 82 96 88 96 116 Z"
          fill="url(#coatGrad)"
        />
        {/* Inner shirt / scrubs */}
        <path
          d="M50 82 L70 82 L65 102 L55 102 Z"
          fill="#38BDF8"
        />
        {/* Coat Lapels */}
        <path
          d="M44 82 L55 104 L42 116"
          stroke="#CBD5E1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M76 82 L65 104 L78 116"
          stroke="#CBD5E1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Stethoscope around neck */}
      <path
        d="M45 86 C42 98 48 108 52 108 C55 108 56 102 56 98"
        fill="none"
        stroke="url(#stethGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M75 86 C78 98 72 108 68 108 C65 108 64 102 64 98"
        fill="none"
        stroke="url(#stethGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Stethoscope bell / chest piece */}
      <circle cx="56" cy="108" r="4.5" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
      <circle cx="56" cy="108" r="1.5" fill="#0284C7" />

      {/* Ears */}
      <circle cx="28" cy="56" r="7" fill="#FCD34D" />
      <circle cx="28" cy="56" r="4" fill="#F59E0B" opacity="0.4" />
      <circle cx="92" cy="56" r="7" fill="#FCD34D" />
      <circle cx="92" cy="56" r="4" fill="#F59E0B" opacity="0.4" />

      {/* Cute Head / Face */}
      <ellipse cx="60" cy="54" rx="34" ry="32" fill="#FDE68A" />

      {/* Hair strands */}
      <path
        d="M32 46 C32 26 50 20 60 20 C70 20 88 26 88 46 C80 34 72 32 60 33 C48 32 40 34 32 46 Z"
        fill="#78350F"
      />

      {/* Doctor Cap / Headband */}
      <path
        d="M30 36 C34 20 46 12 60 12 C74 12 86 20 90 36 C80 30 70 28 60 28 C50 28 40 30 30 36 Z"
        fill="url(#capGrad)"
      />
      {/* Head mirror / Medical emblem badge */}
      <g filter="url(#softShadow)">
        <circle cx="60" cy="24" r="11" fill="#FFFFFF" />
        <circle cx="60" cy="24" r="9" fill="#0284C7" />
        {/* Red / White Medical Cross */}
        <rect x="58" y="18" width="4" height="12" rx="1" fill="#FFFFFF" />
        <rect x="54" y="22" width="12" height="4" rx="1" fill="#FFFFFF" />
      </g>

      {/* Cute Big Eyes */}
      {/* Left eye */}
      <ellipse cx="46" cy="54" rx="5.5" ry="7" fill="#1E293B" />
      <circle cx="44" cy="51" r="2.5" fill="#FFFFFF" />
      <circle cx="48" cy="57" r="1.2" fill="#FFFFFF" />

      {/* Right eye */}
      <ellipse cx="74" cy="54" rx="5.5" ry="7" fill="#1E293B" />
      <circle cx="72" cy="51" r="2.5" fill="#FFFFFF" />
      <circle cx="76" cy="57" r="1.2" fill="#FFFFFF" />

      {/* Cute Eyebrows */}
      <path d="M41 44 C44 41 49 42 51 44" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M79 44 C76 41 71 42 69 44" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

      {/* Cheerful Blush Cheeks */}
      <circle cx="39" cy="62" r="5.5" fill="#FB7185" opacity="0.6" />
      <circle cx="81" cy="62" r="5.5" fill="#FB7185" opacity="0.6" />

      {/* Cute Button Nose */}
      <ellipse cx="60" cy="58" rx="1.5" ry="1.2" fill="#D97706" />

      {/* Sweet Smile */}
      <path
        d="M54 64 C56 68 64 68 66 64"
        stroke="#1E293B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tiny tongue peek */}
      <path
        d="M57 66 C58 68 62 68 63 66 Z"
        fill="#F43F5E"
      />
    </svg>
  )
}
