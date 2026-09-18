import Image from "next/image";

export function IPhoneFrame({
  className = "",
  priority = false,
  alt,
}: {
  className?: string;
  priority?: boolean;
  alt: string;
}) {
  return (
    <div className={`relative aspect-[1320/2868] ${className}`}>
      {/* Side hardware details keep the frame recognisable without competing with the forecast. */}
      <span aria-hidden className="absolute -left-[1.1%] top-[17%] h-[3.5%] w-[1.4%] rounded-l-sm bg-[#b86736]" />
      <span aria-hidden className="absolute -left-[1.1%] top-[23%] h-[7%] w-[1.4%] rounded-l-sm bg-[#c97842]" />
      <span aria-hidden className="absolute -left-[1.1%] top-[31%] h-[7%] w-[1.4%] rounded-l-sm bg-[#c97842]" />
      <span aria-hidden className="absolute -right-[1.1%] top-[25%] h-[10%] w-[1.4%] rounded-r-sm bg-[#b86736]" />

      <div
        className="absolute inset-0 overflow-hidden border border-[#6e391e] bg-[#ce7d46] p-[1.3%] shadow-[0_28px_44px_rgba(0,0,0,.52),inset_1px_1px_1px_rgba(255,225,192,.9),inset_-1px_-1px_1px_rgba(88,41,17,.5)]"
        style={{ borderRadius: "19% / 9.5%" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-[#050505] p-[1.3%]" style={{ borderRadius: "18% / 9%" }}>
          <div className="relative h-full w-full overflow-hidden bg-black" style={{ borderRadius: "16.5% / 8.25%" }}>
            <Image
              src="/migrainecast-forecast-iphone-17-pro-max.png"
              alt={alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 290px, 255px"
              className="object-cover object-top"
            />
            <span aria-hidden className="absolute left-1/2 top-[2.1%] h-[1.3%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
