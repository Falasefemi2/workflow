import { mockWorkflowPolicies, type WorkPolicy } from "@/components/mockData";
import { useState } from "react";

export function useWorkflowPolicyManagement() {
  const [policies, setPolicies] = useState<WorkPolicy[]>(mockWorkflowPolicies);
  const [policySignatures, setPolicySignatures] = useState<{
    [key: string]: string;
  }>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSignatureChange = (policyId: string, signature: string) => {
    setPolicySignatures({
      ...policySignatures,
      [policyId]: signature,
    });
  };

  const handleReadPolicy = (policyUrl: string) => {
    window.open(policyUrl, "_blank");
  };

  const handleSavePolicy = async (policy: WorkPolicy) => {
    const signature = policySignatures[policy.id];

    if (!signature) {
      alert("Please append your signature before saving");
      return;
    }

    setIsSaving(true);
    try {
      // Update policy signed status
      setPolicies(
        policies.map((p) =>
          p.id === policy.id
            ? {
                ...p,
                signed: true,
                signature: signature,
                signedDate: new Date().toISOString(),
              }
            : p,
        ),
      );

      console.log("Policy signed:", { policyId: policy.id, signature });
      alert("Policy signed successfully");

      // Clear signature input
      setPolicySignatures({
        ...policySignatures,
        [policy.id]: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to save policy signature");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    // State
    policies,
    policySignatures,
    isSaving,
    // Handlers
    handleSignatureChange,
    handleReadPolicy,
    handleSavePolicy,
  };
}
