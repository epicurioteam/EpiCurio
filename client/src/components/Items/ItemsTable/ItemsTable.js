import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

const TableComponent = () => {
  const navigate = useNavigate();
  const itemsList = useSelector((state) => state.items.itemsList);
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = React.useMemo(() => {
    return itemsList.filter((item) =>
      Object.keys(filters).every((key) =>
        String(item[key])
          .toLowerCase()
          .includes((filters[key] || "").toLowerCase())
      )
    );
  }, [itemsList, filters]);

  const columns = React.useMemo(() => {
    if (filteredData.length > 0) {
      const keys = Object.keys(filteredData[0]).filter(
        (key) => key !== "_id" && key !== "__v"
      );
      return keys.map((key) => ({
        Header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key,
        id: key,
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
      <table {...getTableProps()} className="w-full border rounded">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <React.Fragment key={index}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="py-2 px-4">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="py-2 px-4">
                    <input
                      type="text"
                      placeholder={`Filter ${column.render("Header")}`}
                      value={filters[column.id] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.id, e.target.value)
                      }
                      className="w-full p-2 rounded border"
                    />
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-100"
                onClick={() => navigate(`/item/${row.original._id}`)}
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
