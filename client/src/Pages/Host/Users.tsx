import { useEffect, useState } from "react"
export interface User {
    _id: string;
    email: string;
    password: string;
    name: string;
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
    useEffect(()=>{
        const fetchUsers = async ()=> {
            const res = await fetch('http://localhost:1337/api/users')
            const data: UserApiResponse = await res.json();
            setUsers(data.data);
        }
        fetchUsers();
    },[])
  return (
    <div className="users">
        {
           users.length > 0
           ? users.map((user) => (
               <p key={user._id}>{user.name}</p>
           ))
           : <p>No users found.</p>
        }
    </div>
  )
}

export default Users