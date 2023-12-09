import React from "react";
import { Table } from "~~/components/global";

export default function Police() {
  const columns = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "job",
      title: "Job",
    },
    {
      key: "favoriteColor",
      title: "Favorite Color",
    },
  ];

  const rows = [
    {
      name: "John",
      job: "Software Engineer",
      favoriteColor: "Blue",
    },
    {
      name: "Jane",
      job: "Software Engineer",
      favoriteColor: "Green",
    },
    {
      name: "Jack",
      job: "Software Engineer",
      favoriteColor: "Red",
    },
  ];
  return <Table columns={columns} rows={rows} />;
}
