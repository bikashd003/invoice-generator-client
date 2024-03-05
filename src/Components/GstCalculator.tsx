import React from "react";
interface Product {
  name: string;
  qty: number;
  rate: number;
}

interface TableProps {
  products: Product[];
    setGrandTotal: React.Dispatch<React.SetStateAction<number>>;
}

const Table: React.FC<TableProps> = ({ products,setGrandTotal }) => {
  const total = products.reduce((acc, curr) => acc + curr.qty * curr.rate, 0);
  const gst = total * 0.18;
  const grandTotalVal = total + gst;
  setGrandTotal(grandTotalVal);

  return (
    <table>
      <thead>
      <tr>
        <th className="w-1/4 py-2 px-4 text-left font-bold">Total</th>
        <th className="w-1/4 py-2 px-4 text-right">{total}</th>
      </tr>
      <tr className="border-b">
        <th className="w-1/4 py-2 px-4 text-left font-bold">GST</th>
        <th className="w-1/4 py-2 px-4 text-right">18%</th>
      </tr>
      <tr className="border-b">
        <th className="w-1/4 py-2 px-4 text-left font-bold">Grand Total</th>
        <th className="w-1/4 py-2 px-4  text-right">{grandTotalVal}</th>
      </tr>
      </thead>
    </table>
  );
};

export default Table;
