import React from 'react'
import logo from "../img/IMG.jpg"


const Footer = () => {
    return (
        <footer className="bg-white  rounded-t-3xl  mt-16 pt-20 p-10 font-sans tracking-wide shadow-lg shadow-black mx-1">
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:flex lg:items-center">
              <a href="#">
                <img src={logo} alt="logo"  />
              </a>
            </div>
    
            <div className="lg:flex lg:items-center">
              <p className="text-gray-9000 max-w-[80%] text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis animi quas magni totam unde sed alias voluptates velit quidem assumenda, necessitatibus tenetur obcaecati id dolorum facere facilis adipisci temporibus saepe.
              </p>
            </div>
    
            <div>
              
              <ul className="space-y-4">
                <li>
                  <a href="/" className="text-gray-900 hover:text-black text-sm">ACCUEIL</a>
                </li>
                <li>
                  <a href="/about" className="text-gray-900 hover:text-black text-sm">A PROPOS</a>
                </li>
                <li>
                  <a href="/service" className="text-gray-900 hover:text-black text-sm">SERVICES</a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-900 hover:text-black text-sm">CONTACT</a>
                </li>
              </ul>
            </div>
    
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gray-600">CONTACT</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">email@emaill.com</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">+216 00 000 000</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Avenue ............................. 4000</a>
                </li>
              </ul>
            </div>
          </div>
    
          <p className="text-gray-900 text-center text-sm mt-10">© 2024Copyright </p>
        </footer>
      );
    }

export default Footer
