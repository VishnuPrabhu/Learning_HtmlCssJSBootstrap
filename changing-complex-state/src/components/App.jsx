import React, {useState} from "react";

function App() {

  const [contact, setContact] = useState({fName: "", lName: "", email: ""});

  function updateContact(event) {
    const {value, name} = event.target;
    setContact(prevValue => ({...prevValue, [name]: value}));
    // or
    // setContact(prevValue => {
    //   return {
    //     ...prevValue,
    //     [name]: value
    //   };
    // or
    //   // if (name === "fName") {
    //   //   return  {
    //   //     fName: value,
    //   //     lName: prevValue.lName,
    //   //     email: prevValue.email
    //   //   }
    //   // } else if (name === "lName") {
    //   //   return  {
    //   //     fName: prevValue.fName,
    //   //     lName: value,
    //   //     email: prevValue.email
    //   //   }
    //   // } else {
    //   //   return {
    //   //     fName: prevValue.fName,
    //   //     lName: prevValue.lName,
    //   //     email: value
    //   //   }
    //   // }
    // });
  }

  return (
    <div className="container">
    <h1>Hello {contact.fName} {contact.lName} </h1>
    <p>{contact.email}</p>
      <form>
        <input onChange={updateContact} name="fName" placeholder="First Name" value={contact.fName} />
        <input onChange={updateContact} name="lName" placeholder="Last Name" placeholder="Last Name" value={contact.lName} />
        <input type="email" onChange={updateContact} name="email" placeholder="Email" placeholder="Email" value={contact.email} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
