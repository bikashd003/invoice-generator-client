import { useState,useEffect } from "react";
import logo from "../assets/logo.png";
import Table from "../Components/Table";
import GstCalculator from "../Components/GstCalculator";
import { IoMdAdd } from "react-icons/io";
import { API } from "../Services/Api.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.tsx";

interface Product {
  name: string;
  qty: number;
  rate: number;
}
const Home = () => {
  const [products, setProducts] = useState<Product[]>([
    { name: "", qty: 0, rate: 0 },
  ]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [invoiceId, setInvoiceId] = useState<number>(0);
  const navigate = useNavigate();
  const addProduct = () => {
    setProducts([...products, { name: "", qty: 0, rate: 0 }]);
  };
  const handleNextClick = async () => {
    try {
      await axios.post(
        `${API}/invoice/create`,
        {
          products,
          grandTotal,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      ).then((res)=>{
        if (res.status === 201) {
          setInvoiceId(res.data.invoiceId);
        }
      })
      .catch((err)=>{
        console.error(err);
      })
    
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    if (invoiceId !== 0) {
      navigate(`/invoice-pdf/${invoiceId}`);
    }
    if(!localStorage.getItem("token")){
      navigate("/");
    }
  }, [invoiceId]);
  return (
    <>
    <Navbar />
      <div className="flex justify-center flex-col">
        <div className="flex justify-between w-[90%] px-4 py-2">
          <h1 className="font-bold">INVOICE GENERATOR</h1>
          <div className="flex justify-center items-center gap-3">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <div>
              <h1 className="text-2xl">Levitation</h1>
              <p>Infotech</p>
            </div>
          </div>
        </div>
        <div className="h-[50vh] overflow-y-auto">
          <table className="w-[90%]">
            <thead>
              <tr className="border-b">
                <th className="w-1/4 py-2 px-4 text-left font-bold">Product</th>
                <th className="w-1/4 py-2 px-4 text-left font-bold">QTY</th>
                <th className="w-1/4 py-2 px-4 text-left font-bold">Rate</th>
                <th className="w-1/4 py-2 px-4 text-left font-bold">Total</th>
              </tr>
            </thead>
            <Table products={products} setProducts={setProducts} />
          </table>
          <div className="flex justify-end w-[90%] border-b">
            <button onClick={addProduct}>
              <IoMdAdd size={"2em"} />
            </button>
          </div>
        </div>

        <div className="flex justify-end w-[90%] items-end mt-[5vw]">
          <GstCalculator products={products} setGrandTotal={setGrandTotal} />
        </div>
        <div className="flex justify-end w-[90%] items-end mt-[5vw]">
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={handleNextClick}
          >
            NEXT
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
