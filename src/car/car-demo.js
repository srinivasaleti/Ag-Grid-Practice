import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-enterprise";
import { Input } from "../components/input/input";
import { CarData, DefaultCarData } from "./data";
import { CarSchema, validateCarSchema } from "./schema";

const CarDemo = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [data, setData] = useState([]);
  const [pinnedBottomRowData, setPinnedRowData] = useState(DefaultCarData);

  //Important: Ag grid columns does not maintain latest state. In order to hold the latest data if would be recommended to maintain ref.
  //Check https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback/60643670#60643670
  const carDataRef = useRef();
  carDataRef.current = data;

  const pinnedBottomStateRef = useRef();
  pinnedBottomStateRef.current = pinnedBottomRowData;

  const addData = (currentRow, newVal) => {
    if (currentRow.id == "pinned_row") {
      setPinnedRowData({ ...pinnedBottomStateRef.current, ...newVal });
      return;
    }

    const currentCarData = carDataRef.current || [];
    const updatedData = currentCarData?.map((row) => {
      if (row.id == currentRow.id) {
        return { ...currentRow, ...newVal };
      }
      return row;
    });
    setData(updatedData);
  };

  useEffect(() => {
    //Make API Call and get data
    setData(CarData);
  }, []);

  useEffect(() => {
    const error = validateCarSchema(pinnedBottomStateRef.current, CarSchema);
    console.log(error);
    const pinnedRowData = pinnedBottomStateRef.current || {};
    //Validate
    if (!error) {
      //Set data (Make API Call)
      setData([
        ...carDataRef.current,
        { ...pinnedRowData, id: carDataRef.current.length + 1 },
      ]);
      //Clear Pinned Row Data
      setPinnedRowData(DefaultCarData);
      return;
    }
  }, [pinnedBottomRowData]);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "make", filter: true, editable: true },
    {
      field: "model",
      cellRenderer: Input,
      cellRendererParams: {
        type: "text",
        onValueChange: addData,
        placeholder: "Model",
      },
    },
    {
      field: "price",
      editable: false,
      cellRenderer: Input,
      cellRendererParams: {
        type: "number",
        onValueChange: addData,
        placeholder: "Enter Price",
      },
    },
    {
      field: "release",
      editable: false,
      cellRenderer: Input,
      cellRendererParams: {
        type: "date",
        onValueChange: addData,
      },
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    enableRowGroup: true,
  }));

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "80vh" }}
      >
        <AgGridReact
          rowGroupPanelShow="always"
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          pinnedBottomRowData={[pinnedBottomRowData]}
        />
      </div>
      <>Hello World</>
    </div>
  );
};

export default CarDemo;
