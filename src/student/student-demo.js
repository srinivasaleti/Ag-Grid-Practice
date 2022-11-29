import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-enterprise";
import { StudentSchema, validateSchema } from "./schema";
import { StudentColumnDefinitions } from "./student-call-definitions";
import { StudentApi } from "../api/api";
import { useGridAPI } from "../hooks/use-grid-api";

const pinnedRowID = "PINNED_ROW_ID";
const StudentDemo = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [data, setData] = useState([]);
  const [pinnedBottomRowData, setPinnedRowData] = useState({ id: pinnedRowID });

  const gridAPI = useGridAPI(gridRef);

  //Important: Ag grid columns does not maintain latest state. In order to hold the latest data if would be recommended to maintain ref.
  //Check https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback/60643670#60643670
  const pinnedBottomStateRef = useRef();
  pinnedBottomStateRef.current = pinnedBottomRowData;

  const addStudent = async (student) => {
    const error = validateSchema(student, StudentSchema);
    if (!error) {
      StudentApi.addStudent(student);
      gridAPI.onInsertOne(student);
      setPinnedRowData({ id: pinnedRowID });
      return;
    }
  };

  const updateStudent = async (student) => {
    StudentApi.updateStudent(student);
  };

  const deleteStudent = async (student) => {
    StudentApi.deleteStudent(student);
    gridAPI.onRemoveOne(student);
  };

  const onCellDataChangedHandler = async (currentRow, newVal) => {
    if (currentRow.id == pinnedRowID) {
      const student = { ...pinnedBottomStateRef.current, ...newVal };
      setPinnedRowData(student);
      await addStudent(student);
    } else {
      const newStudent = { ...currentRow, ...newVal };
      gridAPI.onUpdateOne(newStudent);
      updateStudent(newStudent);
    }
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

  const getRowID = useCallback((params) => {
    return params.data.id;
  });

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
          getRowId={getRowID}
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
