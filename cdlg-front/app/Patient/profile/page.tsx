"use client";

import React, { useState } from "react";
import styles from "./profile.module.css";
import Form from "@/app/components/Form/form";
import TextInput from "@/app/components/TextInput/textInput";
import IconButton from "@/app/components/IconButton/iconButton";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import NavBar from "@/app/components/NavBar/navBar";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // datos simulados (después vendrán del backend)
  const [profile, setProfile] = useState({
    name: "Juan",
    lastName: "Pérez",
    secondLastName: "Gómez",
    email: "juan.perez@email.com",
    phone: "5512345678",
    birthDate: "2002-05-10",
    gender: "Masculino",
    address: "Av. Siempre Viva 742",
    bloodType: "O+",
    allergies: "Ninguna",
    conditions: "Ninguno"
  });

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

            <TextInput
              placeHolder="Correo electrónico"
              value={profile.email}
              
            />

            <TextInput
              placeHolder="Teléfono"
              value={profile.phone}
              onChangeText={(v) => setProfile({ ...profile, phone: v })}
  
            />

            <TextInput
              placeHolder="Fecha de nacimiento"
              value={profile.birthDate}
   
            />

            <TextInput
              placeHolder="Sexo"
              value={profile.gender}
 
            />

            <TextInput
              placeHolder="Dirección"
              value={profile.address}
              onChangeText={(v) => setProfile({ ...profile, address: v })}

            />

            <TextInput
              placeHolder="Tipo de sangre"
              value={profile.bloodType}
    
            />

            <TextInput
              placeHolder="Alergias"
              value={profile.allergies}

            />

            <TextInput
              placeHolder="Padecimientos previos"
              value={profile.conditions}

            />
          </>
        }
        buttons={
          <>
            {!isEditing ? (
              <IconButton
                text="Editar perfil"
                onPress={() => setIsEditing(true)}
              >
                <CardiologyIcon size={28} />
              </IconButton>
            ) : (
              <>
                <IconButton
                  text="Guardar cambios"
                  onPress={() => setIsEditing(false)}
                >
                  <CardiologyIcon size={28} />
                </IconButton>

                <IconButton
                  text="Cancelar"
                  onPress={() => setIsEditing(false)}
                >
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
