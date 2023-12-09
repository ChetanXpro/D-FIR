import React from "react";

export interface TableProps {
  columns: {
    key: string;
    title: string;
  }[];
  rows: {
    [key: string]: string;
  }[];
}
export default function Table(props: TableProps) {
  const { columns = [], rows = [] } = props;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            return (
              <tr key={row.id}>
                {columns.map(column => {
                  return <td key={column.key}>{row[column.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
