import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table() {
    const [data, setData] = useState([]);
    const [OldData, setOldData] = useState([]);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null); // Track which item is in edit mode
    const [editedItem, setEditedItem] = useState({}); // Store the edited data

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch data from the backend API
                const response = await axios.get('http://localhost:5286/dashboard/getallcards');
                setData(response.data);
                setOldData(response.data);
               // console.log(response.data)
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('An error occurred while fetching data.');
            }
        }
       console.log ('refreshed')
        fetchData();
    }, []);

    // Function to handle the edit button click
    const handleEditClick = (item) => {
        setEditMode(item.id);
        setEditedItem({ ...item });
    };

    // Function to handle the save button click
    const handleSaveClick = async () => {
      try {
          // Perform an update operation with editedItem data using the updateCard endpoint
          const response = await axios.put(`http://localhost:5286/dashboard/update/${editedItem.id}`, editedItem);
  
          // Check the response status code to ensure success
          if (response.status === 200) {
              // If the update is successful, update the data state and exit edit mode
              const updatedData = data.map((item) =>
                  item.id === editedItem.id ? editedItem : item
              );
              setData(updatedData);
              setEditMode(null);
              setEditedItem({});
          } else {
              // Handle the error if the server returns a non-success status code
              console.error('Error updating data:', response.statusText);
          }
      } catch (error) {
          console.error('Error updating data:', error);
          // Handle the error as needed
      }
  };
  

    // Function to handle the cancel button click
    const handleCancelClick = () => {
        setEditMode(null);
        setEditedItem({});
    };

    // Function to remove an item
    const handleRemoveClick = async (item) => {
      try {
          // Perform a remove operation using the removeCard endpoint with correct interpolation
          const response = await axios.delete(`http://localhost:5286/dashboard/remove/${item.id}`);
  
          // Check the response status code to ensure success
          if (response.status === 200) {
              // If the deletion is successful, update the data state
              const updatedData = data.filter((i) => i.id !== item.id);
              setData(updatedData);
              
          } else {
              // Handle the error if the server returns a non-success status code
              console.error('Error removing data:', response.statusText);
          }
      } catch (error) {
          console.error('Error removing data:', error);
          // Handle the error as needed
      }
  };
  const filter=(item)=>{
    if(item)
    {
    const sampleDate = OldData.filter(c=>c.title.toLowerCase().includes(item.toLowerCase()) || c.description.toLowerCase().includes(item.toLowerCase()) )
     if(sampleDate)
     {
        setData(sampleDate)
     }
     else{
        setData(data)
     }
    }
    else{
        setData(OldData)
    }
    
    console.log(sampleDate)
  }


    return (
        <div className="pl-[260px] mt-[150px] pr-2 relative overflow-x-auto shadow-md rounded-lg">
         <div className="mt-2 max-w-md mb-3">
                    <input id="username" name="username" type="username" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" onChange={(e)=>filter(e.target.value)}></input>
                  </div>
         
            {error ? (
                <p>{error}</p>
            ) : (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {/* Table Header */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-cyan-950 dark:text-gray-400">
                        {/* ... */}
                        <tr>
            <th scope="col" class="px-3 py-3">
                Issue Title
            </th>
            <th scope="col" class="px-3 py-3">
                Description
            </th>
            <th scope="col" class="px-3 py-3">
                Category
            </th>
            <th scope="col" class="px-3 py-3">
                Status
            </th>
            <th scope="col" class="px-3 py-3">
                File
            </th>
            
            {/* <th scope="col" class="px-3 py-3">
                Company
            </th> */}
            <th scope="col" class="px-3 py-3">
                Assignee
            </th>
          
            <th scope="col" class="px-3 py-3">
                Update
            </th>
        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr
                                key={item.id}
                                className="bg-white border-b dark:bg-cyan-950 dark:border-gray-700"
                            >
                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.title}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.title
                                    )}
                                </td>
                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.description}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.description
                                    )}
                                </td>
                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.category}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    category: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.category
                                    )}
                                </td>
                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.stateName}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    stateName: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.stateName
                                    )}
                                </td> 
                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.file}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    file: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.file
                                    )}
                                </td>
                                
                           
                                {/* <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.company}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    company: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.company
                                    )}
                                </td> */}
                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <input
                                            type="text"
                                            value={editedItem.assignee}
                                            onChange={(e) =>
                                                setEditedItem({
                                                    ...editedItem,
                                                    assignee: e.target.value,
                                                })
                                            }
                                        />
                                    ) : (
                                        item.assignee
                                    )}
                                </td>
                              
                              
                                {/* ... */}

                                <td className="px-3 py-4">
                                    {editMode === item.id ? (
                                        <div>
                                            <button
                                                onClick={handleSaveClick}
                                                className="font-medium text-green-600 dark:text-green-500 hover:underline mr-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelClick}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <a
                                                href="#"
                                                onClick={() => handleEditClick(item)}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                                            >
                                                Edit
                                            </a>
                                            <a
                                                href="#"
                                                onClick={() => handleRemoveClick(item)}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Remove
                                            </a>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Table;

