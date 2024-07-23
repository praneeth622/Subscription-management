import React, { useState } from 'react';

const Create = () => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);

  const addItem = (afterId = null) => {
    const newItem = { id: count, text: `Item ${count}` };
    if (afterId === null) {
      setItems([...items, newItem]);
    } else {
      const index = items.findIndex(item => item.id === afterId);
      const newItems = [...items];
      newItems.splice(index + 1, 0, newItem);
      setItems(newItems);
    }
    setCount(count + 1);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (id, newText) => {
    setItems(items.map(item => item.id === id ? { ...item, text: newText } : item));
  };

  return (
    <div className="p-4">
      <button
        onClick={() => addItem()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add
      </button>
      {items.map(item => (
        <div key={item.id} className="mb-2">
          <div className="flex items-center p-2 bg-gray-100 rounded-md">
            <button
              onClick={() => deleteItem(item.id)}
              className="mr-2 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
            <span className="flex-1">{item.text}</span>
            <button
              onClick={() => {
                const newText = prompt('Edit item:', item.text);
                if (newText) {
                  editItem(item.id, newText);
                }
              }}
              className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md"
            >
              Edit
            </button>
          </div>
          <button
            onClick={() => addItem(item.id)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Create;
