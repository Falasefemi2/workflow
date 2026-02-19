interface ExitRetirementTabsProps {
  activeTab: "resignation" | "handover" | "interview" | "clearance";
  onTabChange: (
    tab: "resignation" | "handover" | "interview" | "clearance",
  ) => void;
}

export function ExitRetirementTabs({
  activeTab,
  onTabChange,
}: ExitRetirementTabsProps) {
  const tabs = [
    { id: "resignation", label: "Resignation Form" },
    { id: "handover", label: "Handover Document" },
    { id: "interview", label: "Exit Interview Form" },
    { id: "clearance", label: "Clearance Form" },
  ] as const;

  return (
    <div className="flex gap-8 border-b border-border/30 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-4 px-1 font-medium transition-colors relative ${
            activeTab === tab.id
              ? "text-foreground"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
