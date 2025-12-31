import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-gray-100 flex items-center justify-between px-10  w-full h-20   '>
        <div class="text-xl font-bold flex item-center justify-center">
    MyLogo
  </div>
        <ul className='flex  justify-center items-center gap-10'>
            <li>logo</li>
            <li>home</li>
            <li>profile</li>
        </ul>
        <div>
            menu
        </div>
    </div>
  )
}

export default Navbar