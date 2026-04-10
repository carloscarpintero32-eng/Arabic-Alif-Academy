import React from "react";
import {
  Play,
  Volume2,
  ArrowRight,
  ChevronLeft,
  X,
  LayoutGrid,
} from "lucide-react";

const palette = {
  majorelleBlue: "#1A3C6E",
  zelligeTeal: "#1F6F78",
  saffronGold: "#D89A2B",
  terracotta: "#C65A2E",
  warmSand: "#F4E9DA",
  softClay: "#E8D8C3",
  limewash: "#FBF6EE",
  plaster: "#F7F0E5",
  chalk: "#FFFDF9",
  charcoal: "#2E2A26",
  mutedBrown: "#7A6A58",
  deepTealInk: "#1F4E4E",
  dustyRose: "#C97A6D",
  border: "#D6C2A8",
  borderStrong: "#C9B190",
  shadow: "rgba(90, 62, 35, 0.10)",
  goldShadow: "rgba(216, 154, 43, 0.18)",
};

const forms = [
  {
    label: "ISOLATED",
    arabic: "أ",
    wordArabic: "أرنب",
    wordEnglish: "RABBIT",
  },
  {
    label: "INITIAL",
    arabic: "أ",
    wordArabic: "أسد",
    wordEnglish: "LION",
  },
  {
    label: "MEDIAL",
    arabic: "ـا",
    wordArabic: "رأس",
    wordEnglish: "HEAD",
  },
  {
    label: "FINAL",
    arabic: "ـا",
    wordArabic: "مرفأ",
    wordEnglish: "PORT",
  },
];

function plasterTexture(opacity = 0.16) {
  return {
    backgroundImage: `
      radial-gradient(circle at 18% 22%, rgba(255,255,255,${opacity}) 0 1px, transparent 1.5px),
      radial-gradient(circle at 78% 34%, rgba(122,106,88,${opacity * 0.38}) 0 1px, transparent 1.8px),
      radial-gradient(circle at 32% 76%, rgba(255,255,255,${opacity * 0.9}) 0 1px, transparent 2px),
      radial-gradient(circle at 64% 68%, rgba(122,106,88,${opacity * 0.34}) 0 1px, transparent 1.6px),
      linear-gradient(115deg, rgba(255,255,255,${opacity * 0.45}) 0%, transparent 32%, rgba(122,106,88,${opacity * 0.18}) 53%, transparent 72%),
      linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))
    `,
    backgroundSize: "120px 120px, 140px 140px, 160px 160px, 180px 180px, 100% 100%, 100% 100%",
    backgroundBlendMode: "soft-light, multiply, soft-light, multiply, overlay, normal",
  } as React.CSSProperties;
}

function zelligeTexture(opacity = 0.12) {
  return {
    backgroundImage: `
      linear-gradient(135deg, rgba(255,255,255,${opacity}) 25%, transparent 25%),
      linear-gradient(225deg, rgba(255,255,255,${opacity * 0.9}) 25%, transparent 25%),
      linear-gradient(315deg, rgba(0,0,0,${opacity * 0.15}) 25%, transparent 25%),
      linear-gradient(45deg, rgba(255,255,255,${opacity * 0.7}) 25%, transparent 25%)
    `,
    backgroundPosition: "12px 0, 12px 0, 0 0, 0 0",
    backgroundSize: "24px 24px",
    backgroundBlendMode: "soft-light",
  } as React.CSSProperties;
}

function MoroccanFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[42px] p-[6px] shadow-2xl" style={{ background: `linear-gradient(180deg, ${palette.borderStrong}, ${palette.border})`, boxShadow: `0 24px 60px ${palette.shadow}` }}>
      <div
        className="overflow-hidden rounded-[38px]"
        style={{ background: palette.plaster }}
      >
        {children}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div
      className="relative rounded-b-[34px] px-5 pb-4 pt-5 text-white"
      style={{
        background: `linear-gradient(135deg, ${palette.majorelleBlue} 0%, ${palette.zelligeTeal} 100%)`,
        boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.18)",
      }}
    >
      <div className="absolute inset-0 opacity-60" style={zelligeTexture(0.09)} />
      <div className="absolute inset-0 opacity-50" style={plasterTexture(0.08)} />
      <div className="relative flex items-center justify-between">
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition hover:bg-white/15" aria-label="Go back">
          <ChevronLeft size={24} />
        </button>

        <div className="text-[18px] font-semibold tracking-[0.01em]">
          Alif Academy
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition hover:bg-white/15" aria-label="Close">
          <X size={22} />
        </button>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="flex items-start justify-between gap-4 px-5 pt-6">
      <div>
        <h1
          className="text-[28px] font-semibold leading-none"
          style={{ color: palette.charcoal }}
        >
          Letter Alif <span style={{ color: palette.mutedBrown, fontWeight: 400 }}>/ a /</span>
        </h1>
      </div>
      <div
        className="rounded-full border px-3 py-1 text-[15px] font-semibold"
        style={{
          color: palette.terracotta,
          borderColor: `${palette.terracotta}33`,
          background: "rgba(198,90,46,0.06)",
        }}
      >
        1 / 7
      </div>
    </div>
  );
}

function VoiceLessonButton() {
  return (
    <button
      className="relative mx-5 mt-5 flex w-[calc(100%-2.5rem)] items-center justify-center gap-4 overflow-hidden rounded-[26px] border px-6 py-5 text-[15px] font-semibold tracking-[0.18em] transition-transform hover:scale-[1.01]"
      style={{
        color: palette.charcoal,
        borderColor: palette.borderStrong,
        background: `linear-gradient(180deg, ${palette.limewash}, ${palette.warmSand})`,
        boxShadow: `0 8px 20px ${palette.shadow}, inset 0 1px 0 rgba(255,255,255,0.65)`,
      }}
    >
      <div className="absolute inset-0 opacity-70" style={plasterTexture(0.14)} />
      <span
        className="relative grid h-12 w-12 place-items-center rounded-full border"
        style={{
          borderColor: palette.saffronGold,
          background: `linear-gradient(180deg, #E6B451, ${palette.saffronGold})`,
          color: palette.chalk,
          boxShadow: `0 6px 14px ${palette.goldShadow}, inset 0 1px 0 rgba(255,255,255,0.28)`,
        }}
      >
        <Play size={18} fill="currentColor" />
      </span>
      <span className="relative">PLAY VOICE LESSON</span>
    </button>
  );
}

function OrnamentalDivider() {
  return (
    <div className="mx-5 mt-4 flex items-center gap-3 opacity-80">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${palette.borderStrong}, transparent)` }} />
      <div className="text-[11px] tracking-[0.35em]" style={{ color: palette.saffronGold }}>
        ◆
      </div>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${palette.borderStrong}, transparent)` }} />
    </div>
  );
}

