import { ToastProvider, useToast } from '../Toast';

export default {
  title: 'Components/Toast',
  component: ToastProvider,
};

function Demo({ type, message, options }) {
  const toast = useToast();
  return (
    <button type="button" onClick={() => toast[type](message, options)}>
      Show {type} toast
    </button>
  );
}

export const Toast1 = {
  render: () => (
    <ToastProvider position="bottom-left" max={2}>
      <Demo type="success" message="Bold Valley update" options={{ duration: 500 }} />
    </ToastProvider>
  ),
};

export const Toast2 = {
  render: () => (
    <ToastProvider position="top-right" max={3}>
      <Demo type="warning" message="Hidden Orbit update" options={{ duration: 1000 }} />
    </ToastProvider>
  ),
};

export const Toast3 = {
  render: () => (
    <ToastProvider position="top-left" max={4}>
      <Demo type="error" message="Quiet Forest update" options={{ duration: 1500 }} />
    </ToastProvider>
  ),
};

export const Toast4 = {
  render: () => (
    <ToastProvider position="bottom-right" max={5}>
      <Demo type="info" message="Silver Canyon update" options={{ duration: 2000 }} />
    </ToastProvider>
  ),
};

export const Toast5 = {
  render: () => (
    <ToastProvider position="bottom-left" max={1}>
      <Demo type="success" message="Bright Comet update" options={{ duration: 2500 }} />
    </ToastProvider>
  ),
};

export const Toast6 = {
  render: () => (
    <ToastProvider position="top-right" max={2}>
      <Demo type="warning" message="Gentle Valley update" options={{ duration: 3000 }} />
    </ToastProvider>
  ),
};

export const Toast7 = {
  render: () => (
    <ToastProvider position="top-left" max={3}>
      <Demo type="error" message="Solar River update" options={{ duration: 3500 }} />
    </ToastProvider>
  ),
};

export const Toast8 = {
  render: () => (
    <ToastProvider position="bottom-right" max={4}>
      <Demo type="info" message="Lunar Canyon update" options={{ duration: 4000 }} />
    </ToastProvider>
  ),
};

export const Toast9 = {
  render: () => (
    <ToastProvider position="bottom-left" max={5}>
      <Demo type="success" message="Bold Forest update" options={{ duration: 4500 }} />
    </ToastProvider>
  ),
};

export const Toast10 = {
  render: () => (
    <ToastProvider position="top-right" max={1}>
      <Demo type="warning" message="Hidden Canyon update" options={{ duration: 5000 }} />
    </ToastProvider>
  ),
};

export const Toast11 = {
  render: () => (
    <ToastProvider position="top-left" max={2}>
      <Demo type="error" message="Golden Lantern update" options={{ duration: 5500 }} />
    </ToastProvider>
  ),
};

export const Toast12 = {
  render: () => (
    <ToastProvider position="bottom-right" max={3}>
      <Demo type="info" message="Gentle Falcon update" options={{ duration: 6000 }} />
    </ToastProvider>
  ),
};

export const Toast13 = {
  render: () => (
    <ToastProvider position="bottom-left" max={4}>
      <Demo type="success" message="Frozen Reef update" options={{ duration: 6500 }} />
    </ToastProvider>
  ),
};

export const Toast14 = {
  render: () => (
    <ToastProvider position="top-right" max={5}>
      <Demo type="warning" message="Frozen Meadow update" options={{ duration: 7000 }} />
    </ToastProvider>
  ),
};

export const Toast15 = {
  render: () => (
    <ToastProvider position="top-left" max={1}>
      <Demo type="error" message="Bold Atlas update" options={{ duration: 7500 }} />
    </ToastProvider>
  ),
};

export const Toast16 = {
  render: () => (
    <ToastProvider position="bottom-right" max={2}>
      <Demo type="info" message="Hidden Comet update" options={{ duration: 8000 }} />
    </ToastProvider>
  ),
};

export const Toast17 = {
  render: () => (
    <ToastProvider position="bottom-left" max={3}>
      <Demo type="success" message="Bold Meadow update" options={{ duration: 8500 }} />
    </ToastProvider>
  ),
};

export const Toast18 = {
  render: () => (
    <ToastProvider position="top-right" max={4}>
      <Demo type="warning" message="Hidden Harbor update" options={{ duration: 9000 }} />
    </ToastProvider>
  ),
};

export const Toast19 = {
  render: () => (
    <ToastProvider position="top-left" max={5}>
      <Demo type="error" message="Gentle Orbit update" options={{ duration: 9500 }} />
    </ToastProvider>
  ),
};

