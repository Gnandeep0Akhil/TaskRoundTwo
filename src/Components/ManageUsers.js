import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const users = localStorage.getItem("db");
    const user = localStorage.getItem("user");
    setUsers(JSON.parse(users));
    setUser(user === "developer");
  }, []);

  const handleUnlock = (username) => {
    const updatedUsers = users.map((user) => {
      if (user.username === username) {
        return {
          ...user,
          isAccountLocked: false,
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    localStorage.setItem("db", JSON.stringify(updatedUsers));
  };

  return (
    <>
      {user ? (
        <div>
          <h2>Manage Users</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Logged</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.question}</TableCell>
                    <TableCell>{user.answer}</TableCell>
                    <TableCell>{user.isLoggedIn ? "YES" : "NO"}</TableCell>
                    <TableCell>
                      {user.isAccountLocked ? (
                        <Button onClick={() => handleUnlock(user.username)}>
                          Unlock
                        </Button>
                      ) : (
                        "Active"
                      )}
                    </TableCell>
                    <TableCell>
                      <Button disabled={!!user.isLoggedIn}>Edit</Button>
                      <Button disabled={!!user.isLoggedIn}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default ManageUsers;
