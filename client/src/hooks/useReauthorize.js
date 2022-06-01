import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reauthorize } from "../api/api";

const useReauthorize = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reauthorize());
    }, []);
};

export default useReauthorize;
