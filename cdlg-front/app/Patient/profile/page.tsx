"use client";

import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import Form from "@/app/components/Form/form";
import TextInput from "@/app/components/TextInput/textInput";
import IconButton from "@/app/components/IconButton/iconButton";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import NavBar from "@/app/components/NavBar/navBar";
import Cookies from "js-cookie";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    secondLastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
    bloodType: "",
    allergies: "",
    conditions: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        alert("No hay token, inicia sesión");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:7000/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Error al obtener el perfil:", res.statusText);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const user = data[0];

          setProfile({
            name: user.nombres || "",
            lastName: user.apellido_paterno || "",
            secondLastName: user.apellido_materno || "",
            email: user.correo || "",
            phone: user.numero_seguridad_social || "",
            birthDate: user.fecha_nacimiento
              ? user.fecha_nacimiento.slice(0, 10)
              : "",
            gender: user.sexo === "H" ? "Masculino" : "Femenino",
            address: `${user.calle}, ${user.colonia}, ${user.ciudad}, ${user.cp}`,
            bloodType: user.tipo_sangre || "",
            allergies: "", // no viene en tu API
            conditions: "", // no viene en tu API
          });
        }

      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <NavBar opaque />
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <NavBar opaque />
      <h1 className={styles.title}>Perfil del Paciente</h1>

      <Form
        inputs={
          <>
            <TextInput
              placeHolder="Nombre"
              value={profile.name}
              onChangeText={(v) => setProfile({ ...profile, name: v })}
            />
            <TextInput
              placeHolder="Apellido paterno"
              value={profile.lastName}
              onChangeText={(v) => setProfile({ ...profile, lastName: v })}
            />
            <TextInput
              placeHolder="Apellido materno"
              value={profile.secondLastName}
              onChangeText={(v) =>
                setProfile({ ...profile, secondLastName: v })
              }
            />
            <TextInput placeHolder="Correo electrónico" value={profile.email} />
            <TextInput
              placeHolder="Teléfono"
              value={profile.phone}
              onChangeText={(v) => setProfile({ ...profile, phone: v })}
            />
            <TextInput placeHolder="Fecha de nacimiento" value={profile.birthDate} />
            <TextInput placeHolder="Sexo" value={profile.gender} />
            <TextInput
              placeHolder="Dirección"
              value={profile.address}
              onChangeText={(v) => setProfile({ ...profile, address: v })}
            />
            <TextInput placeHolder="Tipo de sangre" value={profile.bloodType} />
            <TextInput placeHolder="Alergias" value={profile.allergies} />
            <TextInput placeHolder="Padecimientos previos" value={profile.conditions} />
          </>
        }
        buttons={
          <>
            {!isEditing ? (
              <IconButton text="Editar perfil" onPress={() => setIsEditing(true)}>
                <CardiologyIcon size={28} />
              </IconButton>
            ) : (
              <>
                <IconButton text="Guardar cambios" onPress={() => setIsEditing(false)}>
                  <CardiologyIcon size={28} />
                </IconButton>
                <IconButton text="Cancelar" onPress={() => setIsEditing(false)}>
                  <CardiologyIcon size={28} />
                </IconButton>
              </>
            )}
          </>
        }
      />
    </div>
  );
}
