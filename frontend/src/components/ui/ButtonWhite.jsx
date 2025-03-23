
export function ButtonWhite({children, onClick }) {
  return (
    <button 
      type="submit" 
      onClick={onClick}
      className="w-full rounded-2xl border-b-2 border-b-gray-600 bg-slate-100 py-3 my-4 font-bold text-blue-500 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-400">
      {children}
    </button>
  )
}

export default ButtonWhite

