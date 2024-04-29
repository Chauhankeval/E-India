import React, { useState } from "react";
import MyContext from "./MyContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfigu";
import { useEffect } from "react";

const MyState = (props) => {
  const [mode, setMode] = useState();
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageURL: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // This function use for admin can add the product in site
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageURL == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("All Filed Are Required");
    }

    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add Product successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
      GetProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setLoading(false);
    }
  };

  // after getting Data from Fire base we Set The data in the product and map
  const [product, setProduct] = useState([]);

  // get Product From firebase DataBase
  const GetProductData = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // upadte Product function
  const edithandle = (item) => {
    setProducts(item);
  };

  // if You want To update Product From firebase use setDoc
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Upadte SuccessFully");
      GetProductData();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // delete Product particular item delete give parameter item and item.id
  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      GetProductData();
    } catch (error) {
      toast.success("Product Deleted Falied");
      setLoading(false);
    }
  };
  useEffect(() => {
    GetProductData();
    getOrderData();
    getUserNameData()
  }, []);


  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

// get the user name and set name in the setuser state and export as user 

  const [user , setUser] = useState([])


  const getUserNameData = async () =>{
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    GetProductData();
    getOrderData();
    getUserNameData()
  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        setProduct,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchkey, setSearchkey,
        filterType, setFilterType,
        filterPrice, setFilterPrice
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
