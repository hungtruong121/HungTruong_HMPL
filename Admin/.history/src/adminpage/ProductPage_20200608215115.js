import React,{useEffect} from 'react'

import MaterialTable from 'material-table'
import {tableIcons} from './TableIcons'
import Axios from 'axios';

export default function ProductPage(props) {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Price', field: 'price', type: 'numeric' },
    { title: 'Image', field: 'img' },
    { title: 'URL', field: 'url' },
    { title: 'Type', field: 'type' },
  ]);

  const [data, setData] = useState([]);
  const fecthProduct = async ()=>{
    const url = 'https://hml-project.herokuapp.com/api/foods/market?page=1';
    const res = await  Axios.get(url);
    set
  };
  useEffect(()=>{
    fecthProduct();
  })

  return (
    <MaterialTable
      title="Product"
      columns={columns}
      data={data}
      icons={tableIcons}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}
