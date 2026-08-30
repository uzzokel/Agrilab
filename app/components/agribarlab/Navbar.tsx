import Logo from "./Logo";
import { theme } from "@/app/components/Styles";

export default function Navbar() {
  const { primaryColor, secondaryColor, neutralLight, neutralDark, neutralMuted,borderColor} = theme;
    const white = "#ffffff";

  return (
    <header 
      className="sticky top-6 z-50 w-[95%] max-w-7xl mx-auto rounded-2xl border shadow-md backdrop-blur-md bg-opacity-90"
      style={{ backgroundColor: neutralLight, borderColor: borderColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
      </div>
    </header>
  );
}