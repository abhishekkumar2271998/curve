export default function List({ items = [], renderItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem ? renderItem(item) : item}</li>
      ))}
    </ul>
  );
}
