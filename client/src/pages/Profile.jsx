import React,{useEffect} from 'react'
import bg from '../img/bg-header.png'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';



export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation()
  const {pathname}=location;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <img src={bg} className="h-32 w-full mb-32"/>
        {!pathname.includes('profileUpdate')?
          <div className='sm:grid sm:grid-cols-2 -mt-20 '>
            <div className='col-span-1 '>
                {<Outlet/>}
            </div>
            <div className=' py-10 flex text-center justify-center items-center sm:mt-0'>
              <button onClick={()=>navigate("profileUpdate")}
                className='bg-red-500 text-white px-20 py-10 rounded-lg text-lg font-bold hover:text-gray-900 hover:bg-red-500/50'
                >Update</button>
            </div>
          </div>
          :
          <div className='sm:grid sm:grid-cols-2 -mt-20'>
            <div className='flex text-center justify-center items-center'>
              <button onClick={()=>navigate("/profile")}
                className='bg-red-500 text-white px-20 py-10 rounded-lg text-lg font-bold hover:text-gray-900 hover:bg-red-500/50'
                >View</button>
            </div>
            <div className='col-span-1  '>
                {<Outlet/>}
            </div>
            
          </div>
        }
        <Footer/>
      
    </div>
  );
}
