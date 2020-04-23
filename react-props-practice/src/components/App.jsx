import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./Avatar";

function createCard(contact) {
  return <Card 
  key={contact.id}
  id={contact.id}
  name={contact.name}
  img={contact.imgURL}
  tel={contact.phone}
  email={contact.email} />
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar img="https://media-exp1.licdn.com/dms/image/C5103AQFXP5TgC-waFA/profile-displayphoto-shrink_200_200/0?e=1592438400&v=beta&t=EF4KilbLqxl_1VvXpTamoiue05vJtZ25TJPy70wfjPo"/>
      {contacts.map(createCard)}
    </div>
  );
}

export default App;
