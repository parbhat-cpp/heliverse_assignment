import styled from "@emotion/styled";
import { Box, Dialog, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import { SERVER_URL } from "../constant";
import UsersCard from "../components/UsersCard";
import { setUsersData } from "../redux/actions/userActions";

const HomeWrapper = styled(Box)({
  width: "100%",
  height: "100vh",
  background: "#242424",
  overflow: "hidden scroll",
});

const CardContainer = styled(Box)({
  margin: "15px 15px 45px 15px",
  background: "#303030",
  padding: "5px 7px",
  borderRadius: "10px",
  color: "#00e5ff",
});

const Home = () => {
  const page = useSelector((state) => state.page);
  const users = useSelector((state) => state.usersData);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);

  const [usersdata, setUsersdata] = useState([]);
  const [intro, setIntro] = useState(true);

  const fetchData = useCallback(async () => {
    if (Object.keys(query).length !== 0) {
      let queryString = "";
      for (let key in query) {
        if (query[key] === "" || key === "name") continue;
        queryString += `&${key}=${query[key]}`;
      }
      console.log(queryString);
      await fetch(
        `${SERVER_URL}/api/users/?page=${page}&limit=20${queryString}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setUsersData(data));
          setUsersdata(data);
        });
    } else {
      await fetch(`${SERVER_URL}/api/users?page=${page}&limit=20`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch(setUsersData(data));
          setUsersdata(data);
        });
    }
  }, [dispatch, page, query]);

  const searchResults = useCallback(() => {
    if (!query.name) return;
    let temp = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query.name.toLowerCase()) ||
        user.last_name.toLowerCase().includes(query.name.toLowerCase())
    );
    setUsersdata(temp);
  }, [query.name, users]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    searchResults();
  }, [searchResults]);

  return (
    <>
      <HomeWrapper>
        <Header />
        <CardContainer
          sx={{
            display: "grid",
            gridTemplateColumns: {
              lg: "auto auto auto auto auto",
              md: "auto auto auto auto",
              sm: "auto auto",
              xs: "auto",
            },
            overflowY: "scroll",
            justifyContent: "center",
          }}
        >
          {usersdata.map((user) => (
            <>
              <UsersCard
                _id={user._id}
                id={user.id}
                available={user.available}
                avatar={user.avatar}
                domain={user.domain}
                email={user.email}
                first_name={user.first_name}
                last_name={user.last_name}
                gender={user.gender}
                key={user._id}
              />
            </>
          ))}
        </CardContainer>
        <BottomBar />
        <Dialog
          open={intro}
          onClose={() => setIntro(false)}
          PaperProps={{
            sx: {
              width: {
                lg: "40%",
                md: "50%",
                sm: "80%",
                xs: "90%",
              },
              textAlign: "center",
              padding: "0 10px 10px 10px",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              "&>button": { margin: "0 0 0 auto" },
            }}
          >
            <IconButton onClick={() => setIntro(false)}>
              <Close />
            </IconButton>
          </Box>
          <Typography variant="h4">How to use?</Typography>
          <Typography>
            1. You can search a user by typing his/her name on the search bar
            present on the top left corner
          </Typography>
          <Typography>
            2. There are three icons present on the top right corner which are
            for team creation, search a team and filter.
          </Typography>
          <Typography>
            3. To create a team first we have to select users by clicking on the
            "Add to Team" button present on every card and after that we have to
            click on the create team button present in the header(which is the
            first button in the group)
          </Typography>
          <Typography>
            4. To search a team we must have it's id so that we can get it's
            data
          </Typography>
        </Dialog>
      </HomeWrapper>
    </>
  );
};

export default Home;
