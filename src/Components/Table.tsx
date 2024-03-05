import React from "react";
import { MdDelete } from "react-icons/md";

interface Product {
  name: string;
  qty: number;
  rate: number;
}

interface TableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Table: React.FC<TableProps> = ({ products, setProducts }) => {
  const handleNameChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].name = value;
    setProducts(updatedProducts);
  };

  const handleQtyChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].qty = parseInt(value);
    setProducts(updatedProducts);
  };

  const handleRateChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].rate = parseInt(value);
    setProducts(updatedProducts);
  };

  const handleDelete = (index: number) => {
    if (products.length > 1) {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    }
  };
  return (
    <tbody>
      {products.map((product, index) => (
        <tr key={index}>
          <td className="py-2 px-4">
            <input
              type="text"
              className="border-2 w-full"
              value={product.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </td>
          <td className="py-2 px-4">
            <input
              type="number"
              className="border-2 w-full"
              value={product.qty}
              onChange={(e) => handleQtyChange(index, e.target.value)}
            />
          </td>
          <td className="py-2 px-4">
            <input
              type="number"
              className="border-2 w-full"
              value={product.rate}
              onChange={(e) => handleRateChange(index, e.target.value)}
            />
          </td>
          <td className="py-2 px-4">INR {product.qty * product.rate}</td>
          {index > 0 && (
            <td className="py-2">
              <button onClick={() => handleDelete(index)}><MdDelete size={"2em"} /></button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default Table;
