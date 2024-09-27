import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-600 p-3 mb-5 text-white'>
        <div className="logo px-5 font-bold text-xl">
            JTodo
        </div>
        <ul className='flex gap-10 px-5'>
            <li className='cursor-pointer hover:font-bold transition-all text-lg'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all text-lg'>Todos</li>
        </ul>
    </nav>
  )
}

export default Navbar