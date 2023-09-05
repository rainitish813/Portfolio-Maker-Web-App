import React, { Component } from "react";
import { TextField, Button, Container, Divider } from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import axios from "axios";
import { saveAs } from "file-saver";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import GetAppIcon from "@material-ui/icons/GetApp";
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
    margin: theme.spacing(1.5),
  },
  padding: {
    padding: theme.spacing(1),
  },
});

class Experience extends Component {
  state = {
    open: false,
    skills: [{ name: "" }],
    interests: [{ name: "" }],
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  createAndDownloadPDF = () => {
    axios
      .post("create-pdf", this.props.values)
      .then(() => {
        axios
          .get("fetch-pdf", { responseType: "arraybuffer" })
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, `${this.props.values.firstname}'s Resume.pdf`);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  save = (e) => {
    const promise = this.props.save();
    promise
      .then((res) => {
        if (res.status === 200) {
          this.setState((prevState) => ({
            open: true,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  handleClick = () => {
    this.setState((prevState) => ({
      open: true,
    }));
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState((prevState) => ({
      open: false,
    }));
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

  handleSkillChange = (idx, e) => {
    const { skills } = this.state;
    const newSkills = [...skills];
    newSkills[idx].name = e.target.value;
    this.setState({ skills: newSkills });
  };

  handleInterestChange = (idx, e) => {
    const { interests } = this.state;
    const newInterests = [...interests];
    newInterests[idx].name = e.target.value;
    this.setState({ interests: newInterests });
  };

  addSkill = () => {
    this.setState((prevState) => ({
      skills: [...prevState.skills, { name: "" }],
    }));
  };

  removeSkill = () => {
    this.setState((prevState) => ({
      skills: prevState.skills.slice(0, -1),
    }));
  };

  addInterest = () => {
    this.setState((prevState) => ({
      interests: [...prevState.interests, { name: "" }],
    }));
  };

  removeInterest = () => {
    this.setState((prevState) => ({
      interests: prevState.interests.slice(0, -1),
    }));
  };

  render() {
    const { values } = this.props;
    const { classes } = this.props;
    const { skills, interests } = this.state;

    return (
      <Paper className={classes.padding}>
        <Card>
          <CardHeader title="Extra Details" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="center" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Skills/Languages</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              {skills.map((skill, idx) => (
                <Grid item key={idx} md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    label={`Skill ${idx + 1}`}
                    style={{ width: "90%" }}
                    value={skill.name}
                    onChange={(e) => this.handleSkillChange(idx, e)}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
              ))}
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={this.addSkill}
                >
                  Add Skill
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={this.removeSkill}
                >
                  Remove Skill
                </Button>
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid container spacing={2} alignItems="flex-start" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Interests</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              {interests.map((interest, idx) => (
                <Grid item key={idx} md={12} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label={`Interest ${idx + 1}`}
                    variant="outlined"
                    style={{ width: "90%" }}
                    value={interest.name}
                    onChange={(e) => this.handleInterestChange(idx, e)}
                    InputProps={{
                      endAdornment: <InputAdornment position="start" />,
                    }}
                  />
                </Grid>
              ))}
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={this.addInterest}
                >
                  Add Interest
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={this.removeInterest}
                >
                  Remove Interest
                </Button>
              </Grid>
            </Grid>
          </div>
        </CardContent>
        <Container className={classes.margin}>
          <Row>
            <Col xs={4} />
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={this.back}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                disabled
                color="secondary"
                size="small"
                onClick={this.continue}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={this.createAndDownloadPDF}
            endIcon={<GetAppIcon />}
          >
            Download Resume
          </Button>
        </Container>
        <p className="text-center text-muted">Page 5</p>
        <Button variant="contained" color="primary" size="small" sx={{ m: -2 }}
          onClick={this.save}>
          {" "}
          Save
        </Button>
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
            Your data has been saved successfully!
          </Alert>
        </Snackbar>
      </Paper>
    );
  }
}

export default withStyles(styles)(Experience);

