import React from "react";
import { useNavigate } from "react-router-dom";

const HomeStore = () => {

    const navigate = useNavigate();

    return (
        < section >
            <div
                className="mx-auto   p-6"
            >
                <div className=" text-center justify-center items-center">
                    <h2 className='text-3xl font-bold sm:text-5xl font-heading  text-red-500 text-center justify-center items-center '>
                        NOTRE STORE
                    </h2>
                    <p className=' font-content  font-medium text-sm sm:text-lg   text-center justify-center items-center my-10 mx-20'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab magnam omnis recusandae natus officia fuga sint quibusdam sit tenetur vero optio, dignissimos magni, quo maiores, nemo deleniti voluptate minima aperiam! Lorem ipsum dolor sit amet consectetur adipisicing elit. At incidunt reprehenderit asperiores nemo dignissimos, necessitatibus unde aspernatur sed. Laboriosam animi dolores nobis placeat quo voluptate id culpa natus praesentium architecto!
                    </p>                
                    </div>
                    <div className="text-center">
                        <button onClick={()=>navigate('/store')} className="md:w-full xl:w-auto py-4 px-7 bg-red-500  text-white font-heading rounded-md mt-2 hover:opacity-90 text-sm">OUVRIR STORE</button>
                    </div>

                 
            </div>
        </section>
    ); 
};
export default HomeStore;