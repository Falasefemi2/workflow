import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">Workflow</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer" />
            <AvatarFallback>JO</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            Jennifer Okubike
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
