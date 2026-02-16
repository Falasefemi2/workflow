import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/shared/form-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ClearanceFormApproval } from "@/components/mockData";
import { useState } from "react";

interface ClearanceFormApprovalReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  approval: ClearanceFormApproval | null;
  onSave: (formData: Partial<ClearanceFormApproval>) => void;
}

export function ClearanceFormApprovalReviewModal({
  isOpen,
  onClose,
  approval,
  onSave,
}: ClearanceFormApprovalReviewModalProps) {
  const [formData, setFormData] = useState<Partial<ClearanceFormApproval>>({
    teamLeadSignature: approval?.teamLeadSignature || "",
    hodSignature: approval?.hodSignature || "",
    systemNetworksSignature: approval?.systemNetworksSignature || "",
    financeSignature: approval?.financeSignature || "",
    hcmSignature: approval?.hcmSignature || "",
    idCard: approval?.idCard || false,
    officialKeys: approval?.officialKeys || false,
    staffHandbook: approval?.staffHandbook || false,
    appendSignature: approval?.appendSignature || false,
    comment: approval?.comment || "",
  });

  if (!approval) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Clearance Approval</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-8">
            {/* Staff Details Section */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Staff Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Candidate Name">
                  <Input
                    value={approval.staffName}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormField>
                <FormField label="Designation">
                  <Input
                    value={approval.designation}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormField>
                <FormField label="Department">
                  <Input
                    value={approval.department}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormField>
                <FormField label="Date Employed">
                  <Input
                    value={approval.dateEmployed}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormField>
                <FormField label="Date of Leaving Service">
                  <Input
                    value={approval.dateOfLeavingService}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={approval.signature}
                    readOnly
                    className="bg-gray-100"
                  />
                </FormField>
              </div>
            </div>

            {/* Team Lead Section */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the Team Lead
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                The staff has documented his hand-over of all projects assigned
                to him and submitted same to me
              </p>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date Employed">
                  <Input
                    type="date"
                    value={
                      formData.teamLeadSignature?.toString().split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamLeadSignature: e.target.value,
                      })
                    }
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={formData.teamLeadSignature || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamLeadSignature: e.target.value,
                      })
                    }
                  />
                </FormField>
              </div>
            </div>

            {/* HOD Section 1 */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the HOD
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                The staff has documented his hand-over of all projects assigned
                to him and submitted same to me
              </p>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date Employed">
                  <Input
                    type="date"
                    value={
                      formData.hodSignature?.toString().split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, hodSignature: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Signature">
                  <Input
                    value={formData.hodSignature || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, hodSignature: e.target.value })
                    }
                  />
                </FormField>
              </div>
              <FormField label="Comment">
                <Input placeholder="Clearance Approved" />
              </FormField>
            </div>

            {/* HOD Section 2 */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the HOD
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date Employed">
                  <Input type="date" />
                </FormField>
                <FormField label="Signature">
                  <Input />
                </FormField>
              </div>
              <FormField label="Comment">
                <Input placeholder="Clearance Approved" />
              </FormField>
            </div>

            {/* System & Networks Section */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the System & Networks
              </h3>
              <ul className="text-sm text-foreground/70 mb-4 space-y-1">
                <li>
                  • The staff has submitted all the company property in his/her
                  possession (please list).
                </li>
                <li>
                  • He/she has been deleted from all log-in details on the
                  hosting platform (where applicable).
                </li>
                <li>
                  • Immediate change of all web config passwords of all
                  applications he/she has interface with.
                </li>
              </ul>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date Employed">
                  <Input type="date" />
                </FormField>
                <FormField label="Signature">
                  <Input />
                </FormField>
              </div>
              <FormField label="Comment">
                <Input placeholder="Clearance Approved" />
              </FormField>
            </div>

            {/* Finance Section */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the Head of Finance
              </h3>
              <ul className="text-sm text-foreground/70 mb-4">
                <li>
                  • The staff's outstanding liabilities have been fully settled.
                </li>
              </ul>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date Employed">
                  <Input type="date" />
                </FormField>
                <FormField label="Signature">
                  <Input />
                </FormField>
              </div>
              <FormField label="Comment">
                <Input placeholder="Clearance Approved" />
              </FormField>
            </div>

            {/* HCM Section */}
            <div>
              <h3 className="font-bold text-foreground mb-2">
                To be completed by the Human Capital Management
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                The staff has submitted the following company property in
                his/her possession
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="idcard"
                    checked={formData.idCard}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        idCard: checked as unknown as boolean,
                      })
                    }
                  />
                  <label
                    htmlFor="idcard"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    ID Card
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="keys"
                    checked={formData.officialKeys}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        officialKeys: checked as unknown as boolean,
                      })
                    }
                  />
                  <label
                    htmlFor="keys"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    Official Key(s)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="handbook"
                    checked={formData.staffHandbook}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        staffHandbook: checked as unknown as boolean,
                      })
                    }
                  />
                  <label
                    htmlFor="handbook"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    Staff Handbook
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField label="Date Employed">
                  <Input type="date" />
                </FormField>
                <div></div>
              </div>
              <FormField label="Comment">
                <Input
                  placeholder="-- Write comment--"
                  value={formData.comment || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                />
              </FormField>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox
                  id="appendsig"
                  checked={formData.appendSignature}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      appendSignature: checked as unknown as boolean,
                    })
                  }
                />
                <label
                  htmlFor="appendsig"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Append Signature
                </label>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Save Button */}
        <div className="flex justify-center pt-6 border-t border-border/30">
          <Button onClick={handleSave} className="w-full bg-primary text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
