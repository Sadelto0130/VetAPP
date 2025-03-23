export function Label({ children, htmlFor }) {
  return (
    <label
      className="px-3 py-0 block text-m font-bold text-gray-800"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;
