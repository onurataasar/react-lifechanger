import React, { useState } from "react";
import Navbar from "./Navbar";
import { Button } from "@mui/material";
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from "@firebase/app-compat";
import "firebase/compat/database";
import { UserAuth } from "../context/AuthContext";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import StickyFooter from "./StickyFooter";
import { auth, db } from "../firebaseConfig";
import { Navigate, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextareaAutosize } from "@mui/material";
import BorderColor from "@mui/icons-material/BorderColor";
import { TextField, FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { parseDailyData } from "../utils/date-formatter";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function Diary() {
  const dbRef = ref(getDatabase());
  const notify = () =>
    toast.success("Diary day added.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });

  //function to check is the user is authorized for the page in console log

  if (auth.currentUser) {
    let uid = firebase.auth().currentUser.uid;
    console.log("User anonymous: " + firebase.auth().currentUser.isAnonymous);
    //with snapshot we can see the user's name from the database
    get(child(dbRef, `users/${uid}/name`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const [diary, setDiary] = useState(" ");
  const [date, setDate] = useState(new Date());
  const [date_diary, setDate_diary] = useState(" ");
  const [error, setError] = useState("");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;

  //will be working on that
  var yesterday = String(dd - 1).padStart(2, "0") + "-" + mm + "-" + yyyy;
  var twodays = String(dd - 2).padStart(2, "0") + "-" + mm + "-" + yyyy;
  var threedays = String(dd - 3).padStart(2, "0") + "-" + mm + "-" + yyyy;
  var fourdays = String(dd - 4).padStart(2, "0") + "-" + mm + "-" + yyyy;

  const addDiary = async (e) => {
    setError("");
    try {
      var user = auth.currentUser;
      //Add user to firebase db
      var database_ref = db.ref();

      //Create user data
      var diary_data = {
        diary: diary
      };

      database_ref
        .child("users/" + user.uid)
        .child("date")
        .child(today)
        .update(diary_data);
      //alert("Day updated.")
      notify();
      this.render();
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  function clickButton() {
    addDiary();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var uid = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref("users")
        .child(uid)
        .child("date")
        .child(parseDailyData(Number(date)))
        .get()
        .then((snapshot) => {
          if (snapshot.exists() && snapshot.val()?.diary) {
            setDate_diary(snapshot.val().diary);
          } else {
            setDate_diary("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  console.log(date);

  return (
    <div className="dashboard">
      <Navbar /> {/* the navbar component we exported in navbar.js */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form>
        <div className="question">
          <p></p>
          {/* I have used a lot of MUI's box component to enhance the UI */}
          <Box
            display="table"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "table",
              width: 700,
              height: 80,
              p: 2,
              border: "2px solid grey",
              boxShadow: 8,
              borderRadius: 2
            }}>
            <h3 id="wel-back"> Welcome to your Diary </h3>

            <p></p>
            <hr></hr>

            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              style={{ width: 500 }}
              onChange={(e) => setDiary(e.target.value)}
            />
            <p></p>
            <Button
              onClick={() => clickButton()}
              variant="contained"
              style={{ background: "#e5155c" }}
              className="button-daily"
              startIcon={<BorderColor />}>
              {" "}
              Submit Diary{" "}
            </Button>
          </Box>
        </div>
      </form>
      <br></br> <hr></hr> <br></br>
      <Box
        display="table"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "table",
          width: 700,
          height: 80,
          p: 2,
          border: "2px solid grey",
          boxShadow: 8,
          borderRadius: 2
        }}>
        <h2>Show Diary data</h2>
        <FormControl sx={{ m: 1, minWidth: 350 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd-MM-yyyy"
              label="Choose Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/*  <Button color="secondary" size="small" onClick={submitDate}><SearchRounded /></Button> */}
        </FormControl>
        <hr></hr>
        <h4>{date === " " ? today : parseDailyData(date)}: </h4> {date_diary}
      </Box>
      <StickyFooter></StickyFooter>
    </div>
  );
}
