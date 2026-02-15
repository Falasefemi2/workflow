import type { CandidateOffer, OfferStatus } from "@/components/mockData";

interface CandidateOfferTableProps {
  offers: CandidateOffer[];
  activeTab: OfferStatus;
  onUpdateStatus: (
    offer: CandidateOffer,
    action: "onboard" | "withdraw",
  ) => void;
}

export function CandidateOfferTable({
  offers,
  activeTab,
  onUpdateStatus,
}: CandidateOfferTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Onboarded":
        return "text-green-600";
      case "Withdrawn":
        return "text-gray-600";
      case "Rejected":
        return "text-red-600";
      default:
        return "text-foreground";
    }
  };

  const renderActionButton = (offer: CandidateOffer) => {
    switch (activeTab) {
      case "Pending":
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateStatus(offer, "onboard")}
              className="text-primary font-medium text-sm"
            >
              Update
            </button>
          </div>
        );
      case "Onboarded":
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateStatus(offer, "withdraw")}
              className="text-primary font-medium text-sm"
            >
              Withdraw
            </button>
          </div>
        );
      default:
        return <span className="text-foreground/50 text-sm">-</span>;
    }
  };

  return (
    <div className="overflow-x-auto border border-border/30 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-border/30">
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              S/N
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Employee Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Department
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Unit
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Level
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Proposed start date
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              New start date
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-primary">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr
              key={offer.id}
              className="border-b border-border/30 hover:bg-secondary/10 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-foreground">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-foreground">
                {offer.employeeName}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {offer.department}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {offer.unit}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {offer.level}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {formatDate(offer.proposedStartDate)}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">
                {formatDate(offer.newStartDate)}
              </td>
              <td
                className={`px-6 py-4 text-sm font-semibold ${getStatusColor(offer.status)}`}
              >
                {offer.status}
              </td>
              <td className="px-6 py-4 text-sm">{renderActionButton(offer)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {offers.length === 0 && (
        <div className="text-center py-8 text-foreground/70">
          <p>No offers found</p>
        </div>
      )}
    </div>
  );
}
