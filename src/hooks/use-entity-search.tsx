import { useState, useEffect } from 'react';
import { Pagination } from '@/config/constant';


//Interface for the hook parameters
interface UseEntitySearchParams<T extends {
    search: string,
    page: number
}> {
    params: T;
    setParams: (params: T) => void;
    debounceTime?: number;
}
//Custom hook for entity search with debounce
export const useEntitySearch = <T extends { search: string, page: number }>({
    params,
    setParams,
    debounceTime = 300
}: UseEntitySearchParams<T>) => {

    const [localSearch, setLocalSearch] = useState<string>(params.search)

    useEffect(() => {
        if (localSearch == "" && params.search != "") {
            setParams({
                ...params,
                search: "",
                page: Pagination.DEFAULT_PAGE
            })
            return;
        }

        const timer = setTimeout(() => {
            if (localSearch !== params.search) {
                setParams({
                    ...params,
                    search: localSearch,
                    page: Pagination.DEFAULT_PAGE
                })
            } 
        }, debounceTime)

        return () => clearTimeout(timer);

    }, [localSearch, params, setParams, debounceTime]);

    useEffect(() => {
        setLocalSearch(params.search);
    }, [params.search]);

    return {
        searchValue: localSearch,
        onSearchChange: setLocalSearch
    }


}