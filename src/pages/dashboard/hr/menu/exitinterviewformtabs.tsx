import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/form-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ExitInterviewFormData } from "@/hooks/use-exitretirementform";

interface ExitInterviewFormTabProps {
  formData: ExitInterviewFormData;
  setFormData: (data: ExitInterviewFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function ExitInterviewFormTab({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: ExitInterviewFormTabProps) {
  return (
    <ScrollArea className="h-[80vh] pr-4">
      <form onSubmit={onSubmit} className="space-y-6 pb-6">
        {/* Top Section - 3 Columns */}
        <div className="grid grid-cols-3 gap-6">
          <FormField label="Candidate Name">
            <Input
              value={formData.candidateName}
              onChange={(e) =>
                setFormData({ ...formData, candidateName: e.target.value })
              }
              readOnly
              className="bg-gray-50"
            />
          </FormField>
          <FormField label="Gender">
            <Input
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              readOnly
              className="bg-gray-50"
            />
          </FormField>
          <FormField label="Position Held">
            <Input
              value={formData.positionHeld}
              onChange={(e) =>
                setFormData({ ...formData, positionHeld: e.target.value })
              }
              readOnly
              className="bg-gray-50"
            />
          </FormField>
          <FormField label="Group/ Unit">
            <Input
              value={formData.groupUnit}
              onChange={(e) =>
                setFormData({ ...formData, groupUnit: e.target.value })
              }
              readOnly
              className="bg-gray-50"
            />
          </FormField>
          <FormField label="Date of Engagement">
            <Input
              value={formData.dateOfEngagement}
              onChange={(e) =>
                setFormData({ ...formData, dateOfEngagement: e.target.value })
              }
              readOnly
              className="bg-gray-50"
            />
          </FormField>
          <FormField label="Date of Disengagement">
            <Input
              value={formData.dateOfDisengagement}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dateOfDisengagement: e.target.value,
                })
              }
              readOnly
              className="bg-gray-50"
            />
          </FormField>
        </div>

        {/* Questions Grid - 3 Columns */}
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 */}
          <div className="space-y-6">
            <FormField label="What is your primary reason for leaving?">
              <textarea
                value={formData.primaryReasonForLeaving}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryReasonForLeaving: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What was least satisfying about your job?">
              <textarea
                value={formData.leastSatisfying}
                onChange={(e) =>
                  setFormData({ ...formData, leastSatisfying: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Did you receive adequate support to do your job?">
              <textarea
                value={formData.adequateSupport}
                onChange={(e) =>
                  setFormData({ ...formData, adequateSupport: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Did this company help you to fulfil your career goals?">
              <textarea
                value={formData.careerGoals}
                onChange={(e) =>
                  setFormData({ ...formData, careerGoals: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What was the quality of the supervision you received?">
              <textarea
                value={formData.supervisionQuality}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supervisionQuality: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Did any company policies or procedures make your job more difficult?">
              <textarea
                value={formData.policiesObstacles}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    policiesObstacles: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Would you recommend working for this company to your family and friends?">
              <textarea
                value={formData.recommendCompany}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recommendCompany: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What did you like least about this company?">
              <textarea
                value={formData.leastLiked}
                onChange={(e) =>
                  setFormData({ ...formData, leastLiked: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <FormField label="Did anything trigger your decision to leave?">
              <textarea
                value={formData.triggerDecision}
                onChange={(e) =>
                  setFormData({ ...formData, triggerDecision: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What would you change about your job?">
              <textarea
                value={formData.workplaceImprovement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workplaceImprovement: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Did you receive sufficient feedback about your performance between merit reviews?">
              <textarea
                value={formData.performanceFeedback}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    performanceFeedback: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What should be improved to make our workplace better?">
              <textarea
                value={formData.workplaceImprovement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workplaceImprovement: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What could your immediate supervisor do to improve his management style?">
              <textarea
                value={formData.supervisorManagement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supervisorManagement: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="If you are taking up another job, what does that job offer that your job here did not?">
              <textarea
                value={formData.newJobBenefits}
                onChange={(e) =>
                  setFormData({ ...formData, newJobBenefits: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="How do you generally feel about this company?">
              <textarea
                value={formData.overallFeelings}
                onChange={(e) =>
                  setFormData({ ...formData, overallFeelings: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <FormField label="What was most satisfying about your job?">
              <textarea
                value={formData.mostSatisfying}
                onChange={(e) =>
                  setFormData({ ...formData, mostSatisfying: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Did you receive enough training to do your job effectively?">
              <textarea
                value={formData.trainingEffective}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trainingEffective: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Were you satisfied with this company's merit review process?">
              <textarea
                value={formData.meritReviewProcess}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meritReviewProcess: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Were you happy with your pay, benefits and other incentives?">
              <textarea
                value={formData.payBenefitsIncentives}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payBenefitsIncentives: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Based on your experience with us, what do you think it takes to succeed in this company?">
              <textarea
                value={formData.experienceSuccessFactors}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceSuccessFactors: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="Would you consider working again for this company in the future?">
              <textarea
                value={formData.considReemployment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    considReemployment: e.target.value,
                  })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>

            <FormField label="What did you like most about this company?">
              <textarea
                value={formData.mostLiked}
                onChange={(e) =>
                  setFormData({ ...formData, mostLiked: e.target.value })
                }
                className="w-full p-3 border border-border/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              />
            </FormField>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            className="w-full bg-primary text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
}
