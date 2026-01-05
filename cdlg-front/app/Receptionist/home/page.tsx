"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./home.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Empleado {
  no_empleado: {
    nom_empleado: string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_contratacion: string;
    estatus: string;
    correo: string;
    id_empleado: string;
  };
  salario: number;
}

const Home = () => {
  const router = useRouter();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const token = Cookies.get("token");

      if (!token) {
        alert("Debes iniciar sesión");
        router.push("/Receptionist/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:7000/recepcionista/todos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Error al obtener empleados");

        const data: Empleado[] = await response.json();
        console.log("Empleados obtenidos:", data); // <-- imprime la info en consola
        setEmpleados(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los empleados");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, [router]);

  const formatearFecha = (iso: string) =>
    new Date(iso).toLocaleDateString("es-MX");

  if (loading) {
    return (
      <>
        <NavBar opaque role="receptionist" />
        <div className={styles.container}>Cargando empleados...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar opaque role="receptionist" />
        <div className={styles.container} style={{ color: "red" }}>
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar opaque role="receptionist" />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Empleados</h1>
        </div>

        <div className={styles.homeContainer}>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha de Contratación</th>
                  <th>Estatus</th>
                  <th>Salario</th>
                </tr>
              </thead>
              <tbody>
                {empleados.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No hay empleados registrados
                    </td>
                  </tr>
                ) : (
                  empleados.map((emp) => (
                    <tr key={emp.no_empleado.id_empleado}>
                      <td>
                        {emp.no_empleado.nom_empleado}{" "}
                        {emp.no_empleado.apellido_paterno}{" "}
                        {emp.no_empleado.apellido_materno}
                      </td>
                      <td>{emp.no_empleado.correo}</td>
                      <td>{formatearFecha(emp.no_empleado.fecha_contratacion)}</td>
                      <td>{emp.no_empleado.estatus}</td>
                      <td>${emp.salario}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;