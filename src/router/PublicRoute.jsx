import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerInfo } from "../store/slices/customerInfoSlices";
import customerInfoServices from "../services/customerInfo";

import { Navigate } from "react-router-dom";
import paths from "../consts/paths";

function PublicRoute({ children }) {
  const [isLoading, setLoading] = useState(true);
  const infoData = useSelector((state) => state.customerInfo.info);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCusInfo = async () => {
      const data = await customerInfoServices.getInfo();
      if (!data.error && data != null) {
        dispatch(setCustomerInfo(data));
      }

      setLoading(false);
    };

    fetchCusInfo();
    return () => dispatch(setCustomerInfo(null));
  }, [dispatch]);

  if (isLoading) return <div />;
  if (!isLoading && infoData) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return children;
}

export default PublicRoute;
