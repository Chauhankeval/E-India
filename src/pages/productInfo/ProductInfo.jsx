import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/MyContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/CartSlice";
import { fireDB } from "../../firebase/FirebaseConfigu";

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [productData, setProductData] = useState(null);
  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productDoc = await getDoc(doc(fireDB, "products", params.id));
      setProductData(productDoc.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // add to cart
  const addCart = (product) => {
    const { id, title, imageURL, price, category, description } = product;
    const serializableProduct = {
      id,
      title,
      imageURL,
      price,
      category,
      description
    };
    dispatch(addToCart(serializableProduct));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {productData && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/3 w-full lg:h-auto  object-cover object-center rounded"
                src={productData.imageURL}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {productData.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {/* Rating icons */}
                  </span>
                </div>
                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {productData.description}
                </p>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{productData.price}
                  </span>
                  <button
                    onClick={() => addCart(productData)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                  {/* Wishlist button */}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
