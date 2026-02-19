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
import { useEffect, useState } from "react";

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
    teamLeadSignature: "",
    hodSignature: "",
    systemNetworksSignature: "",
    financeSignature: "",
    hcmSignature: "",
    idCard: false,
    officialKeys: false,
    staffHandbook: false,
    appendSignature: false,
    comment: "",
  });

  useEffect(() => {
    if (!approval) {
      return;
    }
    setFormData({
      teamLeadSignature: approval.teamLeadSignature || "",
      hodSignature: approval.hodSignature || "",
      systemNetworksSignature: approval.systemNetworksSignature || "",
      financeSignature: approval.financeSignature || "",
      hcmSignature: approval.hcmSignature || "",
      idCard: approval.idCard || false,
      officialKeys: approval.officialKeys || false,
      staffHandbook: approval.staffHandbook || false,
      appendSignature: approval.appendSignature || false,
      comment: approval.comment || "",
    });
  }, [approval]);

  if (!approval) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-primary">Clearance Form Approval</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-8">
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

            <div>
              <h3 className="font-bold text-foreground mb-2">
                Human Capital Management
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Confirm all company properties have been returned.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="idcard"
                    checked={Boolean(formData.idCard)}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        idCard: checked === true,
                      })
                    }
                  />
                  <label htmlFor="idcard" className="text-sm text-foreground">
                    ID Card
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="keys"
                    checked={Boolean(formData.officialKeys)}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        officialKeys: checked === true,
                      })
                    }
                  />
                  <label htmlFor="keys" className="text-sm text-foreground">
                    Official Key(s)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="handbook"
                    checked={Boolean(formData.staffHandbook)}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        staffHandbook: checked === true,
                      })
                    }
                  />
                  <label htmlFor="handbook" className="text-sm text-foreground">
                    Staff Handbook
                  </label>
                </div>
              </div>
              <FormField label="Comment">
                <Input
                  value={formData.comment || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  placeholder="Write comment"
                />
              </FormField>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox
                  id="append-signature"
                  checked={Boolean(formData.appendSignature)}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      appendSignature: checked === true,
                    })
                  }
                />
                <label
                  htmlFor="append-signature"
                  className="text-sm text-foreground"
                >
                  Append Signature
                </label>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-center pt-6 border-t border-border/30">
          <Button onClick={handleSave} className="w-full bg-primary">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
