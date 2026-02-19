"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-3 font-semibold text-gray-800 hover:text-orange-500 transition-colors text-sm">
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            !open && "-rotate-90"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}