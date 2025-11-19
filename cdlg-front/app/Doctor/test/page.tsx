"use client";

import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const TestFetch = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Usuarios (Test)</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestFetch;
