import React, { Component } from "react";
import {
  TextField,
  Button,
  Container,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Row, Col } from "react-bootstrap";
import { Paper, withStyles, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
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

class Education extends Component {
  state = {
    open: false,
    educationFields: [{}], // Array to store education fields
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
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

  // Function to handle changes in education fields
  handleChange = (e, index) => {
    const { name, value } = e.target;
    const { educationFields } = this.state;
    educationFields[index][name] = value;
    this.setState({ educationFields });
  };

  addEducationField = () => {
    this.setState((prevState) => ({
      educationFields: [...prevState.educationFields, {}],
    }));
  };

  removeEducationFields = () => {
    const { educationFields } = this.state;

    if (educationFields.length > 1) {

      educationFields.pop();
      this.setState({ educationFields });
    } else if (educationFields.length === 1) {

      this.setState({ educationFields: [{}] });
    }
  };

  render() {
    const { classes } = this.props;
    const { educationFields } = this.state;

    return (
      <Paper className={classes.padding}>
        <Card>
          <CardHeader title="Education Details" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            {educationFields.map((field, index) => (
              <Grid container spacing={2} alignItems="center" lg={12} key={index}>
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`college${index}`}
                    label="College/University"
                    style={{ width: "80%" }}
                    required
                    value={field.college}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`fromyear${index}`}
                  
                    type="date"
                    style={{ width: "80%" }}
                    required
                    value={field.fromyear}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`toyear${index}`}
                    type="date"
                    style={{ width: "80%" }}
                    required
                    value={field.toyear}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                </Grid>
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    label={`Qualification ${index + 1}`}
                    variant="outlined"
                    style={{ width: "80%" }}
                    name={`qualification${index}`}
                    required
                    value={field.qualification}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                </Grid>
                <Grid item md={8} sm={12} xs={12} lg={8}>
                  <TextField
                    margin="dense"
                    label={`Description ${index + 1}`}
                    variant="outlined"
                    style={{ width: "90%" }}
                    name={`description${index}`}
                    required
                    value={field.description}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                </Grid>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="5px"
                  onClick={this.removeEducationFields}
                >
                  Remove
                </Button>
              </Grid>
            ))}
            <br />
            <Divider />
            <br />

            <Button
              variant="outlined"
              color="primary"
              onClick={this.addEducationField}
            >
              +
            </Button>
          </div>
        </CardContent>
        <Container className={classes.margin}>
          <Row>
            <Col xs={4} />
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.back}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.continue}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
        </Container>
        <p className="text-center text-muted">Page 2</p>
        <Button variant="contained" color="primary" onClick={this.save}>
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
            Your data has been saved successfully !
          </Alert>
        </Snackbar>
      </Paper>
    );
  }
}


export default withStyles(styles)(Education);






