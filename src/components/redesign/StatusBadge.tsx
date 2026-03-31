import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  "In Progress": { dot: "bg-info", text: "text-info", bg: "bg-info/10" },
  "Not Started": { dot: "bg-muted-foreground", text: "text-muted-foreground", bg: "bg-muted" },
  "Contacted": { dot: "bg-warning", text: "text-warning", bg: "bg-warning/10" },
  "Negotiating": { dot: "bg-primary", text: "text-primary", bg: "bg-primary/10" },
  "Signed": { dot: "bg-success", text: "text-success", bg: "bg-success/10" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES["Not Started"];
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold", s.text, s.bg)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
      {status}
    </span>
  );
};

export default StatusBadge;
