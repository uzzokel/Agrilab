import Image from "next/image";
import { theme } from "@/app/components/Styles";


export default function Logo() {
  const { primaryColor, secondaryColor, neutralLight, neutralDark, neutralMuted } = theme;
  const white = "#ffffff";

  return (
    <div className="flex items-center  space-x-2 cursor-pointer">
      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white">
        <Image 
          src="/image3.jpg"
          alt="AgriLab Logo" 
          width={100} 
          height={100} 
          style={{ width: "auto", height: "auto" }}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight" style={{ color: neutralDark }}>
          <span className="text-lg font-bold leading-tight" style={{ color: primaryColor }}>Agri </span><span className="text-lg font-bold leading-tight" style={{ color: secondaryColor }}>Lab</span>
        </span>
        <span className="text-xs font-medium tracking-wide uppercase text-slate-500">
          M&E Platform
        </span>
      </div>
    </div>
  );
}