import { describe, expect, it, test, vi } from 'vitest';
import { act, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from '../Toast';

function Trigger({ type = 'show', message = 'Hello', options }) {
  const toast = useToast();
  return (
    <button type="button" onClick={() => toast[type](message, options)}>
      fire
    </button>
  );
}

describe('Toast', () => {
  it('throws outside a provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow('useToast must be used inside a ToastProvider');
    console.error.mockRestore();
  });

  it('dismisses with the close button', () => {
    render(<ToastProvider><Trigger message="Bye" /></ToastProvider>);
    fireEvent.click(screen.getByText('fire'));
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(screen.queryByText('Bye')).toBeNull();
  });

  it('auto-dismisses after its duration', () => {
    vi.useFakeTimers();
    render(<ToastProvider><Trigger message="Soon gone" options={{ duration: 1000 }} /></ToastProvider>);
    fireEvent.click(screen.getByText('fire'));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.queryByText('Soon gone')).toBeNull();
    vi.useRealTimers();
  });

  it('keeps at most `max` toasts', () => {
    render(<ToastProvider max={3}><Trigger options={{ duration: 0 }} /></ToastProvider>);
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByText('fire'));
    expect(screen.getAllByText('Hello')).toHaveLength(3);
  });

  it('runs an action and closes', () => {
    const onClick = vi.fn();
    render(<ToastProvider><Trigger message="Deleted" options={{ action: { label: 'Undo', onClick } }} /></ToastProvider>);
    fireEvent.click(screen.getByText('fire'));
    fireEvent.click(screen.getByText('Undo'));
    expect(onClick).toHaveBeenCalled();
    expect(screen.queryByText('Deleted')).toBeNull();
  });

  it('applies the position class', () => {
    render(<ToastProvider position="top-left"><span /></ToastProvider>);
    expect(document.querySelector('.toast-container')).toHaveClass('toast-top-left');
  });

  test.each([
    ["info", "Golden Ember event 0", "status"],
    ["error", "Solar River event 1", "alert"],
    ["error", "Wild Meadow event 2", "alert"],
    ["error", "Solar Valley event 3", "alert"],
    ["success", "Quiet Summit event 4", "status"],
    ["warning", "Solar Forest event 5", "status"],
    ["info", "Bright Summit event 6", "status"],
    ["success", "Bold Reef event 7", "status"],
    ["success", "Gentle River event 8", "status"],
    ["success", "Bold Meadow event 9", "status"],
    ["info", "Hidden Lantern event 10", "status"],
    ["error", "Bright River event 11", "alert"],
    ["info", "Frozen Summit event 12", "status"],
    ["success", "Hidden Lantern event 13", "status"],
    ["info", "Solar Falcon event 14", "status"],
    ["error", "Wild Orbit event 15", "alert"],
    ["error", "Golden Reef event 16", "alert"],
    ["error", "Lunar Orbit event 17", "alert"],
    ["error", "Golden Summit event 18", "alert"],
    ["warning", "Quiet Breeze event 19", "status"],
    ["warning", "Gentle Atlas event 20", "status"],
    ["success", "Electric Meadow event 21", "status"],
    ["warning", "Bright Summit event 22", "status"],
    ["success", "Lunar Falcon event 23", "status"],
    ["warning", "Urban Breeze event 24", "status"],
    ["warning", "Bold Meadow event 25", "status"],
    ["success", "Electric Pixel event 26", "status"],
    ["success", "Frozen Harbor event 27", "status"],
    ["success", "Golden Meadow event 28", "status"],
    ["info", "Bright Falcon event 29", "status"],
    ["info", "Frozen Falcon event 30", "status"],
    ["success", "Solar Ember event 31", "status"],
    ["info", "Bright Atlas event 32", "status"],
    ["info", "Electric Lantern event 33", "status"],
    ["info", "Gentle Meadow event 34", "status"],
    ["warning", "Golden Orbit event 35", "status"],
    ["warning", "Silver Valley event 36", "status"],
    ["info", "Electric Canyon event 37", "status"],
    ["success", "Silver Meadow event 38", "status"],
    ["error", "Urban Orbit event 39", "alert"],
    ["success", "Gentle Atlas event 40", "status"],
    ["success", "Silver River event 41", "status"],
    ["warning", "Crystal Meadow event 42", "status"],
    ["success", "Golden Breeze event 43", "status"],
    ["success", "Urban Valley event 44", "status"],
    ["warning", "Urban Forest event 45", "status"],
    ["success", "Swift Forest event 46", "status"],
    ["success", "Crystal Lantern event 47", "status"],
    ["warning", "Frozen River event 48", "status"],
    ["warning", "Electric Valley event 49", "status"],
    ["info", "Bold Atlas event 50", "status"],
    ["info", "Silver River event 51", "status"],
    ["warning", "Urban Comet event 52", "status"],
    ["info", "Lunar Forest event 53", "status"],
    ["error", "Electric Orbit event 54", "alert"],
    ["success", "Urban Ember event 55", "status"],
    ["success", "Silver Valley event 56", "status"],
    ["error", "Gentle Orbit event 57", "alert"],
    ["success", "Frozen Reef event 58", "status"],
    ["error", "Lunar Summit event 59", "alert"],
    ["success", "Solar Meadow event 60", "status"],
    ["info", "Wild Harbor event 61", "status"],
    ["error", "Solar Harbor event 62", "alert"],
    ["success", "Hidden River event 63", "status"],
    ["warning", "Silver Meadow event 64", "status"],
    ["warning", "Golden Harbor event 65", "status"],
    ["warning", "Wild Forest event 66", "status"],
    ["info", "Hidden Valley event 67", "status"],
    ["warning", "Urban Pixel event 68", "status"],
    ["error", "Gentle Atlas event 69", "alert"],
    ["success", "Wild Summit event 70", "status"],
    ["warning", "Silver Falcon event 71", "status"],
    ["error", "Urban Harbor event 72", "alert"],
    ["warning", "Bold River event 73", "status"],
    ["warning", "Golden Forest event 74", "status"],
    ["success", "Golden Pixel event 75", "status"],
    ["info", "Quiet Orbit event 76", "status"],
    ["success", "Silver Harbor event 77", "status"],
    ["info", "Silver Meadow event 78", "status"],
    ["info", "Silver Harbor event 79", "status"],
    ["warning", "Crystal Canyon event 80", "status"],
    ["warning", "Hidden Ember event 81", "status"],
    ["error", "Electric Breeze event 82", "alert"],
    ["warning", "Swift Canyon event 83", "status"],
    ["info", "Lunar Orbit event 84", "status"],
    ["info", "Urban Lantern event 85", "status"],
    ["warning", "Hidden River event 86", "status"],
    ["info", "Urban Summit event 87", "status"],
    ["error", "Frozen Reef event 88", "alert"],
    ["success", "Lunar Valley event 89", "status"],
    ["error", "Urban Lantern event 90", "alert"],
    ["error", "Crystal Canyon event 91", "alert"],
    ["error", "Hidden Forest event 92", "alert"],
    ["warning", "Silver Canyon event 93", "status"],
    ["success", "Wild Meadow event 94", "status"],
    ["success", "Bright Forest event 95", "status"],
    ["success", "Swift Lantern event 96", "status"],
    ["info", "Quiet Lantern event 97", "status"],
    ["success", "Bold Forest event 98", "status"],
    ["info", "Crystal Reef event 99", "status"],
    ["info", "Bright Reef event 100", "status"],
    ["error", "Hidden Ember event 101", "alert"],
    ["warning", "Golden Summit event 102", "status"],
    ["success", "Golden River event 103", "status"],
    ["info", "Gentle Ember event 104", "status"],
    ["error", "Wild River event 105", "alert"],
    ["success", "Swift Falcon event 106", "status"],
    ["info", "Solar Forest event 107", "status"],
    ["success", "Lunar Forest event 108", "status"],
    ["error", "Rapid Canyon event 109", "alert"],
    ["info", "Lunar Falcon event 110", "status"],
    ["warning", "Silver Orbit event 111", "status"],
    ["success", "Gentle River event 112", "status"],
    ["warning", "Silver Ember event 113", "status"],
    ["success", "Quiet Falcon event 114", "status"],
    ["error", "Urban Ember event 115", "alert"],
    ["success", "Frozen Ember event 116", "status"],
    ["success", "Gentle Summit event 117", "status"],
    ["success", "Urban Forest event 118", "status"],
    ["success", "Electric Ember event 119", "status"],
    ["info", "Lunar Canyon event 120", "status"],
    ["error", "Silver Breeze event 121", "alert"],
    ["error", "Golden Pixel event 122", "alert"],
    ["error", "Crystal Canyon event 123", "alert"],
    ["info", "Bright Forest event 124", "status"],
    ["success", "Silver Forest event 125", "status"],
    ["success", "Hidden Canyon event 126", "status"],
    ["success", "Solar Summit event 127", "status"],
    ["error", "Bright Reef event 128", "alert"],
    ["warning", "Swift Breeze event 129", "status"],
    ["error", "Electric Breeze event 130", "alert"],
    ["info", "Quiet Ember event 131", "status"],
    ["warning", "Silver River event 132", "status"],
    ["info", "Bold Pixel event 133", "status"],
    ["info", "Hidden Atlas event 134", "status"],
    ["error", "Wild Canyon event 135", "alert"],
    ["error", "Golden Comet event 136", "alert"],
    ["error", "Gentle Lantern event 137", "alert"],
    ["warning", "Electric Summit event 138", "status"],
    ["info", "Hidden Breeze event 139", "status"],
    ["error", "Solar Breeze event 140", "alert"],
    ["error", "Silver Comet event 141", "alert"],
    ["info", "Hidden Valley event 142", "status"],
    ["error", "Rapid Lantern event 143", "alert"],
    ["success", "Lunar Valley event 144", "status"],
    ["success", "Bold Ember event 145", "status"],
    ["info", "Frozen Lantern event 146", "status"],
    ["success", "Swift Atlas event 147", "status"],
    ["warning", "Electric Meadow event 148", "status"],
    ["error", "Wild Lantern event 149", "alert"],
    ["info", "Frozen Breeze event 150", "status"],
    ["error", "Swift River event 151", "alert"],
    ["error", "Crystal Reef event 152", "alert"],
    ["warning", "Solar Lantern event 153", "status"],
    ["error", "Bold Harbor event 154", "alert"],
    ["success", "Crystal Canyon event 155", "status"],
    ["error", "Frozen Pixel event 156", "alert"],
    ["warning", "Frozen Valley event 157", "status"],
    ["success", "Urban Canyon event 158", "status"],
    ["error", "Crystal River event 159", "alert"],
    ["warning", "Crystal Valley event 160", "status"],
    ["info", "Silver Breeze event 161", "status"],
    ["info", "Lunar Summit event 162", "status"],
    ["info", "Quiet Summit event 163", "status"],
    ["error", "Hidden Atlas event 164", "alert"],
    ["info", "Urban Breeze event 165", "status"],
    ["warning", "Quiet River event 166", "status"],
    ["success", "Bold Orbit event 167", "status"],
    ["warning", "Golden Pixel event 168", "status"],
    ["info", "Rapid Falcon event 169", "status"],
    ["warning", "Electric Lantern event 170", "status"],
    ["success", "Electric Orbit event 171", "status"],
    ["info", "Solar Ember event 172", "status"],
    ["success", "Swift Meadow event 173", "status"],
    ["error", "Solar River event 174", "alert"],
    ["info", "Swift Forest event 175", "status"],
    ["info", "Solar Breeze event 176", "status"],
    ["error", "Golden Comet event 177", "alert"],
    ["success", "Swift Comet event 178", "status"],
    ["error", "Crystal Canyon event 179", "alert"],
    ["warning", "Rapid Atlas event 180", "status"],
    ["warning", "Wild Atlas event 181", "status"],
    ["info", "Electric River event 182", "status"],
    ["info", "Electric Summit event 183", "status"],
    ["error", "Quiet River event 184", "alert"],
    ["info", "Rapid Ember event 185", "status"],
    ["warning", "Golden Falcon event 186", "status"],
    ["success", "Bold Lantern event 187", "status"],
    ["warning", "Bold Meadow event 188", "status"],
    ["info", "Urban Reef event 189", "status"],
    ["warning", "Lunar Ember event 190", "status"],
    ["error", "Solar Summit event 191", "alert"],
    ["warning", "Quiet Breeze event 192", "status"],
    ["success", "Hidden Canyon event 193", "status"],
    ["warning", "Solar Ember event 194", "status"],
    ["error", "Hidden Valley event 195", "alert"],
    ["error", "Silver Summit event 196", "alert"],
    ["success", "Golden River event 197", "status"],
    ["warning", "Gentle Forest event 198", "status"],
    ["warning", "Frozen River event 199", "status"],
    ["warning", "Electric Lantern event 200", "status"],
    ["error", "Urban Lantern event 201", "alert"],
    ["warning", "Lunar Comet event 202", "status"],
    ["success", "Wild Valley event 203", "status"],
    ["success", "Golden Pixel event 204", "status"],
    ["success", "Lunar River event 205", "status"],
    ["error", "Bright Meadow event 206", "alert"],
    ["warning", "Lunar Comet event 207", "status"],
    ["success", "Golden Summit event 208", "status"],
    ["info", "Swift Pixel event 209", "status"],
    ["error", "Hidden Summit event 210", "alert"],
    ["info", "Bright Reef event 211", "status"],
    ["success", "Hidden Atlas event 212", "status"],
    ["error", "Silver Ember event 213", "alert"],
    ["warning", "Gentle Comet event 214", "status"],
    ["warning", "Lunar Valley event 215", "status"],
    ["success", "Silver Lantern event 216", "status"],
    ["success", "Solar Meadow event 217", "status"],
    ["warning", "Golden Breeze event 218", "status"],
    ["info", "Lunar Reef event 219", "status"],
    ["warning", "Bright Atlas event 220", "status"],
    ["info", "Quiet Valley event 221", "status"],
    ["info", "Quiet Comet event 222", "status"],
    ["warning", "Bright Orbit event 223", "status"],
    ["error", "Frozen Lantern event 224", "alert"],
    ["warning", "Electric Pixel event 225", "status"],
    ["warning", "Rapid Comet event 226", "status"],
    ["success", "Crystal Atlas event 227", "status"],
    ["warning", "Golden Atlas event 228", "status"],
    ["info", "Solar Lantern event 229", "status"],
    ["error", "Rapid Orbit event 230", "alert"],
    ["warning", "Rapid Falcon event 231", "status"],
    ["warning", "Gentle Reef event 232", "status"],
    ["info", "Gentle Forest event 233", "status"],
    ["info", "Rapid Ember event 234", "status"],
    ["info", "Bright Forest event 235", "status"],
    ["success", "Silver Ember event 236", "status"],
    ["info", "Electric Summit event 237", "status"],
    ["info", "Solar Summit event 238", "status"],
    ["error", "Electric Forest event 239", "alert"],
    ["info", "Crystal Ember event 240", "status"],
    ["success", "Lunar Harbor event 241", "status"],
    ["warning", "Silver Canyon event 242", "status"],
    ["error", "Crystal Ember event 243", "alert"],
    ["warning", "Rapid Valley event 244", "status"],
    ["success", "Electric Falcon event 245", "status"],
    ["info", "Golden Comet event 246", "status"],
    ["error", "Electric Forest event 247", "alert"],
    ["warning", "Bold Breeze event 248", "status"],
    ["error", "Bright Reef event 249", "alert"],
  ])('%s toast %j uses role %s', (type, message, role) => {
    render(<ToastProvider><Trigger type={type} message={message} /></ToastProvider>);
    fireEvent.click(screen.getByText('fire'));
    const toast = screen.getByRole(role);
    expect(toast).toHaveTextContent(message);
    expect(toast).toHaveClass(`toast-${type}`);
  });
});
