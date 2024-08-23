import Card1 from "../components/Card1";
import Contact from "../components/Contatc";
import Footer from "../components/Footer";
import HomeStore from "../components/HomeStore";
import React,{useEffect} from "react";
import bg from '../img/bg-header.png'




function Homee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="App">
      <img src={bg} className="h-32 w-full mb-32"/>
      <div>
        <Card1/>
         <HomeStore/>
        <Contact/>
        <Footer/>
       </div>
    </div>
  );
}

export default Homee;
