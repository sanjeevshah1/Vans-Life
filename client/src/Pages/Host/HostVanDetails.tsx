import { Link, NavLink, Outlet, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { VansType, ErrorType } from "../../types"
import { getVan, updateVan } from "../../api"

const HostVanDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentVan, setCurrentVan] = useState<VansType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<ErrorType | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedVan, setEditedVan] = useState<VansType | null>(null)
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)
    const [updateError, setUpdateError] = useState<ErrorType | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            if(!id) return
            try {
                const data = await getVan(id)
                setCurrentVan(data)
                setEditedVan(data)
            } catch(error) {
                console.log("The error is", error)
                setError(error as ErrorType)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setEditedVan(prev => {
            if (!prev) return prev
            return {
                ...prev,
                [name]: name === 'price' ? Number(value) : value
            }
        })
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editedVan || !id) return
        
        setUpdateLoading(true)
        setUpdateError(null)
        
        try {
            const updatedVan = await updateVan(id, editedVan)
            setCurrentVan(updatedVan)
            console.log("The updated Van is ", currentVan)
            setIsEditing(false)
            console.log("Update done")
            // Optional: Show success message
        } catch (error) {
          console.log(error)
            setUpdateError(error as ErrorType)
        } finally {
            setUpdateLoading(false)
        }
    }

    const cancelEdit = () => {
        setEditedVan(currentVan)
        setIsEditing(false)
    }

    const getTypeBackgroundColor = (type: string | undefined): string => {
        if (type === "Simple") return "#E17654"
        if (type === "Rugged") return "#115E59"
        if (type === "Luxury") return "#161616"
        return "#777777"
    }

    if(loading) {
        return (
            <div className="host-van-detail-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading van details...</p>
                </div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="host-van-detail-container">
                <div className="error-message">
                    <p>Error: {error.message}</p>
                    <button onClick={() => navigate('..')} className="back-button">
                        Back to all vans
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="host-van-detail-container">
            <div className="detail-header">
                <Link to=".." relative="path" className="back-link">
                    ←<span id="back">Back to all vans</span>
                </Link>
                
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="edit-van-button"
                    >
                        Edit Van
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="host-detail edit-mode">
                    <h2>Edit Van Details</h2>
                    
                    {updateError && (
                        <div className="error-message">
                            <p>Update failed: {updateError.message}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleUpdate} className="edit-van-form">
                        <div className="form-group">
                            <label htmlFor="name">Van Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editedVan?.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={editedVan?.type || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="Simple">Simple</option>
                                <option value="Rugged">Rugged</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="price">Price per day ($)</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={editedVan?.price || 0}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={editedVan?.description || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={editedVan?.imageUrl || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-buttons">
                            <button 
                                type="submit" 
                                className="save-button"
                                disabled={updateLoading}
                            >
                                {updateLoading ? 'Updating...' : 'Save'}
                            </button>
                            <button 
                                type="button" 
                                onClick={cancelEdit} 
                                className="cancel-button"
                                disabled={updateLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="host-detail">
                    <div className="first-row">
                        <img src={currentVan?.imageUrl} alt={currentVan?.name} className="van-image" />
                        <div className="van-info">
                            <button 
                                className="van-type-badge"
                                style={{ 
                                    backgroundColor: getTypeBackgroundColor(currentVan?.type),
                                    color: "white"
                                }}
                            >
                                {currentVan?.type}
                            </button>
                            <h2>{currentVan?.name}</h2>
                            <p className="van-price">${currentVan?.price}/day</p>
                        </div>
                    </div>
                    
                    <nav className="host-van-detail-nav">
                        <NavLink 
                            to="." 
                            end 
                            className={({isActive}) => isActive ? "nav-link current-link" : "nav-link"}
                        >
                            Details
                        </NavLink>
                        <NavLink 
                            to="pricing" 
                            className={({isActive}) => isActive ? "nav-link current-link" : "nav-link"}
                        >
                            Pricing
                        </NavLink>
                        <NavLink 
                            to="photo" 
                            className={({isActive}) => isActive ? "nav-link current-link" : "nav-link"}
                        >
                            Photos
                        </NavLink>
                    </nav>
                    
                    <div className="outlet-container">
                      {currentVan && <Outlet context={currentVan}/>
                      }
                    </div>
                </div>
            )}
        </div>
    )
}

export default HostVanDetails