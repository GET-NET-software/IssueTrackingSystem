import React from "react";
import '../assets/css/issue.css';
import { Select } from 'antd'; 
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };
// const onSearch = (value) => {
//   console.log('search:', value);
// };
// const filterOption = (input, option) =>
//   (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

function Issue(){
  const [formData, setFormData] = useState({
  title: '',
  description: '',
  category: ''
  });
  const [selectedFile, setSelectedFile] = useState (null);
  const navigate = useNavigate()
  const token = Cookies.get('token');

  const toHistory = () => {
    navigate('/history',{ replace:true})
  }
  const [imagePath, setimagePath] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    convertImageToBinary(file)
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("id", formData.title);
      formDataWithFile.append("title", formData.title);
      formDataWithFile.append("description", formData.description);
      formDataWithFile.append("category", formData.category);
      //formDataWithFile.append("file", selectedFile); 
      ///formDataWithFile.append("file", selectedFile);
      // Append the selected file to the FormData
      formDataWithFile.append("FilePath", imagePath); // Append the selected file to the FormData

      // Send a POST request with FormData to your API endpoint for adding an issue with a file upload
      const response = await axios.post('http://localhost:5286/addissue', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
      
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response, e.g., show a success message or redirect
      console.log('Issue added successfully:', response.data);
      alert("Issue submitted");
      toHistory();
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error adding issue:', error);
    }
  };
  const convertImageToBinary = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const binaryData = reader.result;
      setimagePath(binaryData)
      console.log(binaryData); // You can do something with binaryData here
    };

    reader.readAsDataURL(file);
  };
    return (
        <>
        <div className="h-screen w-full bg-amber-50 overflow-auto">
        <div className="text-orange font-extrabold text-3xl text-center py-2">Hello!</div>
        <div className="text-orange font-semibold text-ellipsis text-center py-0"> Please Submit your Issue here </div>
        <div className="issue"> 
        <div className="centered-content">

        <form onSubmit={handleSubmit} class="w-full mt-10">
  <div class="flex w-full flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-10 mb-6 md:mb-0">
      <label required class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-first-name">
         Issue Title
      </label>
    <input type="text" value={formData.title} onChange={handleChange} name="title" id="title" placeholder="your issue title in 3-5 words" class="w-96 py-2 px-2  border border-gray-300 text-gray-900 bg-gray-50 rounded-lg  " />
    </div>
    {/* <div class="w-full md:w-1/2 px-10">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-last-name">
         Company Branch Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Branch name"></input>
    </div> */}
  </div>

{/* product name */}
<div class="flex flex-wrap -mx-3 mb-6"> 
<div class="w-full md:w-1/2 px-10 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-license">
         PRODUCT NAME 
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" placeholder="Select a product">
          <option>Issue Tracking System</option>
          <option>Hospital management system</option>
          <option>Library management system</option>
        </select>
       {/* <Select
    showSearch
    placeholder="Select a product"
    optionFilterProp="product"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: 'issue tracking system',
        label: 'Issue Tracking System',
      },
      {
        value: 'hospital management system',
        label: 'Hospital Management System',
      },
      {
        value: 'license management system',
        label: 'License Management System',
      },
    ]}
  /> */}
      {/* <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-license" type="string" placeholder="license"></input> */}
    </div>
    </div>
   </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-10">
      {/* <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Please describe your issue here"></input> */}
      
        <label for="message" class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2">ISSUE DESCRIPTION</label>
        <textarea value={formData.description} onChange={handleChange} name="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe your issue here..."></textarea>

    </div>
  </div>



  {/* <div class="flex flex-wrap -mx-3 mb-2"> */}
   
    <div class="w-full md:w-1/2 px-10 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" for="grid-state">
         Category
      </label>
      <div class="relative">
        <select
        id ="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
         class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        
          <option value="Design Issue">Design Issue</option>
          <option  value="Development Issue">Development issue</option>
          <option  value="Unknown">Unknown</option>
        </select>

{/* <Select
    showSearch
    placeholder="Select a category"
    optionFilterProp="category"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: 'design issue',
        label: 'Design Issue',
      },
      {
        value: 'development issue',
        label: 'Development Issue',
      },
      // {
      //   value: 'category 3',
      //   label: 'Category 3',
      // },
      {
        value: 'unknown',
        label: 'Unknown',
      },

    ]}
    /> */}
       <div className="py-10">
          <label className="block uppercase tracking-wide text-orange-950 text-xs font-bold mb-2" htmlFor="file_input">UPLOAD FILE</label>
          <input
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </div>
        
        <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-orange-600 px-35 py-1.5 text-sm  font-semibold leading-6 text-white shadow-sm hover:bg-orange-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
      </div>
      
     {/* // </div> */}
    </div>
  </div>
</form>
</div>
</div>

        </div>
        </>
    )
}
export default Issue;