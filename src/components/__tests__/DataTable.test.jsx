import { describe, expect, it, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import DataTable from '../DataTable';
import { users, userColumns } from '../../mocks/users';

const rows = users.slice(0, 200);

function footer() {
  return document.querySelector('.data-table-footer span').textContent;
}

describe('DataTable', () => {
  it('renders a header for every column', () => {
    render(<DataTable columns={userColumns} rows={rows} />);
    userColumns.forEach((col) => {
      expect(screen.getByRole('columnheader', { name: col.label })).toBeInTheDocument();
    });
  });

  it('shows an empty state when there are no rows', () => {
    render(<DataTable columns={userColumns} rows={[]} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('hides the search box when searchable is false', () => {
    render(<DataTable columns={userColumns} rows={rows} searchable={false} />);
    expect(screen.queryByPlaceholderText('Search...')).toBeNull();
  });

  it('renders one page of rows', () => {
    render(<DataTable columns={userColumns} rows={rows} pageSize={10} />);
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('moves between pages', () => {
    render(<DataTable columns={userColumns} rows={rows} pageSize={10} />);
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(footer()).toBe('200 rows · page 2 of 20');
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(footer()).toBe('200 rows · page 1 of 20');
  });

  it('sorts numbers ascending then descending', () => {
    render(<DataTable columns={userColumns} rows={rows} />);
    const ageHeader = screen.getByRole('columnheader', { name: 'Age' });
    fireEvent.click(ageHeader);
    expect(ageHeader).toHaveAttribute('aria-sort', 'ascending');
    expect(within(screen.getAllByRole('row')[1]).getAllByRole('cell')[2].textContent).toBe('18');
    fireEvent.click(ageHeader);
    expect(ageHeader).toHaveAttribute('aria-sort', 'descending');
    expect(within(screen.getAllByRole('row')[1]).getAllByRole('cell')[2].textContent).toBe('80');
  });

  it('uses a custom cell renderer', () => {
    const columns = [{ key: 'name', label: 'Name', render: (value) => <strong>{value.toUpperCase()}</strong> }];
    render(<DataTable columns={columns} rows={rows.slice(0, 1)} />);
    expect(screen.getByText(rows[0].name.toUpperCase()).tagName).toBe('STRONG');
  });

  test.each([
    [1, 200],
    [2, 100],
    [3, 67],
    [4, 50],
    [5, 40],
    [6, 34],
    [7, 29],
    [8, 25],
    [9, 23],
    [10, 20],
    [11, 19],
    [12, 17],
    [13, 16],
    [14, 15],
    [15, 14],
    [16, 13],
    [17, 12],
    [18, 12],
    [19, 11],
    [20, 10],
    [21, 10],
    [22, 10],
    [23, 9],
    [24, 9],
    [25, 8],
    [26, 8],
    [27, 8],
    [28, 8],
    [29, 7],
    [30, 7],
    [31, 7],
    [32, 7],
    [33, 7],
    [34, 6],
    [35, 6],
    [36, 6],
    [37, 6],
    [38, 6],
    [39, 6],
    [40, 5],
    [41, 5],
    [42, 5],
    [43, 5],
    [44, 5],
    [45, 5],
    [46, 5],
    [47, 5],
    [48, 5],
    [49, 5],
    [50, 4],
    [51, 4],
    [52, 4],
    [53, 4],
    [54, 4],
    [55, 4],
    [56, 4],
    [57, 4],
    [58, 4],
    [59, 4],
    [60, 4],
    [61, 4],
    [62, 4],
    [63, 4],
    [64, 4],
    [65, 4],
    [66, 4],
    [67, 3],
    [68, 3],
    [69, 3],
    [70, 3],
    [71, 3],
    [72, 3],
    [73, 3],
    [74, 3],
    [75, 3],
    [76, 3],
    [77, 3],
    [78, 3],
    [79, 3],
    [80, 3],
    [81, 3],
    [82, 3],
    [83, 3],
    [84, 3],
    [85, 3],
    [86, 3],
    [87, 3],
    [88, 3],
    [89, 3],
    [90, 3],
    [91, 3],
    [92, 3],
    [93, 3],
    [94, 3],
    [95, 3],
    [96, 3],
    [97, 3],
    [98, 3],
    [99, 3],
    [100, 2],
  ])('pageSize %i gives %i pages', (pageSize, pages) => {
    render(<DataTable columns={userColumns} rows={rows} pageSize={pageSize} />);
    expect(footer()).toBe(`200 rows · page 1 of ${pages}`);
  });

  test.each([
    ["18", 15],
    ["19", 14],
    ["20", 3],
    ["21", 4],
    ["22", 5],
    ["23", 9],
    ["24", 5],
    ["25", 5],
    ["26", 5],
    ["27", 7],
    ["28", 4],
    ["29", 3],
    ["30", 7],
    ["31", 5],
    ["32", 6],
    ["33", 5],
    ["34", 5],
    ["35", 6],
    ["36", 7],
    ["37", 5],
    ["38", 4],
    ["39", 6],
    ["40", 4],
    ["41", 3],
    ["42", 6],
    ["43", 5],
    ["44", 4],
    ["45", 3],
    ["46", 4],
    ["47", 12],
    ["48", 7],
    ["49", 5],
    ["50", 4],
    ["51", 4],
    ["52", 6],
    ["53", 4],
    ["54", 5],
    ["55", 6],
    ["56", 7],
    ["57", 4],
    ["58", 8],
    ["59", 7],
    ["60", 4],
    ["61", 5],
    ["62", 4],
    ["63", 7],
    ["64", 7],
    ["65", 5],
    ["66", 4],
    ["67", 5],
    ["68", 5],
    ["69", 3],
    ["70", 3],
    ["71", 7],
    ["72", 5],
    ["73", 5],
    ["74", 5],
    ["75", 5],
    ["76", 4],
    ["77", 3],
    ["78", 7],
    ["79", 5],
    ["80", 5],
    ["@example", 200],
    ["aarav", 5],
    ["admin", 38],
    ["arjun", 12],
    ["austin", 11],
    ["ava", 7],
    ["berlin", 17],
    ["bro", 11],
    ["cairo", 18],
    ["chloe", 4],
    ["coh", 15],
    ["delhi", 10],
    ["dub", 19],
    ["dublin", 13],
    ["editor", 38],
    ["elena", 15],
    ["ethan", 4],
    ["felix", 9],
    ["gar", 5],
    ["guest", 45],
    ["had", 11],
    ["hana", 10],
    ["isla", 9],
    ["iva", 14],
    ["kai", 4],
    ["kim", 14],
    ["lagos", 15],
    ["leo", 8],
    ["liam", 6],
    ["lima", 10],
    ["lop", 12],
    ["lucas", 8],
    ["madrid", 11],
    ["mateo", 11],
    ["maya", 11],
    ["men", 6],
    ["mila", 5],
    ["mumbai", 18],
    ["mül", 14],
    ["nairobi", 5],
    ["ngu", 8],
    ["nina", 9],
    ["noah", 5],
    ["nov", 23],
    ["oka", 10],
    ["omar", 8],
    ["oslo", 17],
    ["owner", 43],
    ["pat", 14],
    ["prague", 11],
    ["priya", 7],
    ["qq", 0],
    ["ravi", 13],
    ["ros", 11],
    ["seoul", 12],
    ["sha", 5],
    ["sil", 10],
    ["sin", 6],
    ["smi", 8],
    ["sofia", 6],
    ["sydney", 9],
    ["tan", 9],
    ["tokyo", 13],
    ["toronto", 10],
    ["viewer", 36],
    ["xyz", 0],
    ["yuki", 10],
    ["zara", 14],
    ["zzz", 0],
  ])('search %j matches %i rows', (query, count) => {
    render(<DataTable columns={userColumns} rows={rows} />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: query } });
    expect(footer()).toBe(`${count} rows · page 1 of ${Math.max(1, Math.ceil(count / 10))}`);
  });
});
