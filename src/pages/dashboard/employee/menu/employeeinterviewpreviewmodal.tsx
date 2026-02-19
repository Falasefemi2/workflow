import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EmployeeExitInterview } from "@/components/mockData";

interface EmployeeExitInterviewPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: EmployeeExitInterview | null;
}

export function EmployeeExitInterviewPreviewModal({
  isOpen,
  onClose,
  interview,
}: EmployeeExitInterviewPreviewModalProps) {
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
      key: "careerGoals",
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
          <DialogTitle>Exit Interview form</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-primary">
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

            {/* Form Fields - 2 Column Layout */}
            <div className="space-y-8">
              {formFields.map((field, idx) => (
                <div
                  key={field.key}
                  className={idx % 2 === 0 ? "grid grid-cols-2 gap-6" : ""}
                >
                  <div>
                    <p className="font-medium text-foreground mb-2 text-sm">
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
                  {idx % 2 === 0 && idx + 1 < formFields.length && (
                    <div>
                      <p className="font-medium text-foreground mb-2 text-sm">
                        {formFields[idx + 1].label}
                      </p>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {
                          interview.formData[
                            formFields[idx + 1]
                              .key as keyof typeof interview.formData
                          ]
                        }
                      </p>
                    </div>
                  )}
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
