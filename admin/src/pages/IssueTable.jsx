import React from 'react';
import { Table } from 'antd';

function IssueTable(){
const columns = [
    //issue title
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'title',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'issue1',
          value: 'issue1',
        },
        {
          text: 'issue2',
          value: 'issue2',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    //company name coulumn
    {
      title: 'Company',
      children: [
        {
          title: 'Company Address',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 200,
        },
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName',
          filters: [
            {
              text: 'company1',
              value: 'company1',
            },
            {
              text: 'company2',
              value: 'company2',
            },
          ],
          onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
      ],
    },
  // Assignee column
    {
      title: 'Assignee Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'John',
          value: 'John',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
  // Status Column
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'Back Log',
          value: 'backLog',
        },
        {
          text: 'To Do',
          value: 'toDo',
        },
        {
          text: 'In Progress',
          value: 'inProgress',
        },
        {
          text: 'Done',
          value: 'done',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
  // Category
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    fixed: 'left',
    filters: [
      {
        text: 'Category 1',
        value: 'Category1',
      },
      {
        text: 'Category 2',
        value: 'Category2',
      },
      {
        text: 'Category 3',
        value: 'Category3',
      },
      {
        text: 'Category 4',
        value: 'Category4',
      },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  //discription
    {
      title: 'Discription',
      dataIndex: 'discription',
    },
  
   ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }
const  issueTable = () => {
  return (
    
<Table 
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    scroll={{
      x: 'calc(700px + 50%)',
      y: 240,
    }}
  />
  )
}
}
export default IssueTable;