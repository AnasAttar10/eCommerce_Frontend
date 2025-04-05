import { useState } from 'react';

const useEditRecord = () => {
  const [recordId, setRecordId] = useState<string | null>(null);
  const handleEdit = (id: string) => {
    setRecordId(id);
  };
  const resetRecordId = () => {
    setRecordId(null);
  };
  return {
    recordId,
    setRecordId,
    handleEdit,
    resetRecordId,
  };
};
export default useEditRecord;
