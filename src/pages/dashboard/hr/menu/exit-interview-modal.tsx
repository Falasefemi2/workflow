import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ExitInterview } from "@/components/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExitInterviewPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: ExitInterview | null;
}

export function ExitInterviewPreviewModal({
  isOpen,
  onClose,
  interview,
}: ExitInterviewPreviewModalProps) {
  if (!interview) return null;

  const formFields = [
    {
      label: "What is your primary reason for leaving?",
      key: "primaryReasonForLeaving",
    },
    {
      label: "Did anything trigger your decision to leave?",
      key: "triggerDecision",
    },
    {
      label: "What was most satisfying about your job?",
      key: "mostSatisfying",
    },
    {
      label: "What was least satisfying about your job?",
      key: "leastSatisfying",
    },
    {
      label: "Did you receive enough training to do your job effectively?",
      key: "trainingEffective",
    },
    {
      label: "Did you receive adequate support to do your job?",
      key: "adequateSupport",
    },
    {
      label:
        "Did you receive sufficient feedback about your performance between merit reviews?",
      key: "performanceFeedback",
    },
    {
      label: "Were you satisfied with this company's merit review process?",
      key: "meritReviewProcess",
    },
    {
      label: "Did this company help you to fulfil your career goals?",
      key: "careeerGoals",
    },
    {
      label: "What should be improved to make our workplace better?",
      key: "workplaceImprovement",
    },
    {
      label: "Were you happy with your pay, benefits and other incentives?",
      key: "payBenefitsIncentives",
    },
    {
      label: "What was the quality of the supervision you received?",
      key: "supervisionQuality",
    },
    {
      label:
        "What could your immediate supervisor do to improve his management style?",
      key: "supervisorManagement",
    },
    {
      label:
        "Based on your experience with us, what do you think it takes to succeed in this company?",
      key: "experienceSuccessFactors",
    },
    {
      label:
        "Did any company policies or procedures (or any other obstacles) make your job more difficult?",
      key: "policiesObstacles",
    },
    {
      label:
        "If you are taking up another job, what does that job offer that your job here did not?",
      key: "newJobBenefits",
    },
    {
      label: "Would you consider working again for this company in the future?",
      key: "considReemployment",
    },
    {
      label:
        "Would you recommend working for this company to your family and friends?",
      key: "recommendCompany",
    },
    {
      label: "How do you generally feel about this company?",
      key: "overallFeelings",
    },
    { label: "What did you like most about this company?", key: "mostLiked" },
    { label: "What did you like least about this company?", key: "leastLiked" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Exit Interview Form</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border/30">
              <div>
                <p className="text-sm text-foreground/70 mb-1">
                  Employee's Name
                </p>
                <p className="font-medium text-foreground">
                  {interview.employeeName}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/70 mb-1">Department</p>
                <p className="font-medium text-foreground">
                  {interview.department}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              {formFields.map((field) => (
                <div key={field.key} className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <p className="font-medium text-foreground mb-2">
                      {field.label}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {
                        interview.formData[
                          field.key as keyof typeof interview.formData
                        ]
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Close Button */}
        <div className="flex justify-center pt-6 border-t border-border/30">
          <Button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
