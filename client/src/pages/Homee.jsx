import Card1 from "../components/Card1";
import Contact from "../components/Contatc";
import Footer from "../components/Footer";
import HomeStore from "../components/HomeStore";
import React,{useEffect} from "react";
import bg from '../img/bg-header.png'
import Card from "../components/Card";
import { NewProduct } from "../components/NewProduct";




function Homee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="App">
      <div>
        <Card/>
        <NewProduct/>
        <Card1/>
         <HomeStore/>
        <Footer/>
       </div>
    </div>
  );
}

export default Homee;
