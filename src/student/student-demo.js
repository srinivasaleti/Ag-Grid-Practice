import React, { useState, useRef, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-enterprise";
import { StudentSchema, validateSchema } from "./schema";
import { StudentColumnDefinitions } from "./student-call-definitions";
import { StudentApi } from "../api/api";

const pinnedRowID = "PINNED_ROW_ID";
const StudentDemo = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [data, setData] = useState([]);
  const [pinnedBottomRowData, setPinnedRowData] = useState({ id: pinnedRowID });

  //Important: Ag grid columns does not maintain latest state. In order to hold the latest data if would be recommended to maintain ref.
  //Check https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback/60643670#60643670
  const pinnedBottomStateRef = useRef();
  pinnedBottomStateRef.current = pinnedBottomRowData;

  const addStudent = async (student) => {
    const error = validateSchema(student, StudentSchema);

    if (!error) {
      await StudentApi.addStudent(student);
      setPinnedRowData({ id: pinnedRowID });
      return;
    }
  };

  const updateStudent = async (student) => {
    await StudentApi.updateStudent(student);
    await getStudents();
  };

  const deleteStudent = async (student) => {
    await StudentApi.deleteStudent(student);
    await getStudents();
  };

  const onCellDataChangedHandler = async (currentRow, newVal) => {
    if (currentRow.id == pinnedRowID) {
      const student = { ...pinnedBottomStateRef.current, ...newVal };
      setPinnedRowData(student);
      await addStudent(student);
    } else {
      await updateStudent({ ...currentRow, ...newVal });
    }
    await getStudents();
  };

  const columns = StudentColumnDefinitions({
    onCellDataChangedHandler,
    onDeleteHandler: deleteStudent,
  });

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState(columns);

  const getStudents = async () => {
    setData(await StudentApi.getStudents());
  };

  useEffect(() => {
    getStudents();
  }, []);

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
    </div>
  );
};

export default StudentDemo;
