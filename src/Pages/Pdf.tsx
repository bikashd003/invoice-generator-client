import { useState, useEffect,useRef } from "react";
import { API } from "../Services/Api.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import moment from "moment";
import numeral from "numeral";

interface Product {
  name: string;
  qty: number;
  rate: number;
}
const Pdf = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [validDate, setValidDate] = useState<string>("");
  const { id } = useParams();
  const isMounted=useRef(false)

  useEffect(() => {
    axios
      .get(`${API}/invoice/invoice-pdf/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setProducts(res.data.products);
        setGrandTotal(res.data.grandTotal);
        const calculatedTotal = res.data.products.reduce(
          (acc: number, product: Product) => acc + product.qty * product.rate,
          0
        );
        setTotal(calculatedTotal);
        const createdDate = moment(res.data.createdAt);
        const validUntil = createdDate.add(30, 'days').format('DD/MM/YYYY');
        setValidDate(validUntil);
        if (!isMounted.current) {
          setTimeout(() => {
            handleGeneratePdf();
          }); 
          isMounted.current = true;
        }
      })
      .catch((err) => {
        console.error("Error fetching invoice:", err);
      });
    
  }, [id]); 

  const handleGeneratePdf = async () => {
    try {
      const headers = { Authorization: `${localStorage.getItem("token")}` };
      const response = await axios.post(
        `${API}/invoice/pdf`,
        { url: window.location.href },
        { headers: headers, responseType: "arraybuffer" }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
  
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <>
  <div style={{ display: "flex",height:"100vh", flexDirection: "column",position:"relative" }}>
  <div style={{ display: "flex", justifyContent: "space-between", width: "90%", padding: "16px 32px", fontFamily: "sans-serif" }}>
    <h1 style={{ fontWeight: "bold" }}>INVOICE GENERATOR</h1>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
      <img src="https://i.postimg.cc/D487n515/logo.png" alt="logo" style={{ width: "2rem", height: "2rem" }} />
      <div>
        <h1 style={{ fontSize: "1.5rem" }}>Levitation</h1>
        <p>Infotech</p>
      </div>
    </div>
  </div>
  <div >
    <table style={{ width: "90%",margin:"2vw" }}>
      <thead>
        <tr style={{ backgroundImage: "linear-gradient(to bottom, #dadada, #dadada 60%, #FFF 60% 100%)",
backgroundPosition: "0 100%",
backgroundRepeat: "no-repeat",
backgroundSize: "100% 0.1em" }}>
          <th style={{ width: "25%", padding: "8px 16px", textAlign: "left", fontWeight: "bold" }}>Product</th>
          <th style={{ width: "25%", padding: "8px 16px", textAlign: "left", fontWeight: "bold" }}>QTY</th>
          <th style={{ width: "25%", padding: "8px 16px", textAlign: "left", fontWeight: "bold" }}>Rate</th>
          <th style={{ width: "25%", padding: "8px 16px", textAlign: "left", fontWeight: "bold" }}>Total</th>
        </tr>
      </thead>
      <tbody >
        {products.length>0 && products.map((product, index) => (
          <tr key={index}>
            <td style={{ padding: "8px 16px" }}>{product.name}</td>
            <td style={{ padding: "8px 16px", color: "#6e45c6" }}>{product.qty}</td>
            <td style={{ padding: "8px 16px" }}>{product.rate}</td>
            <td style={{ padding: "8px 16px" }}>INR {numeral(product.qty * product.rate).format("0,0")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div style={{marginLeft:"2vw", display: "flex", justifyContent: "flex-end", width: "90%", alignItems: "flex-end", marginTop: "5vw",backgroundImage: "linear-gradient(to top, #dadada, #dadada 60%, #FFF 60% 100%)",
backgroundPosition: "0 0",
backgroundRepeat: "no-repeat",
backgroundSize: "100% 0.1em" }}>
    <table >
      <thead>
        <tr>
          <th style={{ width: "100%", padding: "8px 16px", textAlign: "left", fontWeight: "bold" }}>Total</th>
          <th style={{ width: "100%", padding: "8px 16px", textAlign: "right", fontWeight: "normal" }}>INR {(numeral(total).format("0,0") || 0)}</th>
        </tr>
        <tr style={{ backgroundImage: "linear-gradient(to bottom, #dadada, #dadada 60%, #FFF 60% 100%)",
backgroundPosition: "0 100%",
backgroundRepeat: "no-repeat",
backgroundSize: "100% 0.1em" }}>
          <th style={{ width: "100%", padding: "8px 16px", textAlign: "left", fontWeight: "normal" }}>GST</th>
          <th style={{ width: "100%", padding: "8px 16px", textAlign: "right", fontWeight: "normal" }}>18%</th>
        </tr>
        <tr style={{ backgroundImage: "linear-gradient(to bottom, #dadada, #dadada 60%, #FFF 60% 100%)",
backgroundPosition: "0 100%",
backgroundRepeat: "no-repeat",
backgroundSize: "100% 0.1em" }}>
          <th style={{ width: "100%", padding: "8px 16px", textAlign: "left", fontWeight: "bold" }}>Grand Total</th>
          <th style={{ padding: "8px 16px", display: "flex", justifyContent: "end", alignItems: "center" }}>
            <span style={{ color: "#6e45c6", fontWeight: "lighter" }}><FaRupeeSign /></span>
            <span style={{ color: "#6e45c6", fontWeight: "bold" }}> {grandTotal || 0}</span>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div>
    <h1 style={{ marginBottom: "8vw", marginTop: "4vw",fontSize:"1rem",marginLeft:"2vw" }}>Valid until: <span style={{ fontWeight: "bold",fontSize:"1rem" }}>{validDate || 0}</span></h1>
  </div>
  <div style={{ backgroundColor: "#000", color: "#fff", padding: "0.8vw 4vmax", borderRadius: "100px", width: "80%", margin: "1vmax auto 0 auto",left:"2vw",right:"2vw" }}>
    <h1 style={{ fontSize:"1.3vmax"}}>Term and Conditions</h1>
    <h2 style={{ fontStyle: "italic",fontSize:"1.25vmax" }}>we are happy to supply any further information you may need and trust that you call on us to fill your order,Which will receive our prompt and careful attention</h2>
  </div>
</div>

    </>
  );
};

export default Pdf;
