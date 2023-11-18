import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Box,
  InputBase,
  Typography,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SERVER_URL } from "../constant";
import UsersCard from "../components/UsersCard";

const TeamPageContainer = styled(Box)({
  width: "100%",
  height: "100vh",
  background: "#242424",
});

const SearchBar = styled(Box)({
  background: "#0f1924",
  padding: "5px 12px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

const SearchInput = styled(InputBase)({
  marginLeft: "6px",
  color: "#fff",
  flex: "1",
});

const SearchContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const CardContainer = styled(Box)({
  margin: "15px 15px 45px 15px",
  background: "#303030",
  padding: "5px 7px",
  borderRadius: "10px",
  color: "#00e5ff",
});

const Team = () => {
  const { id } = useParams();
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [teamId, setTeamId] = useState(id);

  const fetchData = useCallback(async () => {
    setIsloading(true);
    await fetch(`${SERVER_URL}/api/team/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let temp = [];
        for (let key in data) {
          temp[key] = data[key];
        }
        setTeamData(temp);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);

  const searchTeam = useCallback(
    async (e) => {
      e.preventDefault();
      await fetch(`${SERVER_URL}/api/team/${teamId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let temp = [];
          for (let key in data) {
            temp[key] = data[key];
          }
          setTeamData(temp);
          setIsloading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsloading(false);
        });
    },
    [teamId]
  );

  return (
    <TeamPageContainer>
      <SearchContainer component="form" onSubmit={(e) => searchTeam(e)}>
        <SearchBar
          sx={{
            width: { lg: "15rem", md: "15rem", sm: "12rem", xs: "8rem" },
            margin: "12px 0",
          }}
        >
          <SearchIcon style={{ color: "#747a80" }} />
          <SearchInput
            placeholder="Search Name"
            value={teamId ? teamId : ""}
            onChange={(e) => setTeamId(e.target.value)}
          />
        </SearchBar>
      </SearchContainer>
      {teamData && (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" color="#FFF">
            {teamData.team_name} {teamData.team_id}
          </Typography>
        </Box>
      )}
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
        {teamData.listOfUsers &&
          teamData.listOfUsers.map((user) => (
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
      <Dialog
        open={isLoading}
        PaperProps={{
          sx: {
            width: "20%",
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <CircularProgress style={{ margin: "7px auto" }} />
      </Dialog>
    </TeamPageContainer>
  );
};

export default Team;
