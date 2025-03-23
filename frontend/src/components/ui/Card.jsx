export function Card({ children }) {
  return (
    <div
      className="w-full sm:w-96 max-w-sm p-8 bg-white/50 ackdrop-blur-md rounded-md shadow-lg"
    >
      {children}
    </div>
  );
} 

export default Card;
