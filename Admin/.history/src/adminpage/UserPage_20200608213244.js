import React from 'react'

import MaterialTable from 'material-table'
import {tableIcons} from './TableIcons'

export default function UserPage(props) {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Username', field: 'username' },
    { title: 'Email', field: 'price', type: 'numeric' },
    { title: 'Email', field: 'img' },
    { title: 'URL', field: 'url' },
    { title: 'Type', field: 'type' },
  ]);

  const [data, setData] = useState([]);

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
