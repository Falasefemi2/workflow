import { PageHeader } from "@/components/shared/page-header";

interface MenuPlaceholderPageProps {
  title: string;
  backTo?: string;
}

export default function MenuPlaceholderPage({
  title,
  backTo = "/dashboard/hr/menu",
}: MenuPlaceholderPageProps) {
  return (
    <div className="pb-12">
      <PageHeader title={title} backTo={backTo} />
      <div className="mt-8" />
    </div>
  );
}
