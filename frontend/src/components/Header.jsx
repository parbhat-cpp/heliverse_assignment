import { AppBar, Toolbar, IconButton } from "@mui/material";
import {
  Box,
  InputBase,
  Tooltip,
  TextField,
  Divider,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { updateQuery } from "../redux/actions/queryActions";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import CloseIcon from "@mui/icons-material/Close";
import { SERVER_URL } from "../constant";
import { resetTeam } from "../redux/actions/teamActions";

const CustomToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBar = styled(Box)({
  background: "#0f1924",
  padding: "5px 12px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
});

const SearchInput = styled(InputBase)({
  marginLeft: "6px",
  color: "#fff",
  flex: "1",
});

const ActionButtons = styled(Box)({});

const CustomButton = styled(Button)({
  textTransform: "none",
  background: "#1c54b2",
  color: "#fff",
  margin: "10px auto",
  "&:hover": { background: "#1c54b2" },
});

const Header = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fliterObj, setFilterObj] = useState({
    search: "",
    available: "",
    gender: "",
    domain: "",
  });
  const [createTeamDialog, setCreateTeamDialog] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showTeamId, setShowTeamId] = useState(false);
  const [teamId, setTeamId] = useState("");

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const onSearchTextChange = (e) => {
    e.preventDefault();
    setFilterObj({ ...fliterObj, search: e.target.value });
    dispatch(updateQuery(e.target.value, "name"));
  };

  const applyFilters = () => {
    dispatch(updateQuery(fliterObj.domain, "domain"));
    dispatch(updateQuery(fliterObj.available, "available"));
    dispatch(updateQuery(fliterObj.gender, "gender"));
    handleFilterClose();
  };

  const onTeamCreation = () => {
    if (team.length === 0) {
      alert("To Create a Team You must select some usersfirst");
      return;
    }
    setCreateTeamDialog(true);
  };

  const createTeam = async () => {
    setIsloading(true);
    await fetch(`${SERVER_URL}/api/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name: teamName,
        listOfUsers: team,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsloading(false);
        setTeamName("");
        setCreateTeamDialog(false);
        setTeamId(data.team_id);
        dispatch(resetTeam());
        setShowTeamId(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AppBar position="static">
        <CustomToolbar>
          <SearchBar
            sx={{
              width: { lg: "15rem", md: "15rem", sm: "12rem", xs: "8rem" },
            }}
          >
            <SearchIcon style={{ color: "#747a80" }} />
            <SearchInput
              placeholder="Search Name"
              value={fliterObj.search}
              onChange={(e) => onSearchTextChange(e)}
            />
          </SearchBar>
          <ActionButtons>
            <Tooltip title="Create Team">
              <IconButton onClick={() => onTeamCreation()}>
                <GroupAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search team by ID">
              <IconButton onClick={() => navigate("/team")}>
                <GroupsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filters">
              <IconButton onClick={(e) => handleFilterClick(e)}>
                <FilterAltIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleFilterClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <TextField
                  placeholder="Domain"
                  value={fliterObj.domain}
                  onChange={(e) =>
                    setFilterObj({ ...fliterObj, domain: e.target.value })
                  }
                />
              </MenuItem>
              <Divider />
              <MenuItem>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      onClick={(e) =>
                        setFilterObj({ ...fliterObj, gender: e.target.value })
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      onClick={(e) =>
                        setFilterObj({ ...fliterObj, gender: e.target.value })
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      onClick={(e) =>
                        setFilterObj({ ...fliterObj, gender: e.target.value })
                      }
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </MenuItem>
              <Divider />
              <MenuItem>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Availability
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={true}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Available"
                      control={<Radio />}
                      onClick={() =>
                        setFilterObj({ ...fliterObj, available: true })
                      }
                      label="Available"
                    />
                    <FormControlLabel
                      value="Unavailable"
                      control={<Radio />}
                      onClick={() =>
                        setFilterObj({ ...fliterObj, available: false })
                      }
                      label="Unavailable"
                    />
                  </RadioGroup>
                </FormControl>
              </MenuItem>
              <MenuItem>
                <CustomButton onClick={() => applyFilters()}>
                  Apply Filters
                </CustomButton>
              </MenuItem>
            </Menu>
          </ActionButtons>
          <Dialog
            open={createTeamDialog}
            onClose={() => setCreateTeamDialog(false)}
            PaperProps={{
              sx: {
                width: {
                  lg: "30%",
                  md: "30%",
                  sm: "40%",
                  xs: "90%",
                },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                background: "#f4f4f4",
                display: "flex",
                "&>button": { margin: "0 0 0 auto" },
              }}
            >
              <IconButton onClick={() => setCreateTeamDialog(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                placeholder="Enter Team's Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={{ margin: "5px auto" }}
              />
              <CustomButton onClick={() => createTeam()}>
                Create Team
              </CustomButton>
            </Box>
            {isLoading ? (
              <CircularProgress
                style={{ margin: "3px auto", fontSize: "6px" }}
              />
            ) : (
              ""
            )}
          </Dialog>
          <Dialog
            open={showTeamId}
            onClose={() => setShowTeamId(false)}
            PaperProps={{
              sx: {
                width: {
                  lg: "30%",
                  md: "30%",
                  sm: "40%",
                  xs: "90%",
                },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                background: "#f4f4f4",
                display: "flex",
                "&>button": { margin: "0 0 0 auto" },
              }}
            >
              <IconButton onClick={() => setShowTeamId(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                style={{ margin: "3px 5px" }}
                placeholder="Team ID"
                id="outlined-basic"
                variant="outlined"
                value={teamId}
              />
              <Typography sx={{ fontSize: "12px", margin: "3px 5px" }}>
                By using this ID you can search for this team and see it's
                members
              </Typography>
              <CustomButton onClick={() => navigate(`/team/${teamId}`)}>
                See Team
              </CustomButton>
            </Box>
          </Dialog>
        </CustomToolbar>
      </AppBar>
    </>
  );
};

export default Header;
