import { useState, useEffect } from "react";
import { API } from "../Services/Api";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
interface Invoice {
  _id: string;
  createdAt: Date;
}
const AllPdfs = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const getInvoices = async () => {
    try {
      const response = await axios.get(`${API}/invoice/all-pdfs`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setInvoices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
    <Navbar />
    <div className="overflow-x-auto">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice No.
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.length>0 && invoices.map((invoice, index) => (
            <tr key={index}>
              <td className="border-b-2 px-6 py-4 whitespace-nowrap">
                {index + 1}.
              </td>
              <td className="border-b-2 px-6 py-4 whitespace-nowrap">
                {moment(invoice.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="border-b-2 px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/invoice-pdf/${invoice._id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Download
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AllPdfs;
