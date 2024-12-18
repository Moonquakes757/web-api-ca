import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getActorDetails } from "../../api/tmdb-api";
import Button from "@mui/material/Button";

export default function ActorDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { data, error, isLoading, isError } = useQuery(
    ["actorDetails", { id }],
    getActorDetails
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={{ padding: "20px"}}>
        <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(-1)} 
        sx={{ marginBottom: "20px" }}
      >
        Go Back
      </Button>
      <h1>{data.name}</h1>
      <p>Birthday: {data.birthday}</p>
      <p>Biography: {data.biography}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
        alt={data.name}
      />
    </div>
  );
}
