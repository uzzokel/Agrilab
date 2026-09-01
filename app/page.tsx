import { theme } from "@/app/components/Styles";

export default function Home() {
  const { primaryColor, secondaryColor, neutralLight, neutralDark, neutralMuted, borderColor } = theme;
  const white = "#ffffff";

  return (
    <main 
    className=" w-full " 
      style={{ backgroundColor:  borderColor, color: neutralLight }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 py-20" style={{ color: primaryColor }}>
            AgriLab M&E Platform
          </h1>
          <p className="text-lg" style={{ color: neutralMuted }}>
            Decentralized monitoring, evaluation, and impact tracking system.
          </p>
        </div>

        {/* Inline content instead of a boxed card */}
        <div className="pt-4 border-t" style={{ borderColor: theme.borderColor }}>
          <span 
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2"
            style={{ backgroundColor: secondaryColor, color: white }}
          >
            Active Project
          </span>
          <h2 className="text-xl font-semibold" style={{ color:  primaryColor }}>
            Fadama & IFAD Impact Dashboard
          </h2>
        </div>
      </div>
    </main>
  );
}