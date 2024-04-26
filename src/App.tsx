import { useState, useEffect } from 'react';

interface Product {
  name: string;
  priceInPounds: number;
  status: string;
  categories: string[];
  isChecked: boolean;
}

function App() {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        // console.log(response.data);
        setProductData(response.data);        
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      })
  }, []);
 

  function changeStatus(newStatus: string) {
    const newArray = [...productData];
    newArray.forEach(product => {
      if (product.isChecked) {
        product.status = newStatus
        console.log(`[${product.name}] New Status: ${newStatus}`)
      }
    })
    setProductData(newArray)
  }

  function changeCheckedState(index: number) {
    const newArray = [...productData];
    newArray[index].isChecked = !newArray[index].isChecked
    setProductData(newArray)
  }

  function handleDelete(index: number) {
    const productsArr = [...productData];
    productsArr.splice(index, 1); 
    setProductData(productsArr)
    // console.log(productsArr)
  }

  return (
    <>
    <section className="relative overflow-x-auto text-gray-600 text-center  bg-gray-100">
      <h1 className="text-2xl font-bold my-10 font-mono" >3D Group technical assessment - React frontend</h1>        
      <table className="table-auto w-full md:w-2/3 bg-white border-collapse border-b  border-gray-300 text-left text-wrap shadow-lg mx-auto mb-20">
        <thead className="uppercase font-mono text-lg border-b border-gray-500">
          <tr>
            <th className="py-2 pl-2">
              <select 
                onChange={(e) =>{
                  changeStatus(e.target.value)
                } }
                id="set-status"
                className="font-semibold text-gray-600 font-sans px-1 py-2 rounded m-1 hover:bg-gradient-to-b hover:bg-blue-100 focus:ring-2 focus:ring-blue-100 focus:bg-blue-50 focus:shadow-sm align-middle">
                  <option value="" className="text-gray-400">Set Status</option>
                  <option value="active" className="hover:bg-blue-200">Active</option>
                  <option value="pendingReview">Pending</option>
                  <option value="disabled">Disabled</option>
              </select>
              <label className="hidden" htmlFor="set-status" aria-label="set-status">
                Set Status
              </label> 
            </th>          
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4 text-right">Price</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Categories</th>
            <th className="px-4 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((product, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="px-4 py-4 border-b border-gray-300 text-center">                 
                <input
                  id={`checkbox-${product.name}`}
                  type="checkbox"
                  name={product.name}
                  checked={!!product.isChecked}
                  onChange={() => changeCheckedState(index)}
                  className="w-5 h-5 align-middle"
                />
                <label className="hidden" htmlFor={`checkbox-${product.name}`} aria-label={`checkbox-${product.name}`}>
                  {product.name}
                </label>            
              </td>
              <td className="px-4 py-4 border-b border-gray-300 text-lg font-bold">
                  {product.name}
              </td>
              <td className="px-4 py-4 border-b border-gray-300 text-lg text-right">
                £{product.priceInPounds}
              </td> 
              <td className="px-4 py-4 border-b border-gray-300">
                <div className="flex flex-row items-end">
                  <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" className={product.status === "active" ? 
                          "fill-emerald-500 animate-pulse" : (product.status === "pendingReview" ? 
                          "fill-orange-400" : "fill-rose-500" )}>
                      <circle cx="0.3em" cy="0.3em" r="0.3em" 
                        fill="inherit"
                      />
                  </svg>
                  <span>{product.status}</span>                
                </div>                
              </td>
              <td className="px-4 py-4 border-b border-gray-300">
                <div className="flex flex-wrap">
                  {Array.from(product.categories).map((category, idx) => 
                    <span key={idx} className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-2 py-0.5 rounded m-1 hover:bg-gradient-to-b">
                        {category}
                    </span>)
                  }
                </div>
              </td>
              <td className="px-4 py-4 border-b border-gray-300">
                <button 
                  type="button"
                  className="px-2 py-1.5 text-white bg-gradient-to-b from-red-300 via-red-400 to-red-500 rounded font-semibold align-middle hover:bg-gradient-to-bl shadow-md hover:shadow-lg focus:ring-2 focus:ring-red-200"
                  onClick={() => handleDelete(index)}
                  >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </>
  );
}

export default App;
