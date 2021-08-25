import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function timeConverter(UNIX_timestamp, index){
  var a = new Date((UNIX_timestamp + index) * 1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

function ReactApexChart({ options, series }) {
  const options = React.useMemo(() => items, [])
  this.state = {
          
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    },     
  };
}

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://611cf8c67d273a0017e2f550.mockapi.io/api/v1/cases")
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach((element, index=0) => {
            index = index + 1;
            element.tradeTime = timeConverter(parseInt(element.tradeTime),index);
          });
          
          setItems(result);
        }
      )
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'accountId'
      },
      {
        Header: 'Account Type',
        accessor: 'accountType'
      },
      
      {
        Header: 'Account Display Name',
        accessor: 'displayName'
      },
      {
        Header: 'Price ($)',
        accessor: 'price'
      },
      {
        Header: 'Quantity',
        accessor: 'quantity'
      },
      {
        Header: 'Direction',
        accessor: 'role'
      },
      {
        Header: 'Volume ($)',
        accessor: 'total'
      },
      {
        Header: 'Trade Time',
        accessor: 'tradeTime'
      },
      
    ],
    []
  )

  const data = React.useMemo(() => items, [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} />
      </div>

    </Styles>
    
  )
}

export default App