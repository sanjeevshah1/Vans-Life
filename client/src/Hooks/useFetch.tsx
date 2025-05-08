import { useState, useEffect } from "react";
import { VansType, ErrorType } from "../types";

type UseVansProps = {
  id?: string;
  isHost?: boolean;
};

function useFetch({ id, isHost }: UseVansProps) {
  const [vans, setVans] = useState<VansType[] | VansType | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const url = isHost 
          ? id ? `/api/host/vans/${id}` : "/api/host/vans"
          : id ? `/api/vans/${id}` : "/api/vans";
          
        const res = await fetch(url);

        if (!res.ok) {
          throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status.toString(),
          } as ErrorType;
        }

        const data = await res.json();
        setVans(data.vans);
      } catch (err) {
        setError(err as ErrorType);
      } finally {
        setLoading(false);
      }
    };

    fetchVans();
  }, [id, isHost]);

  return { vans, error, loading };
}

export default useFetch;
