import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import bg from '../img/bg-header.png';
import Footer from "../components/Footer";

const ProduitPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const id = useParams();
    const [produit, setProduit] = useState({});
    const { title, description, quantite, prix, offer, discountPrix, type, imgUrl = [] } = produit; // Default imgUrl as empty array

    const [mainImage, setMainImage] = useState(""); // State to store the main image

    const navigateToUpdateProduit = (produitId) => {
        navigate(`/update_produit/${produitId}`);
    };

    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            from_email: formData.email,
            message: formData.message,
            subject: produit.title,
            to_name: "abdellino"
        };

        emailjs.send('service_tspmn3e', 'template_mga2fmd', templateParams, '-xHtQ4ZSsPIab7nsU')
            .then((result) => {
                console.log(result.text);
                alert('Message sent successfully!');
            }, (error) => {
                console.log(error.text);
                alert('Failed to send message. Please try again later.');
            });
    };

    const handleDeleteProduit = async (produitId) => {
        try {
            const res = await fetch(`http://localhost:4000/abdellino/produits/${produitId}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success === false) {
                toast.error(data.message, {
                    autoClose: 2000,
                });
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        const loadProduit = async () => {
            try {
                const res = await fetch(`http://localhost:4000/abdellino/produits/${id.id}`);
                const json = await res.json();
                if (json.success === false) {
                    toast.error(json.message, {
                        autoClose: 2000,
                    });
                } else {
                    setProduit(json);
                    setMainImage(json.imgUrl[0]); // Set the main image to the first image
                }
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 2000,
                });
                console.log(error);
            }
        };
        loadProduit();
    }, [id.id]);

    return (
        <div>
            <div className='h-[84px] w-full bg-white'></div>
            <div className="md:grid md:grid-cols-2 px-5 pt-10">
                <div className="px-2 pr-10">
                    {/* Main Image */}
                    <img src={mainImage} className="h-[30vw] w-[20vw] ml-72 object-cover" alt="Main Product" />
                    {/* Thumbnails */}
                    <div className="flex mt-4 ml-72">
                        {imgUrl.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className={`h-[70px] w-[70px] object-cover cursor-pointer mx-2 ${mainImage === img ? 'border-2 border-black' : ''}`}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)} // Update the main image on click
                            />
                        ))}
                    </div>
                </div>

                <div className="px-2">
                    <div className=" mb-20 pt-0 h-[17vh]">
                        <h1 className="text-5xl mt-10">{title}</h1>
                        <p className="text-lg font-normal my-1 mt-16">{description}</p>
                        <p className="text-lg font-bold my-1 ">Prix : {prix} DT</p>
                        {offer && <p className="text-lg font-bold my-1 ">Offre : {discountPrix}<br /></p>}
                    </div>
                    {currentUser && currentUser.role === "admin" ? (
                        <div className="h-[17vh] mb-20 text-center items-center w-full flex gap-16">
                            <button
                                onClick={() => navigateToUpdateProduit(produit._id)}
                                className=" w-[100px] py-4 px-7 bg-black flex  justify-center text-white font-roboto hover:opacity-90 text-sm mb-5"
                            >
                                MODIFIER
                            </button>
                            <button
                                className=" w-[100px] py-4 px-7 bg-red-900 flex  justify-center text-white font-roboto hover:opacity-90 text-sm mb-5"
                                onClick={() => handleDeleteProduit(id.id)}
                            >
                                EFFACER
                            </button>
                        </div>
                    ) : (
                        <div className="h-[15vh] mb-20 flex flex-column items-center ">
                            <div className=" w-[70%] mr-10">
                                <input
                                    className=" border-black p-2 shadow-md shadow-gray-500 w-full mb-5"
                                    placeholder="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <textarea
                                    className=" border-black p-2 shadow-md shadow-gray-500 w-full"
                                    placeholder="message"
                                    id="body"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className=" w-auto py-4 px-7 bg-red-500 text-white font-heading hover:opacity-90 text-sm"
                            >
                                ENVOYER
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProduitPage;
