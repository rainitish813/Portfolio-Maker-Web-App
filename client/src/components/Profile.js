import React, { Component } from "react";
import { TextField, Button, Container } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1),
  },
});
class Profile extends Component {
  // navigate =useNavigate()

  constructor(props) {
    super(props);

    // Initialize the state and retrieve saved data from localStorage
    const savedData = localStorage.getItem("formData");
    this.state = {
      open: false,
      editMode: false,
      formData: savedData ? JSON.parse(savedData) : {},
    };
  }

  requiredFields = ["firstname", "lastname", "email", "phone", "website"];

  componentDidMount() {
    this.validateAllFields();
  }
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  validateAllFields = () => {
    const { formData } = this.state;
    const allFilled = this.requiredFields.every((field) => formData[field]);
    this.setState({ allFieldsFilled: allFilled });
  };

  toggleEditMode = () => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode,
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data in the state
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
    // Save the form data to localStorage
    localStorage.setItem(
      "formData",
      JSON.stringify({
        ...this.state.formData,
        [name]: value,
      })
    );
  };

  save = (e) => {
    const promise = this.props.save();
    promise
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            open: true,
            editMode: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false,
    });
  };

  action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={this.handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // viewcandidate() {

  //   History.pushState('/view')
  //   // navigate('/view')
  // }

  render() {
    const { values } = this.props;
    const { classes } = this.props;
    const { editMode } = this.state;


    return (
      <Paper className={classes.padding}>
        {editMode && (
          <Card>
            <CardHeader title="Personal Details" />
          </Card>
        )}
        <CardContent>
          <div className={classes.margin}>
            {!editMode && (
              <Link to="/view">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "10px" }}

                >
                  View
                </Button>
              </Link>
            )}

            {!editMode ? (
              <Button variant="contained" color="secondary" onClick={this.toggleEditMode}>
                Edit
              </Button>
            ) : (

              <Grid container spacing={2} alignItems="center" lg={12}>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="firstname"
                    label="First Name"
                    style={{ width: "80%" }}
                    required={true}
                    value={values.firstname}
                    onChange={this.props.handleChange}

                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Last Name"
                    variant="outlined"
                    style={{ width: "80%" }}
                    name="lastname"
                    required={true}
                    value={values.lastname}
                    onChange={this.props.handleChange}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Email"
                    variant="outlined"
                    name="email"
                    required={true}
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.email}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item lg={6} xs={12} sm={12} md={6}>
                  <TextField
                    margin="dense"
                    label="Phone Number"
                    variant="outlined"
                    name="phone"
                    required={true}
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.phone}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Your Website"
                    variant="outlined"
                    name="website"
                    required={true}
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.website}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LanguageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="GitHub"
                    variant="outlined"
                    name="github"
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.github}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Linked In"
                    variant="outlined"
                    name="linkedin"
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.linkedin}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LinkedInIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Twitter"
                    variant="outlined"
                    name="twitter"
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.twitter}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <TwitterIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Facebook"
                    variant="outlined"
                    name="facebook"
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.facebook}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FacebookIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <TextField
                    margin="dense"
                    label="Instagram"
                    variant="outlined"
                    name="instagram"
                    style={{ alignItems: "left", width: "80%" }}
                    value={values.instagram}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <InstagramIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {!editMode ? (
              ""
            ) : (
              <Container className={classes.margin}>
                <Row>
                  <Col lg={3} xs={0} />
                  <Col lg={3} xs={5}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.nextStep}
                      disabled
                      startIcon={<NavigateBeforeIcon />}
                    >
                      Back
                    </Button>
                  </Col>
                  <Col lg={3} xs={5}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.continue}
                      endIcon={<NavigateNextIcon />}


                    >
                      Next
                    </Button>
                  </Col>
                  <Col lg={3} xs={1} />
                </Row>
              </Container>
            )}
          </div>
        </CardContent>
        {editMode && (
          <React.Fragment>
            <p className="text-center text-muted">Page 1</p>
            <Button variant="contained" color="primary" onClick={this.save}>
              Save
            </Button>
          </React.Fragment>
        )}

        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}

          action={this.action}
        >
          <Alert
            onClose={this.handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your data has been saved successfully !
          </Alert>

        </Snackbar>

      </Paper>
    );
  }
}

export default withStyles(styles)(Profile);
