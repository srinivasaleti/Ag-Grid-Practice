import { Input } from "../components/input/input";

export const StudentColumnDefinitions = ({
  onCellDataChangedHandler = () => {},
  onDeleteHandler = () => {},
}) => {
  return [
    {
      field: "delete",
      filter: true,
      editable: false,
      cellRenderer: (props) => (
        <button
          onClick={(e) => {
            onDeleteHandler(props.data);
          }}
        >
          X
        </button>
      ),
    },
    {
      field: "name",
      filter: true,
      editable: false,
      cellRenderer: Input,
      cellRendererParams: {
        type: "text",
        onValueChange: onCellDataChangedHandler,
        placeholder: "Name",
      },
      metadata: {
        required: true,
      },
    },
    {
      field: "branch",
      cellRenderer: Input,
      cellRendererParams: {
        type: "text",
        onValueChange: onCellDataChangedHandler,
        placeholder: "Branch",
      },
      metadata: {
        required: true,
      },
    },
    {
      field: "age",
      cellRenderer: Input,
      cellRendererParams: {
        type: "number",
        onValueChange: onCellDataChangedHandler,
        placeholder: "Age",
      },
      metadata: {
        required: true,
      },
    },
    {
      field: "dob",
      cellRenderer: Input,
      cellRendererParams: {
        type: "date",
        onValueChange: onCellDataChangedHandler,
        placeholder: "DOB",
      },
      metadata: {
        required: true,
      },
    },
  ];
};
