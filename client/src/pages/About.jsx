import React,{useEffect,useState} from "react";
import AboutHeader from '../components/AboutHeader';
import Footer from '../components/Footer';
import bg from '../img/bg-header.png'


export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <img src={bg} className="h-32 w-full mb-14"/>
      <AboutHeader />
      <Footer/>
    </div>
  );
}