"use client";
import React, {useState} from "react";
import IconButton from "./components/client/IconButton/iconButton";
import TextInput from "./components/client/TextInput/textInput";

export default function Home() {
    const [name, setName] = useState<string>("");  // estado tipo string
  const [age, setAge] = useState<number | string>(""); // puede ser número o texto
  return (
    <main>
      <IconButton text={"Iniciar Sesión"} onPress={()=>console.log("akdlhalkjadhfs")}>
        <p>i</p>
      </IconButton>
      <IconButton text={"Registro"}  onPress={()=>console.log("akdlhalkjadhfs")}>
        <p>h</p>
      </IconButton>
      <IconButton text={"Iniciar Sesión"} onPress={()=>console.log("akdlhalkjadhfs")}>
        <p>i</p>
      </IconButton>

       <TextInput
        placeHolder="Escribe tu nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeHolder="Escribe tu edad"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        placeHolder="Contraseña"
        value=""
        security={true}
      />

    </main>
  );
}