export const Toast20 = {
  render: () => (
    <ToastProvider position="bottom-right" max={1}>
      <Demo type="info" message="Lunar Canyon update" options={{ duration: 10000 }} />
    </ToastProvider>
  ),
};

export const Toast21 = {
  render: () => (
    <ToastProvider position="bottom-left" max={2}>
      <Demo type="success" message="Silver River update" options={{ duration: 10500 }} />
    </ToastProvider>
  ),
};

export const Toast22 = {
  render: () => (
    <ToastProvider position="top-right" max={3}>
      <Demo type="warning" message="Crystal Reef update" options={{ duration: 11000 }} />
    </ToastProvider>
  ),
};

export const Toast23 = {
  render: () => (
    <ToastProvider position="top-left" max={4}>
      <Demo type="error" message="Electric Falcon update" options={{ duration: 11500 }} />
    </ToastProvider>
  ),
};

export const Toast24 = {
  render: () => (
    <ToastProvider position="bottom-right" max={5}>
      <Demo type="info" message="Wild Reef update" options={{ duration: 12000 }} />
    </ToastProvider>
  ),
};

export const Toast25 = {
  render: () => (
    <ToastProvider position="bottom-left" max={1}>
      <Demo type="success" message="Urban Forest update" options={{ duration: 12500 }} />
    </ToastProvider>
  ),
};

export const Toast26 = {
  render: () => (
    <ToastProvider position="top-right" max={2}>
      <Demo type="warning" message="Rapid Pixel update" options={{ duration: 13000 }} />
    </ToastProvider>
  ),
};

export const Toast27 = {
  render: () => (
    <ToastProvider position="top-left" max={3}>
      <Demo type="error" message="Silver Ember update" options={{ duration: 13500 }} />
    </ToastProvider>
  ),
};

export const Toast28 = {
  render: () => (
    <ToastProvider position="bottom-right" max={4}>
      <Demo type="info" message="Solar Canyon update" options={{ duration: 14000 }} />
    </ToastProvider>
  ),
};

export const Toast29 = {
  render: () => (
    <ToastProvider position="bottom-left" max={5}>
      <Demo type="success" message="Solar Falcon update" options={{ duration: 14500 }} />
    </ToastProvider>
  ),
};

export const Toast30 = {
  render: () => (
    <ToastProvider position="top-right" max={1}>
      <Demo type="warning" message="Silver Valley update" options={{ duration: 15000 }} />
    </ToastProvider>
  ),
};

export const Toast31 = {
  render: () => (
    <ToastProvider position="top-left" max={2}>
      <Demo type="error" message="Frozen Lantern update" options={{ duration: 15500 }} />
    </ToastProvider>
  ),
};

export const Toast32 = {
  render: () => (
    <ToastProvider position="bottom-right" max={3}>
      <Demo type="info" message="Wild Orbit update" options={{ duration: 16000 }} />
    </ToastProvider>
  ),
};

export const Toast33 = {
  render: () => (
    <ToastProvider position="bottom-left" max={4}>
      <Demo type="success" message="Quiet Valley update" options={{ duration: 16500 }} />
    </ToastProvider>
  ),
};

export const Toast34 = {
  render: () => (
    <ToastProvider position="top-right" max={5}>
      <Demo type="warning" message="Solar Forest update" options={{ duration: 17000 }} />
    </ToastProvider>
  ),
};

export const Toast35 = {
  render: () => (
    <ToastProvider position="top-left" max={1}>
      <Demo type="error" message="Silver Valley update" options={{ duration: 17500 }} />
    </ToastProvider>
  ),
};

export const Toast36 = {
  render: () => (
    <ToastProvider position="bottom-right" max={2}>
      <Demo type="info" message="Wild Reef update" options={{ duration: 18000 }} />
    </ToastProvider>
  ),
};

export const Toast37 = {
  render: () => (
    <ToastProvider position="bottom-left" max={3}>
      <Demo type="success" message="Hidden Breeze update" options={{ duration: 18500 }} />
    </ToastProvider>
  ),
};

export const Toast38 = {
  render: () => (
    <ToastProvider position="top-right" max={4}>
      <Demo type="warning" message="Silver River update" options={{ duration: 19000 }} />
    </ToastProvider>
  ),
};

export const Toast39 = {
  render: () => (
    <ToastProvider position="top-left" max={5}>
      <Demo type="error" message="Bold Breeze update" options={{ duration: 19500 }} />
    </ToastProvider>
  ),
};

