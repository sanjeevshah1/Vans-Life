import { useEffect, useState } from "react";
import { Search, User, Mail, Calendar, Loader, Trash2, AlertTriangle, X } from "lucide-react";
import "./Users.css"; // Import the CSS file

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserApiResponse {
  success: boolean;
  data: User[];
  message: string | null;
}

const Users = () => {
  const [users, setUsers] = useState<[] | User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null
  });

  useEffect(() => {
    console.log("Token in localStorage:", localStorage.getItem("accessToken"));

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:1337/api/host", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data: UserApiResponse = await res.json();
        setUsers(data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Open delete confirmation modal
  const openDeleteModal = (userId: string) => {
    setDeleteModal({
      isOpen: true,
      userId: userId
    });
  };
  
  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      userId: null
    });
  };
  
  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!deleteModal.userId) return;
    
    const userId = deleteModal.userId;
    setDeleteLoading(userId);
    closeDeleteModal();
    
    try {
      const res = await fetch(`http://localhost:1337/api/host/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
      
      // Remove user from state
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="users-container">
      <div className="users-content">
        <h1 className="users-title">Users</h1>
        <p className="users-subtitle">Manage and view all user accounts</p>
        
        {/* Search bar */}
        <div className="search-container">
          <div className="search-icon">
            <Search className="search-icon-svg" />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <Loader className="loading-icon" />
            <span className="loading-text">Loading users...</span>
          </div>
        ) : error ? (
          <div className="error-container">
            {error}
          </div>
        ) : (
          <div className="users-grid">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div 
                  key={user._id} 
                  className="user-card"
                >
                  <div className="user-card-accent" />
                  <div className="user-card-content">
                    <div className="user-header">
                      <div className="user-avatar">
                        <User className="user-avatar-icon" />
                      </div>
                      <div className="user-info-main">
                        <h3 className="user-name">{user.name[0].toUpperCase() + user.name.slice(1)}</h3>
                        <span className="user-role">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="user-details">
                      <div className="user-detail">
                        <Mail className="user-detail-icon" />
                        <span className="user-detail-text">{user.email}</span>
                      </div>
                      <div className="user-detail">
                        <Calendar className="user-detail-icon" />
                        <span className="user-detail-text">Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                    <button 
                      className="delete-button"
                      onClick={() => openDeleteModal(user._id)}
                      disabled={deleteLoading === user._id}
                      aria-label="Delete user"
                    >
                      {deleteLoading === user._id ? (
                        <Loader className="delete-loading-icon" />
                      ) : (
                        <>
                          <Trash2 className="delete-icon" />
                          Delete User
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-users">
                <div className="no-users-content">
                  <User className="no-users-icon" />
                  <h3 className="no-users-title">No users found</h3>
                  <p className="no-users-subtitle">Try adjusting your search criteria</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-icon-wrapper">
                <AlertTriangle className="modal-icon" />
              </div>
              <button className="modal-close" onClick={closeDeleteModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <h3 className="modal-title">Confirm Deletion</h3>
              <p className="modal-text">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={handleDeleteUser}>
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;