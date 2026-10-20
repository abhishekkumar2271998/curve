import { describe, expect, it, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import Accordion from '../Accordion';
import { faqItems } from '../../mocks/faq';

function triggers() {
  return screen.getAllByRole('button').filter((b) => b.classList.contains('accordion-trigger'));
}

describe('Accordion', () => {
  it('opens defaultOpen items', () => {
    render(<Accordion items={faqItems.slice(0, 3)} defaultOpen={[1]} />);
    expect(triggers().map((b) => b.getAttribute('aria-expanded'))).toEqual(['false', 'true', 'false']);
  });

  it('toggles an item closed again', () => {
    render(<Accordion items={faqItems.slice(0, 2)} />);
    fireEvent.click(triggers()[0]);
    expect(triggers()[0]).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(triggers()[0]);
    expect(triggers()[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands and collapses all in multiple mode', () => {
    render(<Accordion items={faqItems.slice(0, 4)} allowMultiple />);
    fireEvent.click(screen.getByRole('button', { name: 'Expand all' }));
    triggers().forEach((b) => expect(b).toHaveAttribute('aria-expanded', 'true'));
    fireEvent.click(screen.getByRole('button', { name: 'Collapse all' }));
    triggers().forEach((b) => expect(b).toHaveAttribute('aria-expanded', 'false'));
  });

  it('hides controls when there is only one item', () => {
    render(<Accordion items={faqItems.slice(0, 1)} allowMultiple />);
    expect(screen.queryByRole('button', { name: 'Expand all' })).toBeNull();
  });

  test.each([
    [1, 0, 0],
    [2, 0, 1],
    [3, 0, 0],
    [4, 2, 0],
    [5, 4, 0],
    [6, 5, 1],
    [7, 5, 0],
    [8, 0, 6],
    [9, 1, 5],
    [10, 3, 7],
    [11, 2, 2],
    [12, 11, 10],
    [13, 12, 1],
    [14, 13, 5],
    [15, 5, 6],
    [16, 12, 8],
    [17, 14, 6],
    [18, 4, 6],
    [19, 12, 11],
    [20, 6, 7],
    [21, 15, 15],
    [22, 8, 13],
    [23, 1, 8],
    [24, 0, 13],
    [25, 14, 5],
    [26, 1, 25],
    [27, 26, 1],
    [28, 23, 14],
    [29, 16, 9],
    [30, 6, 13],
    [31, 3, 28],
    [32, 18, 9],
    [33, 18, 17],
    [34, 11, 27],
    [35, 0, 30],
    [36, 33, 4],
    [37, 29, 22],
    [38, 19, 14],
    [39, 28, 12],
    [40, 17, 30],
    [41, 24, 17],
    [42, 10, 30],
    [43, 14, 28],
    [44, 8, 1],
    [45, 15, 41],
    [46, 31, 24],
    [47, 14, 35],
    [48, 32, 41],
    [49, 9, 7],
    [50, 17, 46],
    [51, 23, 33],
    [52, 16, 44],
    [53, 6, 17],
    [54, 42, 33],
    [55, 51, 19],
    [56, 47, 25],
    [57, 1, 4],
    [58, 36, 56],
    [59, 6, 15],
    [60, 57, 18],
    [61, 16, 51],
    [62, 15, 48],
    [63, 61, 42],
    [64, 23, 63],
    [65, 0, 19],
    [66, 2, 41],
    [67, 53, 43],
    [68, 0, 61],
    [69, 24, 23],
    [70, 13, 39],
    [71, 54, 32],
    [72, 34, 25],
    [73, 51, 72],
    [74, 72, 45],
    [75, 12, 48],
    [76, 60, 25],
    [77, 31, 41],
    [78, 5, 43],
    [79, 45, 60],
    [80, 30, 68],
  ])('%i items, single mode: open %i then %i', (count, first, second) => {
    render(<Accordion items={faqItems.slice(0, count)} />);
    expect(triggers()).toHaveLength(count);
    fireEvent.click(triggers()[first]);
    fireEvent.click(triggers()[second]);
    const expanded = triggers().map((b) => b.getAttribute('aria-expanded') === 'true');
    const expected = Array.from({ length: count }, (_, i) => first === second ? false : i === second);
    expect(expanded).toEqual(expected);
  });

  test.each([
    [1, 0, 0],
    [2, 0, 1],
    [3, 0, 0],
    [4, 2, 0],
    [5, 4, 0],
    [6, 5, 1],
    [7, 5, 0],
    [8, 0, 6],
    [9, 1, 5],
    [10, 3, 7],
    [11, 2, 2],
    [12, 11, 10],
    [13, 12, 1],
    [14, 13, 5],
    [15, 5, 6],
    [16, 12, 8],
    [17, 14, 6],
    [18, 4, 6],
    [19, 12, 11],
    [20, 6, 7],
    [21, 15, 15],
    [22, 8, 13],
    [23, 1, 8],
    [24, 0, 13],
    [25, 14, 5],
    [26, 1, 25],
    [27, 26, 1],
    [28, 23, 14],
    [29, 16, 9],
    [30, 6, 13],
    [31, 3, 28],
    [32, 18, 9],
    [33, 18, 17],
    [34, 11, 27],
    [35, 0, 30],
    [36, 33, 4],
    [37, 29, 22],
    [38, 19, 14],
    [39, 28, 12],
    [40, 17, 30],
    [41, 24, 17],
    [42, 10, 30],
    [43, 14, 28],
    [44, 8, 1],
    [45, 15, 41],
    [46, 31, 24],
    [47, 14, 35],
    [48, 32, 41],
    [49, 9, 7],
    [50, 17, 46],
    [51, 23, 33],
    [52, 16, 44],
    [53, 6, 17],
    [54, 42, 33],
    [55, 51, 19],
    [56, 47, 25],
    [57, 1, 4],
    [58, 36, 56],
    [59, 6, 15],
    [60, 57, 18],
    [61, 16, 51],
    [62, 15, 48],
    [63, 61, 42],
    [64, 23, 63],
    [65, 0, 19],
    [66, 2, 41],
    [67, 53, 43],
    [68, 0, 61],
    [69, 24, 23],
    [70, 13, 39],
    [71, 54, 32],
    [72, 34, 25],
    [73, 51, 72],
    [74, 72, 45],
    [75, 12, 48],
    [76, 60, 25],
    [77, 31, 41],
    [78, 5, 43],
    [79, 45, 60],
    [80, 30, 68],
  ])('%i items, multiple mode: open %i then %i', (count, first, second) => {
    render(<Accordion items={faqItems.slice(0, count)} allowMultiple />);
    fireEvent.click(triggers()[first]);
    fireEvent.click(triggers()[second]);
    const expanded = triggers().map((b) => b.getAttribute('aria-expanded') === 'true');
    const expected = Array.from({ length: count }, (_, i) =>
      first === second ? false : i === first || i === second
    );
    expect(expanded).toEqual(expected);
  });
});
