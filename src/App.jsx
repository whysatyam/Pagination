import React, { useState, useEffect } from "react";
import Pagination from "./component/Pagination";
import axios from "axios";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        const totalPosts = response.headers["x-total-count"];
        setData(response.data);
        setTotalItems(totalPosts);
      } catch (error) {
        console.error("some error:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="App">
      <div className="flex justify-center items-start pt-4">
        <img className="w-32 h-auto" src="/rebidlogo.webp" alt="logo" />
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        {data.map((item) => (
          <div key={item.id} className="p-4 mb-2 border rounded bg-gray-100">
            <h3 className="font-bold text-red-500">{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;