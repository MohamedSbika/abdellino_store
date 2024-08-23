import React,{useEffect,useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import bg from '../img/bg-header.png'
import Footer from "../components/Footer";


const ProduitPage = ()=>{
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const navigate = useNavigate();
        const { currentUser } = useSelector(state => state.user)
        const id = useParams();
        const [produit,setProduit]=useState({});
        const { title, description,quantite, prix, offer,discountPrix,type , imgUrl} = produit;
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
                subject:produit.title,
                to_name:"abdellino"
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
        const handleDeleteProduit = async(produitId)=>{
            try {
                const res = await fetch(`http://localhost:4000/abdellino/produits/${produitId}`, {
                    method: 'DELETE',
                })
                const data = await res.json();

                //===checking reqest success or not ===//
                if (data.success === false) {
                    //===showing error in tostify====//
                    toast.error(data.message, {
                        autoClose: 2000,
                    })
                }
                else {
                    navigate('/')
                }
            } catch (error) {
                toast.error(error.message, {
                    autoClose: 2000,
                })
            }
        }
    
        useEffect(() => {
            const loadProduit = async ()=>{
                try {
                    console.log(id)
                    const res = await fetch(`http://localhost:4000/abdellino/produits/${id.id}`)
                    const json = await res.json();
                    if (json.success === false) {
                        toast.error(json.message, {
                            autoClose: 2000,
                        })
                    }
                    else {
                        setProduit(json)
                    }
                    } catch (error) {
                        toast.error(error.message, {
                            autoClose: 2000,
                        })
                        console.log(error)
                    }
            };
            loadProduit();
            
        },[]);
    return(
        <div>
      <img src={bg} className="h-32 w-full "/>
      <div className="md:grid md:grid-cols-2 px-5">
                <div className="px-2 pr-10">
                    <div className=" mb-20 pt-0 h-[17vh]">
                        <h1 className="text-5xl">{title}</h1>
                        <p className="text-lg font-bold mt-2 ml-14">Type : {type}</p>
                        <p className="text-lg font-bold my-1 ml-14">Quantité : {quantite}</p>
                        <p className="text-lg font-bold my-1 ml-14">Prix : {prix}</p>
                        {offer  && <p className="text-lg font-bold my-1 ml-14">Offre : {discountPrix}<br/></p>}
                        
                    </div>
                    <img src={imgUrl} className="rounded-xl shadow-black shadow-md "/>
                </div>
                <div className="px-2">
                    <div className="md:hidden py-20">
                    {description}
                    </div>
                    {currentUser && currentUser.role==="admin"?
                    <div className="h-[17vh] mb-20 text-center items-center w-full">
                        <button                     onClick={() => navigateToUpdateProduit(produit._id)}
className=" w-full py-4 px-7 bg-gray-500  text-white font-heading rounded-md hover:opacity-90 text-sm mb-5">MODIFIER</button><br/>
                        <button 
                        className=" w-full py-4 px-7 bg-red-500  text-white font-heading rounded-md hover:opacity-90 text-sm"
                        onClick={()=>handleDeleteProduit(id.id)}
                        >
                            EFFACER
                        </button>
                    </div>
                    :
                    <div className="h-[15vh] mb-20 flex flex-column items-center ">
                        <div className=" w-[70%] mr-10">
                        <input
                            className="rounded-xl border-black p-2 shadow-md shadow-gray-500 w-full mb-5"
                            placeholder="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <textarea
                            className="rounded-xl border-black p-2 shadow-md shadow-gray-500 w-full"
                            placeholder="message"
                            id="body"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        </div>
                        <button onClick={handleSubmit}className=" w-auto py-4 px-7 bg-red-500  text-white font-heading rounded-md hover:opacity-90 text-sm">ENVOYER</button>
                    </div>
                    }
                    
                    <div className="hidden md:block">
                    {description}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
export default ProduitPage