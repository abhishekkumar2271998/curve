import { describe, expect, it, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import Tabs from '../Tabs';

function makeTabs(count) {
  return Array.from({ length: count }, (_, i) => ({ id: i, label: `Tab ${i}`, content: `Content ${i}` }));
}

describe('Tabs', () => {
  it('renders nothing without tabs', () => {
    const { container } = render(<Tabs tabs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('starts at defaultIndex', () => {
    render(<Tabs tabs={makeTabs(4)} defaultIndex={2} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
  });

  it('calls onChange with the index and tab', () => {
    const onChange = vi.fn();
    const tabs = makeTabs(3);
    render(<Tabs tabs={tabs} onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));
    expect(onChange).toHaveBeenCalledWith(1, tabs[1]);
  });

  it('skips disabled tabs with the keyboard', () => {
    const tabs = makeTabs(3);
    tabs[1].disabled = true;
    render(<Tabs tabs={tabs} />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
  });

  it('supports Home and End', () => {
    render(<Tabs tabs={makeTabs(5)} defaultIndex={2} />);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'End' });
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 4');
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'Home' });
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 0');
  });

  it('renders render-function content and badges', () => {
    render(<Tabs tabs={[{ label: 'A', badge: 3, content: () => 'Lazy' }]} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Lazy');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test.each([
    [1, 0, 0, 0],
    [2, 1, 0, 0],
    [3, 0, 1, 2],
    [4, 1, 2, 0],
    [5, 1, 2, 0],
    [6, 5, 0, 4],
    [7, 6, 0, 5],
    [8, 3, 4, 2],
    [9, 6, 7, 5],
    [10, 0, 1, 9],
    [11, 10, 0, 9],
    [12, 8, 9, 7],
    [13, 4, 5, 3],
    [14, 9, 10, 8],
    [15, 12, 13, 11],
    [16, 6, 7, 5],
    [17, 15, 16, 14],
    [18, 17, 0, 16],
    [19, 7, 8, 6],
    [20, 1, 2, 0],
    [21, 13, 14, 12],
    [22, 6, 7, 5],
    [23, 19, 20, 18],
    [24, 21, 22, 20],
    [25, 12, 13, 11],
    [26, 6, 7, 5],
    [27, 26, 0, 25],
    [28, 16, 17, 15],
    [29, 9, 10, 8],
    [30, 11, 12, 10],
    [31, 4, 5, 3],
    [32, 25, 26, 24],
    [33, 26, 27, 25],
    [34, 18, 19, 17],
    [35, 17, 18, 16],
    [36, 15, 16, 14],
    [37, 7, 8, 6],
    [38, 26, 27, 25],
    [39, 16, 17, 15],
    [40, 38, 39, 37],
    [41, 31, 32, 30],
    [42, 0, 1, 41],
    [43, 7, 8, 6],
    [44, 25, 26, 24],
    [45, 37, 38, 36],
    [46, 12, 13, 11],
    [47, 16, 17, 15],
    [48, 44, 45, 43],
    [49, 8, 9, 7],
    [50, 36, 37, 35],
    [51, 11, 12, 10],
    [52, 41, 42, 40],
    [53, 37, 38, 36],
    [54, 7, 8, 6],
    [55, 42, 43, 41],
    [56, 15, 16, 14],
    [57, 8, 9, 7],
    [58, 45, 46, 44],
    [59, 2, 3, 1],
    [60, 14, 15, 13],
  ])('%i tabs: select %i, right -> %i, left -> %i', (count, start, right, left) => {
    render(<Tabs tabs={makeTabs(count)} />);
    expect(screen.getAllByRole('tab')).toHaveLength(count);
    fireEvent.click(screen.getByRole('tab', { name: `Tab ${start}` }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent(`Content ${start}`);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' });
    expect(screen.getByRole('tabpanel')).toHaveTextContent(`Content ${right}`);
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' });
    expect(screen.getByRole('tabpanel')).toHaveTextContent(`Content ${left}`);
  });
});
