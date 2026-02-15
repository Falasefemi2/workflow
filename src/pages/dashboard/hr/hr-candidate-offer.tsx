import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useCandidateOfferManagement } from "@/hooks/use-candidate-offer";
import { AddOfferModal } from "./hr-add-offer";
import { CandidateOfferTable } from "./hr-candidate-offer-table";
import { CandidateOfferTabs } from "./hr-candidate-offer-tabs";
import { UpdateStatusModal } from "./hr-update-offer";

export default function CandidateOfferPage() {
  const {
    activeTab,
    isAddOfferDialogOpen,
    isUpdateStatusDialogOpen,
    addOfferFormData,
    updateStatusFormData,
    updateAction,
    searchQuery,
    filteredOffers,
    setActiveTab,
    setSearchQuery,
    handleAddOffer,
    handleAddOfferSubmit,
    handleUpdateStatus,
    handleUpdateStatusSubmit,
    setIsAddOfferDialogOpen,
    setIsUpdateStatusDialogOpen,
    setAddOfferFormData,
    setUpdateStatusFormData,
  } = useCandidateOfferManagement();

  return (
    <div className="pb-12">
      <div className="flex items-center justify-end mb-8 pb-6 border-b border-border/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <Input
              type="text"
              placeholder="Search candidate"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <Button
            onClick={handleAddOffer}
            className="bg-primary text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Offer
          </Button>
        </div>
      </div>

      <CandidateOfferTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <CandidateOfferTable
        offers={filteredOffers}
        activeTab={activeTab}
        onUpdateStatus={handleUpdateStatus}
      />

      <AddOfferModal
        isOpen={isAddOfferDialogOpen}
        onClose={() => setIsAddOfferDialogOpen(false)}
        formData={addOfferFormData}
        setFormData={setAddOfferFormData}
        onSubmit={handleAddOfferSubmit}
      />

      <UpdateStatusModal
        isOpen={isUpdateStatusDialogOpen}
        onClose={() => setIsUpdateStatusDialogOpen(false)}
        formData={updateStatusFormData}
        setFormData={setUpdateStatusFormData}
        onSubmit={handleUpdateStatusSubmit}
        action={updateAction}
      />
    </div>
  );
}
