import { useSelector, useDispatch } from 'react-redux';
import ProduitCard from '../components/ProduitCard';
import Footer from '../components/Footer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateArray } from '../redux/user/userSlice';
import bg from '../img/bg-header.png'


const Panier = () => {
    const navigate = useNavigate();
    const { saveProduits } = useSelector(state => state.savedProduit);
       
    const dispatch = useDispatch();

    const initializeQuantities = (produits) => {
        return produits.map(produit => ({
            id: produit._id,
            name: produit.title,
            quantity: 1,
            price:produit.offer ? produit.discountPrix : produit.prix
        })
    );
    };

    const [quantities, setQuantities] = useState(initializeQuantities(saveProduits));

    // Update quantities whenever saveProduits changes
    useEffect(() => {
        setQuantities(initializeQuantities(saveProduits));
    }, [saveProduits]);

    const increment = (id) => {
        setQuantities(prevQuantities =>
            prevQuantities.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleQuantityChange=(id,qt)=>{
        setQuantities(prevQuantities =>
            prevQuantities.map(item =>
                item.id === id ? { ...item, quantity: qt } : item
            )
        );
    }

    const decrement = (id) => {
        setQuantities(prevQuantities =>
            prevQuantities.map(item =>
                item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(updateArray(quantities));
        console.log("here")
        console.log(quantities)
        navigate('/formulaire');
    };
    const calculateTotalPrice = () => {
        return quantities.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
                  <img src={bg} className="h-32 w-full"/>


            <section>
                <div className="container">
                    <div className="heading_container border-b-2 pb-5 border-[#3A5A40] flex items-center justify-center sm:justify-between flex-col sm:flex-row gap-3">
                        <h1 className='font-heading text-2xl text-left'>Votre Panier Des Produits</h1>
                    </div>
                    <div className="listings pt-5">
                        {saveProduits.length === 0 ? (
                            <div className='py-20'>
                                <p className='bg-white text-center text-sm sm:text-2xl font-heading font-bold flex flex-col items-center justify-center max-w-3xl mx-auto py-10 text-black px-5 rounded shadow-md'>
                                    <span>Votre Panier Des Produits est vide.</span>
                                </p>
                            </div>
                        ) : (
                            <form className='text-center justify-center md:grid md:grid-cols-4'>
                                <div className='col-span-3'>
                                    <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-5 gap-y-8 pb-20">
                                        {saveProduits.map(produit => {
                                            const quantityObject = quantities.find(item => item.id === produit._id);
                                            const quantity = quantityObject ? quantityObject.quantity : 1;
                                            return (
                                                <div key={produit._id} className='text-center'>
                                                    <ProduitCard produit={produit} />
                                                    <div className="flex items-center justify-center rounded-lg">
                                                        <button
                                                            className="quantity-input__modifier quantity-input__modifier--left px-3 py-2 text-xl bg-gray-200 text-gray-500 border-0 rounded-l-lg cursor-pointer hover:bg-gray-300 hover:text-gray-700"
                                                            type="button"
                                                            onClick={() => decrement(produit._id)}
                                                        >
                                                            &mdash;
                                                        </button>
                                                        <input
                                                            className="quantity-input__screen w-16 px-3 py-2 text-xl text-center border-0"
                                                            type="text"
                                                            value={quantity}
                                                            onChange={e => handleQuantityChange(produit._id, parseInt(e.target.value, 10))}
                                                        />
                                                        <button
                                                            className="quantity-input__modifier quantity-input__modifier--right px-3 py-2 text-xl bg-gray-200 text-gray-500 border-0 rounded-r-lg cursor-pointer hover:bg-gray-300 hover:text-gray-700"
                                                            type="button"
                                                            disabled={quantity===produit.quantite}
                                                            onClick={() => increment(produit._id)}
                                                        >
                                                            &#xff0b;
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                   
                                </div>
                                <div>
                                    <p className='text-lg font-bold'>Prix totale: {calculateTotalPrice()}</p>
                                    <button type="button" onClick={handleSubmit} className='mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 bg-red-500 hover:bg-red-600 text-white'>
                                        Passer Commande
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Panier;
