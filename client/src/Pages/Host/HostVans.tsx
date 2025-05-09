import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { VansType, ErrorType } from "../../types.js"
import { getHostVans, createVan } from "../../api.js"

const HostVans = () => {
    const [hostVansData, setHostVansData] = useState<VansType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        type: 'Simple',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHostVans()
                setHostVansData(data as VansType[]);
                setError(null)
            } catch (error) {
                setError(error as ErrorType);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newVan = await createVan({
                name: formData.name,
                price: Number(formData.price),
                description: formData.description,
                type: formData.type as 'Simple' | 'Luxury' | 'Rugged',
                imageUrl: formData.imageUrl
            });
            setHostVansData(prev => prev ? [...prev, newVan] : [newVan]);
            setShowForm(false);
            setError(null)
            setFormData({
                name: '',
                price: '',
                description: '',
                type: 'Simple',
                imageUrl: ''
            });
        } catch (error) {
            setError(error as ErrorType);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return <div>Loading......</div>
    }

    return (
        <div className="listed-vans">
            <div className="head">
                <p>Your Listed Vans</p>
                <button 
                    onClick={() => setShowForm(true)}
                    className="add-van-btn"
                >
                   +  Add New Van
                </button>
            </div>
            {
                error && <div>Error: {error.message}</div>
            }
            {showForm && (
                <div className="add-van-form">
                    <h2>Add New Van</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Van Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price per day"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="Simple">Simple</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Rugged">Rugged</option>
                        </select>
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                        <div className="form-buttons">
                            <button type="submit">Add Van</button>
                            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {hostVansData?.map((van) =>
            van?._id ? (
                <Link to={van._id} key={van._id}>
                <div className="van-box verti-center">
                    <img src={van.imageUrl} alt={van.name} />
                    <div className="van-explain">
                    <p>{van.name}</p>
                    <p>{van.price}/day</p>
                    </div>
                    <p>Edit</p>
                </div>
                </Link>
            ) : null
            )}

        </div>
    )
}

export default HostVans