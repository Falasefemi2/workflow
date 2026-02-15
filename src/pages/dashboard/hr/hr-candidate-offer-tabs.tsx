import type { OfferStatus } from "@/components/mockData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CandidateOfferTabsProps {
  activeTab: OfferStatus;
  onTabChange: (tab: OfferStatus) => void;
}

export function CandidateOfferTabs({
  activeTab,
  onTabChange,
}: CandidateOfferTabsProps) {
  const tabs: OfferStatus[] = ["Pending", "Onboarded", "Withdrawn", "Rejected"];

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as OfferStatus)}
      className="w-full mb-8"
    >
      <TabsList
        variant="line"
        className="w-full grid grid-cols-2 md:grid-cols-4 p-0 rounded-none border-b border-border/30"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-none px-1 pb-4 pt-2 text-sm font-medium text-foreground/70 hover:text-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
