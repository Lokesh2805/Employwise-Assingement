import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditForm from "../components/EditFrom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const UserList = () => {
  const [usersData, setUsersData] = useState({}); // Store data for all pages
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch users for a specific page if not already fetched
  const fetchUsers = async (page) => {
    if (usersData[page]) {
      // Use cached data
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      const { data, total_pages } = response.data;

      setUsersData((prev) => ({ ...prev, [page]: data }));
      setTotalPages(total_pages);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle page change
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  // Handle delete
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsersData((prev) => {
        const updatedPageData = prev[currentPage].filter(
          (user) => user.id !== userId
        );
        return { ...prev, [currentPage]: updatedPageData };
      });
      setSuccessMessage("User deleted successfully.");
    } catch (err) {
      setError("Failed to delete the user. Please try again.");
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (updatedUser) => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${updatedUser.id}`,
        updatedUser
      );
      setUsersData((prev) => {
        const updatedPageData = prev[currentPage].map((user) =>
          user.id === updatedUser.id ? response.data : user
        );
        return { ...prev, [currentPage]: updatedPageData };
      });
      setEditingUser(null);
      setSuccessMessage("User updated successfully.");
    } catch (err) {
      setError("Failed to update the user. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const currentUsers = usersData[currentPage] || [];

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center mb-10">
        <h2 className="text-5xl text-[#3c009d] font-bold mb-4 text-center">
          User List
        </h2>
        <div className="w-16 h-1.5 bg-[#3c009d] rounded-xl"></div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-green-500 bg-green-100 px-4 py-2 rounded mb-4">
          {successMessage}
        </p>
      )}

      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <LazyLoadImage
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-24 h-24 rounded-full mb-4 border-[2px] border-[#6842EF] border-solid p-2"
              />
              <h2 className="text-lg font-medium">
                {user.first_name} {user.last_name}
              </h2>
              <p>{user.email}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 gap-1 flex justify-center items-center text-center bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <MdOutlineModeEditOutline />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 gap-1 flex justify-center items-center text-center bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <RiDeleteBin6Line />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <span className="w-10 h-10 flex justify-center items-center  rounded-md">
            <BsChevronLeft size="1.5em" />
          </span>
        }
        nextLabel={
          <span className="w-10 h-10 flex justify-center items-center  rounded-md">
            <BsChevronRight size="1.5em" />
          </span>
        }
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName={"flex items-center justify-center mt-6 space-x-2"}
        pageClassName={
          "w-10 h-10 flex justify-center items-center px-3 py-1 bg-gray-200 rounded-md"
        }
        previousClassName={"px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"}
        nextClassName={"px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"}
        activeClassName={" bg-[#6842EF] text-white"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />

      {/* Edit Form */}
      {editingUser && (
        <EditForm
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdate}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};


export default UserList;
