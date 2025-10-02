import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/food/list')
      console.log(response.data.data)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error("Error fetching list")
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/food/remove', {
        data: { id }
      })  
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    }
    catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Foods List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Item</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Category</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Price</th>
              <th className="py-3 px-4 text-center text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 px-4">
                  <img
                    src={`${backendUrl}/images/` + item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">{item.name}</td>
                <td className="py-3 px-4 text-gray-600">{item.category}</td>
                <td className="py-3 px-4 font-medium text-gray-800">${item.price}</td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => removeFood(item._id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    ✕
                  </button>
                </td>
              </tr>
            ))}

            {list.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default List
