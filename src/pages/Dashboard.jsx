import { useCallback, useEffect, useRef, useState } from "react";
import { Container, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { SearchInput } from "../components/dashboard";
import courseServices from "../services/course";
import {
  clearQueryData,
  setQueryData,
  setSearchOptions,
} from "../store/slices/courseSlices";
import Course from "../components/dashboard/Course";
import DashboardAppBar from "../layouts/DashboardAppBar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isLessThanMd = useMediaQuery("(max-width: 960px)");

  const queryData = useSelector((state) => state.course.queryData);
  const searchOptions = useSelector((state) => state.course.searchOptions);

  // search course
  const [search, setSearch] = useState(null);

  // query when user press enter
  const [query, setQuery] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // infinite scroll
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleInputChange = (event, newValue) => {
    setSearch(newValue);
  };

  const handleOptionChange = (event, newValue) => {
    const isPressEnter = event.code == "Enter";
    const isSelected = (event.type == "click") & (newValue != null);

    if (isPressEnter || isSelected) {
      setPageNumber(1);
      setQuery(newValue);
    }
  };

  useEffect(() => {
    dispatch(clearQueryData());
  }, [query, dispatch]);

  useEffect(() => {
    const fetchQueryData = async () => {
      setLoading(true);
      const params = {
        title: query,
        page: pageNumber,
      };
      const response = await courseServices.searchCourse(params);
      if (!response.error) {
        dispatch(setQueryData(response.data.data));
        setHasMore(response.data.data.length > 0);
        setLoading(false);
      }
    };

    fetchQueryData();
  }, [query, pageNumber, dispatch]);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const params = {
        title: search,
        limit: 20,
      };
      const response = await courseServices.searchCourse(params);
      if (!response.error) {
        dispatch(setSearchOptions(response.data.data));
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, dispatch]);

  // Dashboard menu

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ overflowY: "auto", maxHeight: "100vh" }}
    >
      <DashboardAppBar isLessThanMd={isLessThanMd} />
      <SearchInput
        isLessThanMd={isLessThanMd}
        handleInputChange={handleInputChange}
        handleOptionChange={handleOptionChange}
        searchOptions={searchOptions}
      />
      <Course
        isLessThanMd={isLessThanMd}
        lastBookElementRef={lastBookElementRef}
        queryData={queryData}
      />
    </Container>
  );
};

export default Dashboard;
