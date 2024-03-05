import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleInvoicePage = () => {
    navigate("/invoice-generator");
  };

  const handlePdfPage = () => {
    navigate("/pdfs");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="font-roboto flex justify-between items-center bg-black mx-auto py-0.5 px-8">
      <h1 className="text-white font-normal text-base">Invoice Generator</h1>
      <ul className="hidden md:flex space-x-4">
        <li className="p-4 text-[#545455d7] hover:text-white font-semibold" onClick={handleInvoicePage}>
          Create Invoice
        </li>
        <li className="p-4 text-[#545455d7] hover:text-white font-semibold" onClick={handlePdfPage}>
          All Invoices
        </li>
        <li className="p-4 text-[#545455d7] hover:text-white font-semibold" onClick={handleLogout}>
          Log out
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden text-white">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[40%] h-full border-r-gray-900 bg-black ease-in-out duration-500"
            : "ease-in-out duration-500 fixed h-full w-[40%] top-0  left-[-100%]"
        }>
        <li className="p-4 border-b border-gray-600 text-white" onClick={handleInvoicePage}>
          Create Invoice
        </li>
        <li className="p-4 border-b border-gray-600 text-white" onClick={handlePdfPage}>
          All Invoices
        </li>
        <li className="p-4 border-b border-gray-600 text-white" onClick={handleLogout}>
          Log out
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
