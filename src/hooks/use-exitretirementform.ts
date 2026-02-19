import { useState } from "react";

export interface ResignationFormData {
  alternativeEmail: string;
  disengagementDate: string;
  reasonForResignation: string;
  resignationLetter: File | null;
}

export interface HandoverNotesData {
  employeeName: string;
  date: string;
  handoverNotesFile: File | null;
  appendSignature: boolean;
}

export interface ExitInterviewFormData {
  candidateName: string;
  gender: string;
  positionHeld: string;
  groupUnit: string;
  dateOfEngagement: string;
  dateOfDisengagement: string;
  primaryReasonForLeaving: string;
  triggerDecision: string;
  mostSatisfying: string;
  leastSatisfying: string;
  trainingEffective: string;
  adequateSupport: string;
  performanceFeedback: string;
  meritReviewProcess: string;
  careerGoals: string;
  workplaceImprovement: string;
  payBenefitsIncentives: string;
  supervisionQuality: string;
  supervisorManagement: string;
  experienceSuccessFactors: string;
  policiesObstacles: string;
  newJobBenefits: string;
  considReemployment: string;
  recommendCompany: string;
  overallFeelings: string;
  mostLiked: string;
  leastLiked: string;
}

export interface ClearanceFormData {
  candidateName: string;
  designation: string;
  department: string;
  dateEmployed: string;
  dateOfLeavingService: string;
  appendSignature: boolean;
}

export function useExitRetirementForms() {
  const [activeTab, setActiveTab] = useState<
    "resignation" | "handover" | "interview" | "clearance"
  >("resignation");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resignationForm, setResignationForm] = useState<ResignationFormData>({
    alternativeEmail: "",
    disengagementDate: "",
    reasonForResignation: "",
    resignationLetter: null,
  });

  const [handoverNotes, setHandoverNotes] = useState<HandoverNotesData>({
    employeeName: "Adeolu Olabanji",
    date: "10/12/2025",
    handoverNotesFile: null,
    appendSignature: false,
  });

  const [exitInterview, setExitInterview] = useState<ExitInterviewFormData>({
    candidateName: "Adeolu Olabanji",
    gender: "Male",
    positionHeld: "Product Manager",
    groupUnit: "Business transformation and processes",
    dateOfEngagement: "10/02/2021",
    dateOfDisengagement: "10/05/2025",
    primaryReasonForLeaving:
      "I have decided to pursue a new opportunity that aligns with my long-term career goals and offers further avenues for professional growth.",
    triggerDecision: "Business transformation and processes",
    mostSatisfying: "Business transformation and processes",
    leastSatisfying: "Business transformation and processes",
    trainingEffective: "Business transformation and processes",
    adequateSupport: "Business transformation and processes",
    performanceFeedback: "Business transformation and processes",
    meritReviewProcess: "Business transformation and processes",
    careerGoals: "Business transformation and processes",
    workplaceImprovement: "Business transformation and processes",
    payBenefitsIncentives: "Business transformation and processes",
    supervisionQuality: "Business transformation and processes",
    supervisorManagement: "Business transformation and processes",
    experienceSuccessFactors: "Business transformation and processes",
    policiesObstacles: "Business transformation and processes",
    newJobBenefits: "Business transformation and processes",
    considReemployment: "Business transformation and processes",
    recommendCompany: "Business transformation and processes",
    overallFeelings: "Business transformation and processes",
    mostLiked: "Business transformation and processes",
    leastLiked: "Business transformation and processes",
  });

  const [clearanceForm, setClearanceForm] = useState<ClearanceFormData>({
    candidateName: "Adeolu Olabanji",
    designation: "Product Management",
    department: "Business Transformation & Processes",
    dateEmployed: "10/02/2019",
    dateOfLeavingService: "10/02/2021",
    appendSignature: false,
  });

  const handleResignationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !resignationForm.alternativeEmail ||
      !resignationForm.disengagementDate ||
      !resignationForm.resignationLetter
    ) {
      alert("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("Resignation form submitted:", resignationForm);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Resignation form saved successfully");
    } catch (error) {
      alert("Error submitting resignation form");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHandoverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handoverNotes.handoverNotesFile) {
      alert("Please upload handover notes");
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("Handover notes submitted:", handoverNotes);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Handover notes submitted successfully");
    } catch (error) {
      alert("Error submitting handover notes");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExitInterviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Exit interview submitted:", exitInterview);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Exit interview submitted successfully");
    } catch (error) {
      alert("Error submitting exit interview");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Clearance form submitted:", clearanceForm);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Clearance form submitted successfully");
    } catch (error) {
      alert("Error submitting clearance form");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    activeTab,
    isSubmitting,
    resignationForm,
    handoverNotes,
    exitInterview,
    clearanceForm,
    // Handlers
    setActiveTab,
    setResignationForm,
    setHandoverNotes,
    setExitInterview,
    setClearanceForm,
    handleResignationSubmit,
    handleHandoverSubmit,
    handleExitInterviewSubmit,
    handleClearanceSubmit,
  };
}
