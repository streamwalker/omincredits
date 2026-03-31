interface SectionHeadingProps {
  children: React.ReactNode;
  sub?: string;
}

const SectionHeading = ({ children, sub }: SectionHeadingProps) => (
  <div className="mb-6">
    <h2 className="text-[28px] font-bold text-foreground tracking-tight">{children}</h2>
    {sub && <p className="text-[15px] text-muted-foreground mt-1.5">{sub}</p>}
  </div>
);

export default SectionHeading;
