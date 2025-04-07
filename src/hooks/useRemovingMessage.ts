import { useState } from 'react';

const useRemovingMessage = () => {
  const [showRemovingMessage, setShowRemovingMessage] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | undefined>(
    undefined
  );
  const handleRemovingMessage = (id: string | undefined) => {
    if (id) {
      setSelectedElement(id);
      setShowRemovingMessage(true);
    } else {
      setShowRemovingMessage(true);
    }
  };
  return {
    showRemovingMessage,
    setShowRemovingMessage,
    selectedElement,
    setSelectedElement,
    handleRemovingMessage,
  };
};
export default useRemovingMessage;
