import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [tit, setTitle] = useState("")
  const [descr, setDesc] = useState("")
  const [pri, setPrice] = useState("")
  const [stock, setInStock] = useState("")
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

/*   const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }; */

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleInStock = (e) => {
    setInStock(e.target.value);
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = { _id: productId, title: tit, desc: descr, price: pri, inStock: stock, categories: cat };
    updateProduct(productId, product, dispatch);
    console.log(product)
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  

  return (
    <div className="product">
      {/* <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input 
            name="title"
            type="text" 
            placeholder="New title" 
            onChange={handleTitle}
            />
            <label>Product Description</label>
            <input 
            name="desc"
            type="text" 
            placeholder="New title" 
            onChange={handleDesc}
            />
            <label>Price</label>
            <input 
            name="price"
            type="number" 
            placeholder="New title"
            onChange={handlePrice}
            />
            <label>In Stock</label>
            <select
            name="inStock" 
            id="idStock"
            onChange={handleInStock}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          <label>Categories</label>
          <input 
          type="text" 
          placeholder="jeans,skirts" 
          onChange={handleCat} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <label htmlFor="file">
              </label>
{/*               <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              /> */}
            </div>
            <button  onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
