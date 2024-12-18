import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getMovieCredits } from "../../api/tmdb-api";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function MovieCredits({ movie, onClose }) {
  const { data, error, isLoading, isError } = useQuery(
    ["credits", { id: movie.id }],
    getMovieCredits
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;

  return (
    <div>
        <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            sx={{
                margin: "10px",
                positon: "absolute",
                top: "10px",
                right: "10px",
            }}
        >
            Go Back
        </Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="cast table">
        <TableHead>
          <TableRow>
            <TableCell>
            <strong>Actor</strong>
            </TableCell>
            <TableCell align="center">
            <strong>Character</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cast.map((actor) => (
            <TableRow key={actor.cast_id}>
              <TableCell component="th" scope="row">
                <Link
                  to={`/actors/${actor.id}`}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {actor.name}
                </Link>
                
              </TableCell>
              <TableCell align="center">{actor.character}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
