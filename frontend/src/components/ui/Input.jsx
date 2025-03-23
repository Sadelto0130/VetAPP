import { forwardRef } from 'react'

export const Input = forwardRef((props, ref) => {
  return (
    <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
      <input
        type="text"
        className="px-3 py-2 block my-3 rounded-md w-full border-none bg-transparent outline-none focus:outline-none"
        ref={ref}
        {...props}
      />
      </div>
  );
})

export default Input;
