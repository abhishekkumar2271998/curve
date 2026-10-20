import { useEffect, useRef, useState } from 'react';

export default function Dropdown({ options = [], value, onChange, placeholder = 'Select...', searchable = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef(null);

  const filtered = query
    ? options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    setHighlighted(0);
  }, [query, open]);

  const choose = (option) => {
    if (option.disabled) return;
    onChange?.(option.value, option);
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ')) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlighted((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filtered[highlighted]) choose(filtered[highlighted]);
        break;
      case 'Escape':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dropdown" ref={rootRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {selected ? selected.label : placeholder}
        <span className="dropdown-caret" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {searchable && (
            <input
              type="text"
              className="dropdown-search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          )}
          <ul role="listbox">
            {filtered.length === 0 && <li className="dropdown-empty">No options</li>}
            {filtered.map((opt, index) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled}
                className={index === highlighted ? 'dropdown-option highlighted' : 'dropdown-option'}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => choose(opt)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
