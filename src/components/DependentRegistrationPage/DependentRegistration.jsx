import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function DependentRegistrationPage(props) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPasswork] = useState("");
  const dispatch = useDispatch();

  const createAccount = (event) => {
    event.preventDefault();
    console.log(`dependent registration page`, { firstName, lastName });

    dispatch({
        //need to find type:
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      },
    });
  };

  return (
    <div>
        <h2 className="header">
            Dependent Registration Page
        </h2>

        <form onSubmit={createAccount} className='createAccount'>

        </form>
    </div>
  )

}

//SELECT "username", "password", "first_name", "last_name",
// "email" FROM "user";
