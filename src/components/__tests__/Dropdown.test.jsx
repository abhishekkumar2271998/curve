import { describe, expect, it, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import Dropdown from '../Dropdown';
import { options } from '../../mocks/options';

const sample = options.slice(0, 120);

describe('Dropdown', () => {
  it('shows the placeholder and is closed', () => {
    render(<Dropdown options={sample} />);
    expect(screen.getByRole('button', { name: /Select.../ })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('shows the selected label', () => {
    render(<Dropdown options={sample} value={sample[3].value} />);
    expect(screen.getByRole('button', { name: new RegExp(sample[3].label) })).toBeInTheDocument();
  });

  it('chooses an option with the mouse', () => {
    const onChange = vi.fn();
    const option = sample.find((o) => !o.disabled);
    render(<Dropdown options={sample} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('option', { name: option.label }));
    expect(onChange).toHaveBeenCalledWith(option.value, option);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('chooses an option with the keyboard', () => {
    const onChange = vi.fn();
    const items = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }];
    render(<Dropdown options={items} onChange={onChange} />);
    const root = document.querySelector('.dropdown');
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    fireEvent.keyDown(root, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('b', items[1]);
  });

  it('ignores disabled options', () => {
    const onChange = vi.fn();
    render(<Dropdown options={[{ value: 'x', label: 'X', disabled: true }]} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('option', { name: 'X' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes on Escape and outside clicks', () => {
    render(<Dropdown options={sample} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.keyDown(document.querySelector('.dropdown'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).toBeNull();
    fireEvent.click(screen.getByRole('button'));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  test.each([
    ["1", 22],
    ["10", 4],
    ["11", 0],
    ["12", 1],
    ["13", 1],
    ["14", 0],
    ["15", 0],
    ["16", 1],
    ["17", 2],
    ["18", 3],
    ["19", 0],
    ["2", 33],
    ["20", 3],
    ["21", 2],
    ["22", 2],
    ["23", 3],
    ["24", 0],
    ["25", 2],
    ["26", 4],
    ["27", 4],
    ["28", 0],
    ["29", 2],
    ["3", 23],
    ["30", 4],
    ["31", 3],
    ["32", 1],
    ["33", 1],
    ["34", 0],
    ["35", 1],
    ["36", 1],
    ["37", 1],
    ["38", 1],
    ["39", 0],
    ["4", 18],
    ["40", 1],
    ["41", 0],
    ["42", 4],
    ["43", 1],
    ["44", 2],
    ["45", 0],
    ["46", 1],
    ["47", 0],
    ["48", 2],
    ["49", 1],
    ["5", 18],
    ["50", 2],
    ["51", 2],
    ["52", 1],
    ["53", 1],
    ["54", 0],
    ["55", 2],
    ["56", 0],
    ["57", 3],
    ["58", 1],
    ["59", 0],
    ["6", 19],
    ["60", 2],
    ["61", 0],
    ["62", 2],
    ["63", 0],
    ["64", 1],
    ["65", 0],
    ["66", 1],
    ["67", 1],
    ["68", 1],
    ["69", 1],
    ["7", 23],
    ["70", 2],
    ["71", 1],
    ["72", 0],
    ["73", 1],
    ["74", 2],
    ["75", 0],
    ["76", 1],
    ["77", 1],
    ["78", 1],
    ["79", 1],
    ["8", 19],
    ["80", 0],
    ["81", 0],
    ["82", 0],
    ["83", 2],
    ["84", 1],
    ["85", 1],
    ["86", 0],
    ["87", 1],
    ["88", 0],
    ["89", 2],
    ["9", 23],
    ["90", 3],
    ["91", 2],
    ["92", 1],
    ["93", 0],
    ["94", 2],
    ["95", 1],
    ["96", 1],
    ["97", 0],
    ["98", 1],
    ["99", 1],
    ["atlas", 8],
    ["bo", 12],
    ["bold", 4],
    ["br", 15],
    ["breeze", 10],
    ["bright", 5],
    ["canyon", 4],
    ["comet", 7],
    ["cr", 5],
    ["crystal", 5],
    ["el", 12],
    ["electric", 5],
    ["ember", 5],
    ["falcon", 5],
    ["forest", 11],
    ["fr", 11],
    ["frozen", 11],
    ["ge", 11],
    ["gentle", 11],
    ["go", 9],
    ["golden", 9],
    ["harbor", 9],
    ["hi", 7],
    ["hidden", 7],
    ["lantern", 13],
    ["lu", 8],
    ["lunar", 8],
    ["meadow", 3],
    ["orbit", 7],
    ["pixel", 7],
    ["qu", 7],
    ["quiet", 7],
    ["qx", 0],
    ["ra", 12],
    ["rapid", 12],
    ["reef", 8],
    ["river", 5],
    ["river 1", 1],
    ["si", 8],
    ["silver", 8],
    ["so", 6],
    ["solar", 6],
    ["summit", 8],
    ["sw", 7],
    ["swift", 7],
    ["swift r", 1],
    ["ur", 6],
    ["urban", 6],
    ["valley", 10],
    ["wi", 16],
    ["wild", 9],
    ["zz", 0],
  ])('search %j shows %i options', (query, count) => {
    render(<Dropdown options={sample} searchable />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: query } });
    expect(screen.queryAllByRole('option')).toHaveLength(count);
    if (count === 0) expect(screen.getByText('No options')).toBeInTheDocument();
  });
});
