/**
 * Sharp angular divider (default) vs the single curved divider reserved for hero->content handoff.
 * `flip` mirrors it vertically for use at the top or bottom of a section.
 */
export function AngularDivider({ fromColor = 'var(--cream)', toColor = 'var(--green-pale)', flip = false }) {
  return (
    <div className="divider-angular" aria-hidden="true" style={{ background: fromColor }}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
        <polygon points="0,10 100,0 100,10" fill={toColor} />
      </svg>
    </div>
  );
}

export function CurveDivider({ color = 'var(--green-pale)' }) {
  return (
    <div className="divider-curve" aria-hidden="true">
      <svg viewBox="0 0 500 100" preserveAspectRatio="none">
        <path d="M0,0 C150,100 350,100 500,0 L500,100 L0,100 Z" fill={color} />
      </svg>
    </div>
  );
}
