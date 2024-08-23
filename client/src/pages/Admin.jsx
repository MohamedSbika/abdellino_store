import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import bg from '../img/bg-header.png'
import { useLocation } from 'react-router-dom'


export default function Admin() {
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname}=location;
  return (
    <div className='h-auto '>
        <img src={bg} className="h-32 w-full "/>
        <div className=' lg:grid lg:grid-cols-12 h-screen -mt-32'>
            <div className='col-span-2 bg-red-500 pt-32 px-1 hidden lg:block'>
                <button onClick={()=>navigate('/admin')} 
                    className={`  text-white relative h-14 mb-1 w-full text-center bg-red-300/50 rounded-lg text-xl items-center justify-center flex font-bold 
                        ${ pathname==="/admin" && "bg-red-700 text-white" }
                        `}                     
                    >Home</button>
                <button onClick={()=>navigate('/admin/profile')} 
                    className={` text-white relative h-14 mb-1 w-full text-center bg-red-300/50 rounded-lg text-xl items-center justify-center flex font-bold 
                        ${pathname.includes('profile') && "bg-red-700 text-white" }
                        `}
                      
                    >Profile</button>
                <button onClick={()=>navigate('/admin/produits')}
                    className={` text-white w-full h-14 mb-1 text-center bg-red-300/50 rounded-lg text-xl items-center justify-center flex font-bold
                        ${pathname.includes('produits') && 'bg-red-700 text-white'}
                        `}
                    >Produits</button>
                <button onClick={()=>navigate('/admin/ticketsP')}
                    className={`text-white w-full h-14 mb-1 text-center bg-red-300/50 rounded-lg text-xl items-center justify-center flex font-bold
                        ${pathname.includes('ticketsP') && 'bg-red-700 text-white'}
                            `}
                    >Commande Produit</button>
            </div>
            <div className='col-span-10 mt-32 bg-gray-100'>
                {<Outlet/>}
            </div>
        </div>
      
      
    </div>
  )
}
