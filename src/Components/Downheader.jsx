import React from 'react'

 const Downheader=()=> {
    return(
    <>
    <div className="flex flex-wrap bg-gray-100 justify-around  items-center text=[#f9f9f9]">
        <div className='flex flex-col flex-wrap max-w-7xl mx-auto w-screen  py-[30px]'>
        <h1 className='flex flex-wrap text-[30px]'>Shop</h1>
        <ul className='flex flex-wrap gap-4'>
            <li>
             <a href='/' className='hover:text-slate-700'>Home
             </a> 
             </li>
            <li> &#62; </li>
            <li>
            <a href='/shop' className='hover:text-slate-700'>Shop </a>

            </li>
            <li> &#62; </li>
            <li>
              <a href='/about'className='hover:text-slate-700'>About us </a></li>
              <li> &#62; </li>
            <li>
              <a href='/contact'className='hover:text-slate-700'>Contact us </a></li>
        </ul>
    </div>
    </div>
    <div> 
  
  </div>
    </>
  )
}
export default Downheader