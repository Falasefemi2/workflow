import { PageHeader } from "@/components/shared/page-header";

interface MenuPlaceholderPageProps {
  title: string;
}

export default function MenuPlaceholderPage({ title }: MenuPlaceholderPageProps) {
  return (
    <div className="pb-12">
      <PageHeader title={title} backTo="/dashboard/hr/menu" />
      <div className="mt-8" />
    </div>
  );
}
