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
        className="w-full grid grid-cols-2 md:grid-cols-4 p-0"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="
              rounded-none 
              px-1 
              pb-4 
              pt-2 
              text-sm 
              font-medium 
              text-foreground/70 
              hover:text-foreground 
              border-b-2 
              border-transparent
            "
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
