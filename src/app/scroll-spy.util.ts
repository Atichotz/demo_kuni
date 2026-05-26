export class ScrollSpy {
  private readonly listener: () => void;

  /**
   * @param sectionIds - ordered list of element IDs to track
   * @param onActiveChange - called with the active section ID on each scroll
   */
  constructor(sectionIds: string[], onActiveChange: (id: string) => void) {
    this.listener = () => {
      const midLine = window.innerHeight / 2;
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= midLine) active = id;
      }
      onActiveChange(active);
    };
  }

  start(): void {
    window.addEventListener('scroll', this.listener, { passive: true });
    this.listener();
  }

  stop(): void {
    window.removeEventListener('scroll', this.listener);
  }
}
