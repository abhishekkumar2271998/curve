import { useState } from 'react';

function AccordionItem({ item, index, isOpen, onToggle }) {
  const headerId = `accordion-header-${index}`;
  const panelId = `accordion-panel-${index}`;

  return (
    <div className={isOpen ? 'accordion-item open' : 'accordion-item'}>
      <h3 className="accordion-heading">
        <button
          type="button"
          id={headerId}
          className="accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={item.disabled}
          onClick={() => onToggle(index)}
        >
          <span>{item.title}</span>
          <span className="accordion-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="accordion-panel"
        hidden={!isOpen}
      >
        {item.content}
      </div>
    </div>
  );
}

export default function Accordion({ items = [], allowMultiple = false, defaultOpen = [] }) {
  const [openIndexes, setOpenIndexes] = useState(() => new Set(defaultOpen));

  const toggle = (index) => {
    setOpenIndexes((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIndexes(new Set(items.map((_, index) => index)));
  };

  const collapseAll = () => {
    setOpenIndexes(new Set());
  };

  return (
    <div className="accordion">
      {allowMultiple && items.length > 1 && (
        <div className="accordion-controls">
          <button type="button" onClick={expandAll}>
            Expand all
          </button>
          <button type="button" onClick={collapseAll}>
            Collapse all
          </button>
        </div>
      )}

      {items.map((item, index) => (
        <AccordionItem
          key={item.id ?? index}
          item={item}
          index={index}
          isOpen={openIndexes.has(index)}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}
