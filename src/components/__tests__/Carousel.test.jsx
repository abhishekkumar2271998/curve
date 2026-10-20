import { describe, expect, it, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import Carousel from '../Carousel';
import { slides } from '../../mocks/slides';

function currentDot() {
  return screen.getAllByLabelText(/Go to slide/).findIndex((dot) => dot.getAttribute('aria-current') === 'true');
}

describe('Carousel', () => {
  it('renders nothing without slides', () => {
    const { container } = render(<Carousel slides={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('goes to a slide from its dot', () => {
    render(<Carousel slides={slides.slice(0, 5)} autoPlay={false} />);
    fireEvent.click(screen.getByLabelText('Go to slide 4'));
    expect(currentDot()).toBe(3);
  });

  it('wraps backwards when looping', () => {
    render(<Carousel slides={slides.slice(0, 5)} autoPlay={false} />);
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(currentDot()).toBe(4);
  });

  it('disables the edges without loop', () => {
    render(<Carousel slides={slides.slice(0, 3)} autoPlay={false} loop={false} />);
    expect(screen.getByLabelText('Previous slide')).toBeDisabled();
  });

  it('advances with arrow keys', () => {
    render(<Carousel slides={slides.slice(0, 3)} autoPlay={false} />);
    fireEvent.keyDown(screen.getByRole('region'), { key: 'ArrowRight' });
    expect(currentDot()).toBe(1);
    fireEvent.keyDown(screen.getByRole('region'), { key: 'ArrowLeft' });
    expect(currentDot()).toBe(0);
  });

  it('auto-plays on a timer', () => {
    vi.useFakeTimers();
    render(<Carousel slides={slides.slice(0, 3)} interval={1000} />);
    act(() => vi.advanceTimersByTime(1000));
    expect(currentDot()).toBe(1);
    vi.useRealTimers();
  });

  test.each([
    [1, 5, 0, 0],
    [2, 7, 1, 1],
    [3, 3, 0, 2],
    [4, 6, 2, 3],
    [5, 8, 3, 4],
    [6, 0, 0, 0],
    [7, 11, 4, 6],
    [8, 1, 1, 1],
    [9, 1, 1, 1],
    [10, 9, 9, 9],
    [11, 2, 2, 2],
    [12, 3, 3, 3],
    [13, 6, 6, 6],
    [14, 0, 0, 0],
    [15, 3, 3, 3],
    [16, 7, 7, 7],
    [17, 6, 6, 6],
    [18, 8, 8, 8],
    [19, 11, 11, 11],
    [20, 1, 1, 1],
    [21, 1, 1, 1],
    [22, 10, 10, 10],
    [23, 8, 8, 8],
    [24, 7, 7, 7],
    [25, 11, 11, 11],
    [26, 2, 2, 2],
    [27, 3, 3, 3],
    [28, 11, 11, 11],
    [29, 3, 3, 3],
    [30, 3, 3, 3],
    [31, 5, 5, 5],
    [32, 1, 1, 1],
    [33, 0, 0, 0],
    [34, 4, 4, 4],
    [35, 0, 0, 0],
    [36, 9, 9, 9],
    [37, 6, 6, 6],
    [38, 1, 1, 1],
    [39, 4, 4, 4],
    [40, 10, 10, 10],
    [41, 9, 9, 9],
    [42, 7, 7, 7],
    [43, 3, 3, 3],
    [44, 1, 1, 1],
    [45, 5, 5, 5],
    [46, 3, 3, 3],
    [47, 9, 9, 9],
    [48, 1, 1, 1],
    [49, 1, 1, 1],
    [50, 12, 12, 12],
    [51, 4, 4, 4],
    [52, 12, 12, 12],
    [53, 9, 9, 9],
    [54, 8, 8, 8],
    [55, 11, 11, 11],
    [56, 10, 10, 10],
    [57, 12, 12, 12],
    [58, 3, 3, 3],
    [59, 0, 0, 0],
    [60, 7, 7, 7],
    [61, 11, 11, 11],
    [62, 4, 4, 4],
    [63, 8, 8, 8],
    [64, 2, 2, 2],
    [65, 10, 10, 10],
    [66, 12, 12, 12],
    [67, 11, 11, 11],
    [68, 11, 11, 11],
    [69, 0, 0, 0],
    [70, 7, 7, 7],
    [71, 3, 3, 3],
    [72, 12, 12, 12],
    [73, 6, 6, 6],
    [74, 5, 5, 5],
    [75, 1, 1, 1],
    [76, 1, 1, 1],
    [77, 8, 8, 8],
    [78, 9, 9, 9],
    [79, 3, 3, 3],
    [80, 9, 9, 9],
  ])('%i slides, %i next clicks -> slide %i (looping) / %i (no loop)', (count, clicks, looped, clamped) => {
    const { unmount } = render(<Carousel slides={slides.slice(0, count)} autoPlay={false} />);
    expect(screen.getAllByLabelText(/Go to slide/)).toHaveLength(count);
    for (let i = 0; i < clicks; i++) fireEvent.click(screen.getByLabelText('Next slide'));
    expect(currentDot()).toBe(looped);
    unmount();

    render(<Carousel slides={slides.slice(0, count)} autoPlay={false} loop={false} />);
    const next = screen.getByLabelText('Next slide');
    for (let i = 0; i < clicks && !next.disabled; i++) fireEvent.click(next);
    expect(currentDot()).toBe(clamped);
  });
});
