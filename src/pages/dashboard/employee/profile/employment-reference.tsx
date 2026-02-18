import { Button } from "@/components/ui/button";
import { useEmploymentReferenceManagement } from "@/hooks/use-employementrefrence";
import { Pencil } from "lucide-react";
import { EmploymentReferenceModal } from "./employmentrefrencemodal";

export default function EmployeeProfileEmploymentReferencePage() {
  const {
    references,
    isEditModalOpen,
    isAddModalOpen,
    editFormData,
    isSubmitting,
    handleEditRecord,
    handleAddNewRecord,
    handleCloseEditModal,
    handleCloseAddModal,
    handleSaveEdit,
    handleSaveNew,
    setEditFormData,
  } = useEmploymentReferenceManagement();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="pb-12">
      {/* Employment Reference Section */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">
            EMPLOYMENT REFERENCE
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                references.length > 0 && handleEditRecord(references[0])
              }
              className="flex items-center gap-2 text-primary hover:text-primary/80"
              disabled={references.length === 0}
            >
              <Pencil size={18} />
              <span className="font-medium">Edit record</span>
            </button>
            <Button onClick={handleAddNewRecord}>Add New Record</Button>
          </div>
        </div>

        {/* References Display */}
        {references.length > 0 ? (
          <div className="space-y-6">
            {references.map((reference) => (
              <div
                key={reference.id}
                className="grid grid-cols-2 gap-6 p-4 bg-card border border-border/30 rounded-lg"
              >
                {/* Row 1 */}
                <div>
                  <p className="text-sm text-foreground/70 mb-1">
                    Company Name
                  </p>
                  <p className="font-medium text-foreground">
                    {reference.companyName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Designation</p>
                  <p className="font-medium text-foreground">
                    {reference.designation}
                  </p>
                </div>

                {/* Row 2 */}
                <div className="col-span-2">
                  <p className="text-sm text-foreground/70 mb-2">
                    Period Of Work
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {formatDate(reference.periodOfWorkStart)}
                      </p>
                    </div>
                    <div className="text-foreground/70">to</div>
                    <div>
                      <p className="font-medium text-foreground">
                        {formatDate(reference.periodOfWorkEnd)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <p className="text-sm text-foreground/70 mb-1">
                    Responsibilities
                  </p>
                  <p className="font-medium text-foreground">
                    {reference.responsibilities || "N/A"}
                  </p>
                </div>

                {/* Row 4 */}
                <div>
                  <p className="text-sm text-foreground/70 mb-1">
                    Contact Of HOD
                  </p>
                  <p className="font-medium text-foreground">
                    {reference.contactOfHOD}
                  </p>
                </div>

                {/* Row 5 */}
                <div>
                  <p className="text-sm text-foreground/70 mb-1">HOD's Email</p>
                  <p className="font-medium text-foreground">
                    {reference.hodEmail}
                  </p>
                </div>

                {/* Row 6 */}
                <div>
                  <p className="text-sm text-foreground/70 mb-1">
                    Contact Of HR
                  </p>
                  <p className="font-medium text-foreground">
                    {reference.contactOfHR}
                  </p>
                </div>

                {/* Row 7 */}
                <div>
                  <p className="text-sm text-foreground/70 mb-1">
                    Contact Of HR (Email)
                  </p>
                  <p className="font-medium text-foreground">
                    {reference.hrEmail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-foreground/70">
            <p>No employment references found</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EmploymentReferenceModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        formData={editFormData}
        setFormData={setEditFormData}
        onSubmit={handleSaveEdit}
        isSubmitting={isSubmitting}
        isEditMode={true}
      />

      {/* Add Modal */}
      <EmploymentReferenceModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        formData={editFormData}
        setFormData={setEditFormData}
        onSubmit={handleSaveNew}
        isSubmitting={isSubmitting}
        isEditMode={false}
      />
    </div>
  );
}
