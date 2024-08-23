import React from 'react'
import UserList from './stats/UserList'
import TopProduitVendu from './stats/TopProduitVendu'

function StatsAdmin() {
  return (
    <div className='bg-gray-100'>    
      <div className='lg:grid lg:grid-cols-2 lg:gap-15  '>
        <div className='col-span-1 px-10 mt-10 lg:mt-0'>
          <UserList/>
        </div>
      </div>
      <div className='mt-10 px-10'>
        <TopProduitVendu/>
      </div>

  </div>

    
  )
}

export default StatsAdmin