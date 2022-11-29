import { useCallback } from "react";

export const useGridAPI = (gridRef) => {
  const onRemoveOne = useCallback((record) => {
    return gridRef.current.api.applyTransaction({ remove: [record] });
  }, []);

  const onUpdateOne = useCallback((record) => {
    const updatedRecords = [];

    gridRef.current.api.forEachNode((node) => {
      const data = node.data;

      if (data.id !== record.id) {
        return;
      }

      updatedRecords.push(record);
    });

    return gridRef.current.api.applyTransaction({
      update: updatedRecords,
    });
  }, []);

  const onInsertOne = useCallback((record) => {
    return gridRef.current.api.applyTransaction({
      add: [record],
    });
  }, []);

  return {
    onRemoveOne,
    onUpdateOne,
    onInsertOne,
  };
};
