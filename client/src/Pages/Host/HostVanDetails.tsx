import {Link, NavLink, Outlet, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import { VansType, ErrorType } from "../../types"
import { getVan, updateVan } from "../../api"

const HostVanDetails = () => {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = useState<VansType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<VansType>>({});

    useEffect(() => {
        const fetchData = async () => {
            if(!id) return;
            try{
                const data = await getVan(id);
                setCurrentVan(data as VansType);
                setEditForm(data as VansType);
            }catch(error){
                setError(error as ErrorType);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm(currentVan as VansType);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        
        try {
            const updatedVan = await updateVan(id, editForm);
            setCurrentVan(updatedVan);
            setIsEditing(false);
        } catch (error) {
            setError(error as ErrorType);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };
  
    if(loading) {
        return <div>Loading......</div>
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="host-van-detail-container">
            <button>
                <Link to=".." relative="path">
                    ⬅️ <span id="back">Back to all vans</span>
                </Link>
            </button>
            <div className="host-detail">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editForm.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type:</label>
                            <select
                                id="type"
                                name="type"
                                value={editForm.type || ''}
                                onChange={handleChange}
                                required
                            >
                                <option value="simple">Simple</option>
                                <option value="rugged">Rugged</option>
                                <option value="luxury">Luxury</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={editForm.price || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={editForm.description || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL:</label>
                            <input 
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={editForm.imageUrl || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="save-button">Save</button>
                            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="first-row">
                            <img src={currentVan?.imageUrl} alt="van" />
                            <div className="temp">
                                <button style={{ backgroundColor: currentVan?.type === 'simple' ? "#E17654" : 
                                    currentVan?.type === 'rugged' ? "#115E59" : "#161616"}} className="van-type">
                                    {currentVan?.type}
                                </button>
                                <h2>{currentVan?.name}</h2>
                                <p id="price">{currentVan?.price}/day</p>
                            </div>
                            <button onClick={handleEdit} className="edit-button">Edit Van</button>
                        </div>
                        <nav className="host-van-detail-nav">
                            <NavLink to="." end className={({isActive}) => isActive? "current-link" : ""}>
                                Details
                            </NavLink>
                            <NavLink to="pricing" className={({isActive}) => isActive? "current-link" : ""}>
                                Pricing
                            </NavLink>
                            <NavLink to="photo" className={({isActive}) => isActive? "current-link" : ""}>
                                Photo
                            </NavLink>
                        </nav>
                        <Outlet context={currentVan}/>
                        {/* <button onClick={handleEdit} className="edit-button">Edit Van</button> */}
                    </>
                )}
            </div>
        </div>
    )
}

export default HostVanDetails