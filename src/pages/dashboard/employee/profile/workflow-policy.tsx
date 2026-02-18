import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Download } from "lucide-react";
import { useWorkflowPolicyManagement } from "@/hooks/use-workflowpolicy";
import { policyNote } from "@/components/mockData";

export default function EmployeeProfileWorkflowPolicyPage() {
  const {
    policies,
    policySignatures,
    isSaving,
    handleSignatureChange,
    handleReadPolicy,
    handleSavePolicy,
  } = useWorkflowPolicyManagement();

  return (
    <div className="pb-12">
      {/* Policies Section */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-8">
          EQUALITY & DIVERSITY POLICY
        </h2>

        {/* Policy List */}
        <div className="space-y-8">
          {policies.map((policy) => (
            <div key={policy.id}>
              {/* Policy Link Section */}
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-6 flex items-center justify-between">
                <a
                  href={policy.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 hover:underline break-all flex-1"
                >
                  {policy.policyUrl}
                </a>
                <Button
                  onClick={() => handleReadPolicy(policy.policyUrl)}
                  className="bg-green-600 hover:bg-green-700 text-white ml-4 whitespace-nowrap flex items-center gap-2"
                >
                  <span>Read policy</span>
                  <ExternalLink size={16} />
                </Button>
              </div>

              {/* Signature Box */}
              <div className="border-2 border-dashed border-border/30 rounded-lg p-8 mb-6">
                <div className="flex items-center justify-between min-h-30">
                  <div className="flex items-center gap-4">
                    <Download size={24} className="text-foreground/50" />
                    <button
                      onClick={() => handleReadPolicy(policy.policyUrl)}
                      className="text-primary hover:text-primary/80 hover:underline font-medium"
                    >
                      Click here to append your signature
                    </button>
                  </div>
                  <div className="w-40 h-16 border-l-2 border-foreground/30 flex items-center justify-center">
                    {policySignatures[policy.id] && (
                      <p className="text-foreground/70 text-sm italic">
                        {policySignatures[policy.id]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Signature Input */}
              <div className="mb-6">
                <label className="block text-sm text-foreground/70 mb-3">
                  Signature
                </label>
                <Input
                  type="text"
                  placeholder="Enter your signature here"
                  value={policySignatures[policy.id] || ""}
                  onChange={(e) =>
                    handleSignatureChange(policy.id, e.target.value)
                  }
                  className="border-2"
                />
              </div>

              {/* Policy Note */}
              <div className="mb-6 p-4 bg-card border border-border/30 rounded">
                <p className="text-sm text-foreground/70">{policyNote}</p>
              </div>

              {/* Save Button */}
              <Button
                onClick={() => handleSavePolicy(policy)}
                disabled={isSaving}
                className="px-8"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>

              {/* Policy Status */}
              {policy.signed && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    ✓ Policy signed on{" "}
                    {policy.signedDate &&
                      new Date(policy.signedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
