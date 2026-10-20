import { useRef, useState } from 'react';

export default function Tabs({ tabs = [], defaultIndex = 0, onChange }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const tabRefs = useRef([]);

  const selectTab = (index) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
    onChange?.(index, tabs[index]);
  };

  const nextEnabled = (start, step) => {
    let index = start;
    for (let i = 0; i < tabs.length; i++) {
      index = (index + step + tabs.length) % tabs.length;
      if (!tabs[index].disabled) return index;
    }
    return start;
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        selectTab(nextEnabled(activeIndex, 1));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        selectTab(nextEnabled(activeIndex, -1));
        break;
      case 'Home':
        e.preventDefault();
        selectTab(nextEnabled(-1, 1));
        break;
      case 'End':
        e.preventDefault();
        selectTab(nextEnabled(tabs.length, -1));
        break;
      default:
        break;
    }
  };

  if (tabs.length === 0) return null;

  const active = tabs[activeIndex];

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={tab.id ?? index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${index}`}
              aria-selected={selected}
              aria-controls={`tabpanel-${index}`}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              className={selected ? 'tab active' : 'tab'}
              onClick={() => selectTab(index)}
            >
              {tab.icon && <span className="tab-icon">{tab.icon}</span>}
              {tab.label}
              {tab.badge != null && <span className="tab-badge">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      <div
        className="tabs-panel"
        role="tabpanel"
        id={`tabpanel-${activeIndex}`}
        aria-labelledby={`tab-${activeIndex}`}
        tabIndex={0}
      >
        {typeof active.content === 'function' ? active.content() : active.content}
      </div>
    </div>
  );
}
