import { cn } from "@/lib/utils";

const PRIORITY_STYLES: Record<string, string> = {
  High: "text-danger border-danger/30 bg-danger/10",
  Medium: "text-warning border-warning/30 bg-warning/10",
  Low: "text-muted-foreground border-border bg-muted",
};

const PriorityBadge = ({ priority }: { priority: string }) => (
  <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-semibold border", PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low)}>
    {priority}
  </span>
);

export default PriorityBadge;
