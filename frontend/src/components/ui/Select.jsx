import { forwardRef } from "react";

export const Select = forwardRef(({ children, defaultValue, ...rest }, ref) => {
  return (
    <div className="w-full mb-4 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 ">
    <select
      name="select"
      className="w-full px-3 py-2 block text-m font-bold text-gray-800 bg-transparent rounded-xl focus:ring-2 focus:ring-gray-400 outline-none"
      defaultValue={defaultValue} 
      ref={ref} // Ahora sí pasamos correctamente `ref`
      {...rest} // Para manejar otros props como `register`
    >
      {children}
    </select>
    </div>
  );
});

export default Select;