export const Toast40 = {
  render: () => (
    <ToastProvider position="bottom-right" max={1}>
      <Demo type="info" message="Electric Meadow update" options={{ duration: 20000 }} />
    </ToastProvider>
  ),
};

export const Toast41 = {
  render: () => (
    <ToastProvider position="bottom-left" max={2}>
      <Demo type="success" message="Silver Comet update" options={{ duration: 20500 }} />
    </ToastProvider>
  ),
};

export const Toast42 = {
  render: () => (
    <ToastProvider position="top-right" max={3}>
      <Demo type="warning" message="Crystal Forest update" options={{ duration: 21000 }} />
    </ToastProvider>
  ),
};

export const Toast43 = {
  render: () => (
    <ToastProvider position="top-left" max={4}>
      <Demo type="error" message="Lunar Comet update" options={{ duration: 21500 }} />
    </ToastProvider>
  ),
};

export const Toast44 = {
  render: () => (
    <ToastProvider position="bottom-right" max={5}>
      <Demo type="info" message="Bright Breeze update" options={{ duration: 22000 }} />
    </ToastProvider>
  ),
};

export const Toast45 = {
  render: () => (
    <ToastProvider position="bottom-left" max={1}>
      <Demo type="success" message="Silver Summit update" options={{ duration: 22500 }} />
    </ToastProvider>
  ),
};

export const Toast46 = {
  render: () => (
    <ToastProvider position="top-right" max={2}>
      <Demo type="warning" message="Silver Summit update" options={{ duration: 23000 }} />
    </ToastProvider>
  ),
};

export const Toast47 = {
  render: () => (
    <ToastProvider position="top-left" max={3}>
      <Demo type="error" message="Solar River update" options={{ duration: 23500 }} />
    </ToastProvider>
  ),
};

export const Toast48 = {
  render: () => (
    <ToastProvider position="bottom-right" max={4}>
      <Demo type="info" message="Golden Summit update" options={{ duration: 24000 }} />
    </ToastProvider>
  ),
};

export const Toast49 = {
  render: () => (
    <ToastProvider position="bottom-left" max={5}>
      <Demo type="success" message="Solar Breeze update" options={{ duration: 24500 }} />
    </ToastProvider>
  ),
};

export const Toast50 = {
  render: () => (
    <ToastProvider position="top-right" max={1}>
      <Demo type="warning" message="Silver Lantern update" options={{ duration: 25000 }} />
    </ToastProvider>
  ),
};

export const Toast51 = {
  render: () => (
    <ToastProvider position="top-left" max={2}>
      <Demo type="error" message="Frozen Summit update" options={{ duration: 25500 }} />
    </ToastProvider>
  ),
};

export const Toast52 = {
  render: () => (
    <ToastProvider position="bottom-right" max={3}>
      <Demo type="info" message="Wild Forest update" options={{ duration: 26000 }} />
    </ToastProvider>
  ),
};

export const Toast53 = {
  render: () => (
    <ToastProvider position="bottom-left" max={4}>
      <Demo type="success" message="Bold Summit update" options={{ duration: 26500 }} />
    </ToastProvider>
  ),
};

export const Toast54 = {
  render: () => (
    <ToastProvider position="top-right" max={5}>
      <Demo type="warning" message="Swift Harbor update" options={{ duration: 27000 }} />
    </ToastProvider>
  ),
};

export const Toast55 = {
  render: () => (
    <ToastProvider position="top-left" max={1}>
      <Demo type="error" message="Silver Summit update" options={{ duration: 27500 }} />
    </ToastProvider>
  ),
};

export const Toast56 = {
  render: () => (
    <ToastProvider position="bottom-right" max={2}>
      <Demo type="info" message="Gentle Orbit update" options={{ duration: 28000 }} />
    </ToastProvider>
  ),
};

export const Toast57 = {
  render: () => (
    <ToastProvider position="bottom-left" max={3}>
      <Demo type="success" message="Bright Lantern update" options={{ duration: 28500 }} />
    </ToastProvider>
  ),
};

export const Toast58 = {
  render: () => (
    <ToastProvider position="top-right" max={4}>
      <Demo type="warning" message="Silver River update" options={{ duration: 29000 }} />
    </ToastProvider>
  ),
};

export const Toast59 = {
  render: () => (
    <ToastProvider position="top-left" max={5}>
      <Demo type="error" message="Swift Ember update" options={{ duration: 29500 }} />
    </ToastProvider>
  ),
};

export const Toast60 = {
  render: () => (
    <ToastProvider position="bottom-right" max={1}>
      <Demo type="info" message="Urban Summit update" options={{ duration: 30000 }} />
    </ToastProvider>
  ),
};
