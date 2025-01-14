import React from 'react'

const InputBox = ({label, placeholder, onchange, type}) => {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>
        <input onChange={onchange} type={type} placeholder={placeholder} className=' w-full px-2 py-1 border'></input>
    </div>
  )
}

export default InputBox