function LetterCard({
  label,
  arabic,
  wordArabic,
  wordEnglish,
}: {
  label: string;
  arabic: string;
  wordArabic: string;
  wordEnglish: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border p-4 pt-5"
      style={{
        background: `linear-gradient(180deg, ${palette.limewash}, ${palette.plaster})`,
        borderColor: palette.border,
        boxShadow: `0 10px 24px ${palette.shadow}, inset 0 1px 0 rgba(255,255,255,0.65)`,
      }}
    >
      <div className="absolute inset-0 opacity-80" style={plasterTexture(0.13)} />
      <div className="absolute inset-x-0 top-0 h-10 opacity-50" style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.6), transparent)` }} />

      <div className="relative mb-2 flex justify-end">
        <button
          className="grid h-8 w-8 place-items-center rounded-full"
          style={{ background: "rgba(216,154,43,0.08)", color: palette.saffronGold }}
          aria-label={`Play ${label.toLowerCase()} pronunciation`}
        >
          <Volume2 size={16} />
        </button>
      </div>

      <div
        className="relative text-center text-[62px] leading-none"
        style={{ color: palette.deepTealInk }}
        dir="rtl"
      >
        {arabic}
      </div>

      <div
        className="relative mt-10 text-center text-[13px] font-semibold tracking-[0.22em]"
        style={{ color: palette.mutedBrown }}
      >
        {label}
      </div>

      <div
        className="relative mt-10 text-center text-[48px] leading-none"
        style={{ color: palette.deepTealInk }}
        dir="rtl"
      >
        {wordArabic}
      </div>

      <div
        className="relative mt-3 text-center text-[14px] font-semibold tracking-[0.05em]"
        style={{ color: palette.mutedBrown }}
      >
        {wordEnglish}
      </div>
    </div>
  );
}

function TeachersNote() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] border px-4 py-4"
      style={{
        background: `linear-gradient(180deg, ${palette.warmSand}, ${palette.limewash})`,
        borderColor: palette.border,
        boxShadow: `0 8px 20px ${palette.shadow}, inset 0 1px 0 rgba(255,255,255,0.6)`,
      }}
    >
      <div className="absolute inset-0 opacity-75" style={plasterTexture(0.12)} />
      <div
        className="relative mb-2 text-[12px] font-semibold tracking-[0.2em]"
        style={{ color: palette.saffronGold }}
      >
        TEACHER&apos;S NOTE
      </div>
      <p
        className="relative text-[15px] leading-7"
        style={{ color: palette.charcoal }}
      >
        Like the “a” in “apple”. Keep your throat relaxed and make a short,
        clean sound.
      </p>
    </div>
  );
}

function NextLetterButton() {
  return (
    <button
      className="relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-[28px] px-6 py-5 text-[20px] font-semibold text-white transition-transform hover:scale-[1.01]"
      style={{
        background: `linear-gradient(135deg, ${palette.majorelleBlue} 0%, ${palette.zelligeTeal} 100%)`,
        boxShadow: `0 16px 28px rgba(26,60,110,0.24), inset 0 1px 0 rgba(255,255,255,0.18)`,
      }}
    >
      <div className="absolute inset-0 opacity-50" style={zelligeTexture(0.1)} />
      <div className="absolute inset-0 opacity-35" style={plasterTexture(0.08)} />
      <span className="relative">Next Letter</span>
      <ArrowRight className="relative" size={24} />
    </button>
  );
}

function BackToGroupsButton() {
  return (
    <button
      className="relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-[20px] border px-4 py-4 text-[16px] font-medium"
      style={{
        color: palette.mutedBrown,
        borderColor: palette.border,
        background: `linear-gradient(180deg, ${palette.limewash}, ${palette.warmSand})`,
      }}
    >
      <div className="absolute inset-0 opacity-60" style={plasterTexture(0.1)} />
      <LayoutGrid className="relative" size={17} />
      <span className="relative">Back to Groups</span>
    </button>
  );
}

export default function AlifAcademyMoroccoRedesign() {
  return (
    <div
      className="min-h-screen w-full px-3 py-6 sm:px-6"
      style={{
        background: `radial-gradient(circle at top, #FBF6EE 0%, ${palette.warmSand} 45%, #EBDDC8 100%)`,
      }}
    >
      <div className="mx-auto max-w-[520px]">
        <MoroccanFrame>
          <div className="relative min-h-screen" style={{ background: palette.plaster }}>
            <div className="absolute inset-0" style={plasterTexture(0.16)} />
            <div className="absolute inset-x-0 top-0 h-40 opacity-30" style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.8), transparent)` }} />

            <div className="relative">
              <TopBar />
              <HeaderRow />
              <VoiceLessonButton />
              <OrnamentalDivider />

              <main className="px-5 pb-7 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {forms.map((item) => (
                    <LetterCard key={item.label} {...item} />
                  ))}
                </div>

                <div className="mt-5">
                  <TeachersNote />
                </div>

                <NextLetterButton />
                <BackToGroupsButton />
              </main>
            </div>
          </div>
        </MoroccanFrame>
      </div>
    </div>
  );
}
