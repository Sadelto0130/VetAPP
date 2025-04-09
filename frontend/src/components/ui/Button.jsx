export function Button({children, onClick, className}) {
  return (
    <button 
      type="submit" 
      onClick={onClick}
      className={`w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 my-4 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400 ${className}`}>
      {children}
    </button>
  )
}

export default Button