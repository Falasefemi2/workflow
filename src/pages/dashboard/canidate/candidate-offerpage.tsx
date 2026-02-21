import { useCandidateOfferRequestManagement } from "@/hooks/use-candidateofferrequest";
import { CandidateLeaveRejectionModal } from "./candidate-rejectmodal";
import { CandidateLeaveApprovalModal } from "./candidate-approvalmodal";
import { CandidateLeaveTable } from "./candidate-offer-approval";
import Header from "@/components/shared/header";
export default function CandidateLeaveRequestPage() {
  const {
    leaves,
    isReviewModalOpen,
    reviewFormData,
    isSubmitting,
    showRejectionForm,
    handleViewDetails,
    handleCloseReview,
    handleApprove,
    handleRejectClick,
    handleReject,
    setReviewFormData,
  } = useCandidateOfferRequestManagement();

  return (
    <div className="pb-12">
      <Header />
      {/* Table */}
      <div className="mt-8">
        <CandidateLeaveTable
          leaves={leaves}
          onViewDetails={handleViewDetails}
        />
      </div>
      {/* Pagination Info */}
      <div className="mt-6 text-sm text-foreground/70 border-t border-border/30 pt-6">
        <p>
          Showing 1 - {Math.min(10, leaves.length)} of {leaves.length} entries
        </p>
      </div>
      {/* Approval Modal */}
      {!showRejectionForm && (
        <CandidateLeaveApprovalModal
          isOpen={isReviewModalOpen && !showRejectionForm}
          onClose={handleCloseReview}
          formData={reviewFormData}
          onApprove={handleApprove}
          onRejectClick={handleRejectClick}
          isSubmitting={isSubmitting}
        />
      )}
      {/* Rejection Modal */}
      {showRejectionForm && (
        <CandidateLeaveRejectionModal
          isOpen={isReviewModalOpen && showRejectionForm}
          onClose={handleCloseReview}
          formData={reviewFormData}
          setFormData={setReviewFormData}
          onSubmit={handleReject}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
