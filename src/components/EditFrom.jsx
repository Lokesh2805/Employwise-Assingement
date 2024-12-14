import React, { useState, useEffect } from "react";

const EditForm = ({ user, onClose, onSave, isUpdating }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {isUpdating ? (
              <div className="flex items-center space-x-2">
                <span className="loader spinner-border animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Saving...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
