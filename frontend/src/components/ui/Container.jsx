export function Container({children, className, style}) {
  return (
    <div 
    className={`w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto overflow-x-hidden ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Container