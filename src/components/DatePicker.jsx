import { useState } from 'react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date) {
  if (!date) return '';
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function DatePicker({ value, onChange, minDate, maxDate, placeholder = 'Pick a date' }) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState((value ?? today).getFullYear());
  const [viewMonth, setViewMonth] = useState((value ?? today).getMonth());

  const cells = buildCalendar(viewYear, viewMonth);

  const isDisabled = (date) =>
    (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
    (maxDate && date > maxDate);

  const shiftMonth = (step) => {
    const next = new Date(viewYear, viewMonth + step, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const select = (date) => {
    if (isDisabled(date)) return;
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className="date-picker">
      <input
        type="text"
        readOnly
        className="date-picker-input"
        value={formatDate(value)}
        placeholder={placeholder}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      />

      {open && (
        <div className="date-picker-popup" role="dialog" aria-label="Choose date">
          <div className="date-picker-header">
            <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button>
            <span>{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month">›</button>
          </div>

          <div className="date-picker-grid" role="grid">
            {WEEKDAYS.map((day) => (
              <div key={day} className="date-picker-weekday">{day}</div>
            ))}
            {cells.map((date, index) =>
              date ? (
                <button
                  key={index}
                  type="button"
                  disabled={isDisabled(date)}
                  className={[
                    'date-picker-day',
                    isSameDay(date, value) && 'selected',
                    isSameDay(date, today) && 'today',
                  ].filter(Boolean).join(' ')}
                  onClick={() => select(date)}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div key={index} className="date-picker-empty" />
              )
            )}
          </div>

          <div className="date-picker-footer">
            <button type="button" onClick={() => select(today)}>Today</button>
            <button type="button" onClick={() => { onChange?.(null); setOpen(false); }}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}
