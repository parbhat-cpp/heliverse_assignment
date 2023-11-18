import {
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUserToTeam } from "../redux/actions/teamActions";

export default function UsersCard({
  _id,
  id,
  first_name,
  last_name,
  email,
  gender,
  avatar,
  domain,
  available,
}) {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const onAddToTeamClicked = () => {
    dispatch(
      addUserToTeam({
        _id,
        id,
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available,
      })
    );
    setClicked(true);
  };

  return (
    <Card sx={{ maxWidth: 345, background: "#009688", margin: "3px 5px" }}>
      <div
        style={{
          margin: "10px 7px",
          background: "#fff",
          borderRadius: "99px",
          display: "inline-block",
        }}
      >
        <img src={avatar} />
      </div>
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${first_name} ${last_name}`}
        </Typography>
        <Box>
          <Typography>
            <b>ID:</b>
            {` ${id}`}
          </Typography>
          <Typography>
            <b>Gender:</b>
            {` ${gender}`}
          </Typography>
        </Box>
        <Box>
          <Typography>
            <b>Email:</b>
            {` ${email}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Typography>
            <b>Domain:</b>
            {` ${domain}`}
          </Typography>
          <Tooltip title={available ? "Available" : "Unavailable"}>
            {available ? (
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  background: "orange",
                  borderRadius: "99px",
                }}
              ></div>
            ) : (
              <div
                style={{
                  height: "15px",
                  width: "15px",
                  background: "red",
                  borderRadius: "99px",
                }}
              ></div>
            )}
          </Tooltip>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onAddToTeamClicked()}
          disabled={clicked}
          style={{
            display: "flex",
            alignItems: "center",
            background: "#008376",
            color: "#3e3434",
            justifyContent: "center",
            margin: "0 auto",
            padding: "5px",
            borderRadius: "9px",
            cursor: "pointer",
            textTransform: "none",
          }}
        >
          {!clicked ? <AddIcon /> : <DoneIcon />}
          {clicked ? "Added" : "Add to Team"}
        </Button>
      </CardActions>
    </Card>
  );
}
