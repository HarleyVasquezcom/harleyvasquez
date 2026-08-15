interface SectionHeadingProps {
  id: string;
  title: string;
  kicker?: string;
  titleClassName?: string;
}

export function SectionHeading({ id, title, kicker, titleClassName = 'gradient-text' }: SectionHeadingProps) {
  return (
    <div className="mb-12 lg:mb-16 animate-fade-in-up">
      {kicker ? (
        <p className="mb-3 font-mono text-sm font-medium text-accent" aria-hidden="true">
          {kicker}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-4xl sm:text-5xl font-bold tracking-tight ${titleClassName}`}
      >
        {title}
      </h2>
    </div>
  );
}