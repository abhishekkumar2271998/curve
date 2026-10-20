export default function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <label>
      {label}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
}
