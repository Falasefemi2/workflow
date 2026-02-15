import { useState } from "react";
import {
  mockCandidateOffers,
  type CandidateOffer,
} from "@/components/mockData";

export interface AddOfferFormData {
  employeeName: string;
  department: string;
  unit: string;
  level: string;
  proposedStartDate: string;
}

export interface UpdateStatusFormData {
  newStartDate: string;
  email: string;
  comment: string;
}

export function useCandidateOfferManagement() {
  const [offers, setOffers] = useState<CandidateOffer[]>(mockCandidateOffers);
  const [activeTab, setActiveTab] = useState<
    "Pending" | "Onboarded" | "Withdrawn" | "Rejected"
  >("Pending");

  // Add Offer Dialog
  const [isAddOfferDialogOpen, setIsAddOfferDialogOpen] = useState(false);
  const [addOfferFormData, setAddOfferFormData] = useState<AddOfferFormData>({
    employeeName: "",
    department: "",
    unit: "",
    level: "",
    proposedStartDate: "",
  });

  // Update Status Dialog
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] =
    useState(false);
  const [selectedOfferForUpdate, setSelectedOfferForUpdate] =
    useState<CandidateOffer | null>(null);
  const [updateStatusFormData, setUpdateStatusFormData] =
    useState<UpdateStatusFormData>({
      newStartDate: "",
      email: "",
      comment: "",
    });
  const [updateAction, setUpdateAction] = useState<
    "onboard" | "withdraw" | null
  >(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Get filtered offers by tab and search
  const getFilteredOffers = () => {
    return offers.filter(
      (offer) =>
        offer.status === activeTab &&
        offer.employeeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  // Add Offer
  const handleAddOffer = () => {
    setIsAddOfferDialogOpen(true);
  };

  const handleAddOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !addOfferFormData.employeeName ||
      !addOfferFormData.department ||
      !addOfferFormData.unit ||
      !addOfferFormData.level ||
      !addOfferFormData.proposedStartDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newOffer: CandidateOffer = {
      id: String(Date.now()),
      employeeName: addOfferFormData.employeeName,
      department: addOfferFormData.department,
      unit: addOfferFormData.unit,
      level: addOfferFormData.level,
      proposedStartDate: addOfferFormData.proposedStartDate,
      newStartDate: addOfferFormData.proposedStartDate,
      status: "Pending",
    };

    setOffers((prev) => [newOffer, ...prev]);
    setIsAddOfferDialogOpen(false);
    setAddOfferFormData({
      employeeName: "",
      department: "",
      unit: "",
      level: "",
      proposedStartDate: "",
    });
  };

  // Update Status (Onboard/Withdraw)
  const handleUpdateStatus = (
    offer: CandidateOffer,
    action: "onboard" | "withdraw",
  ) => {
    setSelectedOfferForUpdate(offer);
    setUpdateAction(action);
    setUpdateStatusFormData({
      newStartDate: offer.newStartDate,
      email: "",
      comment: "",
    });
    setIsUpdateStatusDialogOpen(true);
  };

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !updateStatusFormData.email ||
      !updateStatusFormData.comment ||
      !updateStatusFormData.newStartDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!selectedOfferForUpdate || !updateAction) {
      return;
    }

    const newStatus = updateAction === "onboard" ? "Onboarded" : "Withdrawn";

    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === selectedOfferForUpdate.id
          ? {
              ...offer,
              status: newStatus as "Onboarded" | "Withdrawn",
              newStartDate: updateStatusFormData.newStartDate,
            }
          : offer,
      ),
    );

    setIsUpdateStatusDialogOpen(false);
    setSelectedOfferForUpdate(null);
    setUpdateAction(null);
    setUpdateStatusFormData({
      newStartDate: "",
      email: "",
      comment: "",
    });
  };

  return {
    // State
    offers,
    activeTab,
    isAddOfferDialogOpen,
    isUpdateStatusDialogOpen,
    addOfferFormData,
    updateStatusFormData,
    selectedOfferForUpdate,
    updateAction,
    searchQuery,
    filteredOffers: getFilteredOffers(),

    // Handlers
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
  };
}
