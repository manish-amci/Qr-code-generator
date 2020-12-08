import { React, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ButtonAppBar from "./AppBar";
import QRCode from "qrcode.react";
import moment from "moment";

// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

const axios = require("axios");

const Joi = require("joi");

const Schema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required(),
  middleName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .allow(null),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .allow(null),
  birthday: Joi.date().allow(null),
  gender: Joi.string().allow(null),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  primaryEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  country: Joi.string().allow(null),
  stateProvince: Joi.string().allow(null),
  city: Joi.string().allow(null),
  postalCode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .allow(""),
});

var postURL =
  "https://bgtnp5wnta.execute-api.ap-south-1.amazonaws.com/dev/qrCode";

var firstName,
  middleName,
  lastName,
  birthday,
  gender,
  mobile,
  check = true,
  primaryEmail,
  country,
  stateProvince,
  city,
  postalCode;

export default function SimpleContainer() {
  var [data, setData] = useState({});
  var [afterPost, setAfterPost] = useState(false);

  const [qrValue, setQrValue] = useState("Medwhiz");

  const Qrcode = () => (
    <Grid style={{ paddingTop: "5%" }}>
      <QRCode
        id="qr-gen"
        value={qrValue}
        size={200}
        level={"M"}
        includeMargin={true}
      />
    </Grid>
  );

  function handleDataChange(event) {
    console.log("event.target value is ", event.target.id, event.target.value);
    const { error, value } = Schema.validate({
      ...data,
      [event.target.id]: event.target.value,
    });
    console.log("value is", value);
    if (error) {
      console.log("error is", error);
      check = true;
    } else {
      console.log("value is", value);
      console.log("type ofvalue is", typeof value);
      check = false;
    }
    setData(value);
    console.log("data state is", data);
    if (event.target.value == null) {
      console.log("yes");
    }
  }

  async function onSubmitClick() {
    console.log("from the on submit function", afterPost);

    var payload = await {
      phone_number: data.mobile || "",
      "custom:college_id": "507f1f77bcf86cd799439011",
      "custom:user_type": "user",
      email: data.primaryEmail,
      generated_by: "50721f77bcf86cd799439011",
      generated_by_name: "shyamsagar",
      user_data: {
        username:
          data.firstName +
            " " +
            (data.middleName || "") +
            " " +
            data.lastName || "",
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName || "",
        fullName:
          data.firstName +
            " " +
            (data.middleName || "") +
            " " +
            data.lastName || "",
        birthdate: moment(data.birthdate).format("L"),
        gender: data.gender || "",
        mobile: "+91" + data.mobile,
        userThumbnailPath: "https://www.amci.net.in/logo",
        primaryEmail: data.primaryEmail,
        secondaryEmails: [],
        country: data.country || "",
        stateProvince: data.stateProvince || "",
        city: data.city || "",
      },
    };

    axios
      .post(postURL, payload)
      .then((res) => {
        console.log("response is ", res);
        var myJSON = JSON.stringify(res.data);

        setQrValue(myJSON);
        setAfterPost(true);
      })
      .catch((err) => {
        console.log("error is", err);
        console.log("error res is", err.response);
      });

    console.log("payload is ", payload);
  }

  return (
    <div>
      <ButtonAppBar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "90vh" }}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="middleName"
              label="Middle Name"
              value={middleName}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="birthday"
              label="Birthday"
              value={birthday}
              placeholder="MM/DD/YYYY"
              onChange={handleDataChange}
            />
          </Grid>
          {/* 
          <Grid>
            <FormControl required style={{ width: "37%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Gender
              </InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={gender}
                onChange={handleDataChange}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Others</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="gender"
              label="Gender"
              value={gender}
              //male,female,other
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="mobile"
              label="Mobile"
              value={mobile}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="primaryEmail"
              label="Primary Email"
              value={primaryEmail}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="country"
              label="country"
              value={country}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="stateProvince"
              label="State"
              value={stateProvince}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="city"
              label="City"
              value={city}
              onChange={handleDataChange}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              required
              id="postalCode"
              label="Zip"
              value={postalCode}
              onChange={handleDataChange}
            />
          </Grid>

          <br />

          <Button
            variant="contained"
            color="primary"
            disabled={check}
            onClick={onSubmitClick}
          >
            Submit
          </Button>
          {afterPost ? <Qrcode /> : ""}
          <br />

          {/* </Grid> */}
        </Typography>
      </Container>
    </div>
  );
}
