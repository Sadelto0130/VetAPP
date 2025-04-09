export function Card({ children, className }) {
  return (
    <div
      className={"w-full sm:w-96 max-w-sm p-8 rounded-md shadow-lg " + className}
    >
      {children}
    </div>
  );
} 

export default Card;
