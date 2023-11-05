import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

const TableComponent = () => {
  const itemsList = useSelector((state) => state.items.itemsList);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredData = React.useMemo(() => {
    return itemsList.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.location.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [itemsList, filter]);

  const columns = React.useMemo(() => {
    if (filteredData.length > 0) {
      const keys = Object.keys(filteredData[0]).filter(
        (key) => key !== "_id" && key !== "__v"
      );
      return keys.map((key) => ({
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
      }));
    } else {
      return [];
    }
  }, [filteredData]);

  const memoizedData = React.useMemo(() => filteredData, [filteredData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: memoizedData });

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 rounded border my-4"
      />
      <table {...getTableProps()} className="w-full border rounded">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-2 px-4">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-100"
                onClick={() => navigate(`/item/${row.original.id}`)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="py-2 px-4">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
