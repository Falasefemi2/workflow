import { useExitRetirementForms } from "@/hooks/use-exitretirementform";
import { ExitRetirementTabs } from "./exitretirementtabs";
import { ResignationFormTab } from "./registrationtabs";
import { HandoverNotesTab } from "./handovertabs";
import { ExitInterviewFormTab } from "./exitinterviewformtabs";
import { ClearanceFormTab } from "./cleranceformtabs";
import { useNavigate } from "react-router";

export default function ExitRetirementPage() {
  const {
    activeTab,
    isSubmitting,
    resignationForm,
    handoverNotes,
    exitInterview,
    clearanceForm,
    setActiveTab,
    setResignationForm,
    setHandoverNotes,
    setExitInterview,
    setClearanceForm,
    handleResignationSubmit,
    handleHandoverSubmit,
    handleExitInterviewSubmit,
    handleClearanceSubmit,
  } = useExitRetirementForms();

  const naviagate = useNavigate();

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border/30">
        <button
          onClick={() => {
            naviagate(-1);
          }}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <span>←</span>
          <span>Return home</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <ExitRetirementTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto">
        {activeTab === "resignation" && (
          <ResignationFormTab
            formData={resignationForm}
            setFormData={setResignationForm}
            onSubmit={handleResignationSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {activeTab === "handover" && (
          <HandoverNotesTab
            formData={handoverNotes}
            setFormData={setHandoverNotes}
            onSubmit={handleHandoverSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {activeTab === "interview" && (
          <ExitInterviewFormTab
            formData={exitInterview}
            setFormData={setExitInterview}
            onSubmit={handleExitInterviewSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        {activeTab === "clearance" && (
          <ClearanceFormTab
            formData={clearanceForm}
            setFormData={setClearanceForm}
            onSubmit={handleClearanceSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
