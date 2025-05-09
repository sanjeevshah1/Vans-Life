import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { VansType, ErrorType } from "../../types.js"
import { getHostVans, createVan } from "../../api.js"

const HostVans = () => {
    const [hostVansData, setHostVansData] = useState<VansType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newVan, setNewVan] = useState<Omit<VansType, 'id'>>({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        type: 'simple'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHostVans()
                setHostVansData(data as VansType[]);
            } catch (error) {
                setError(error as ErrorType);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleCreate = () => {
        setIsCreating(true);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setNewVan({
            name: '',
            price: 0,
            description: '',
            imageUrl: '',
            type: 'Simple'
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdVan = await createVan(newVan);
            setHostVansData(prev => prev ? [...prev, createdVan] : [createdVan]);
            setIsCreating(false);
            setNewVan({
                name: '',
                price: 0,
                description: '',
                imageUrl: '',
                type: 'imple'
            });
        } catch (error) {
            setError(error as ErrorType);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewVan(prev => ({
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
        <div className="listed-vans">
            <div className="head">
                <p>Your Listed Vans</p>
                {!isCreating && (
                    <button onClick={handleCreate} className="add-van-button">
                        + Add Van
                    </button>
                )}
            </div>
            {isCreating ? (
                <form onSubmit={handleSubmit} className="create-van-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newVan.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select
                            id="type"
                            name="type"
                            value={newVan.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="Simple">Simple</option>
                            <option value="Rugged">Rugged</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newVan.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newVan.description}
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
                            value={newVan.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="save-button">
                            Create Van
                        </button>
                        <button type="button" onClick={handleCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                hostVansData?.map((van) => van._id ? (
                    <Link to={van._id} key={van._id}>
                        <div className="van-box verti-center">
                            <img src={van.imageUrl} alt={van.name} />
                            <div className="van-explain">
                                <p>{van.name}</p>
                                <p>{van.price}/day</p>
                            </div>
                            <p>View</p>
                        </div>
                    </Link>
                ) : null)
            )}
        </div>
    )
}

export default HostVans