import React, { Component } from 'react';
import { TextField, Button, Container, Divider } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import BusinessIcon from '@material-ui/icons/Business';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col } from 'react-bootstrap';
import { Paper, withStyles, Grid } from '@material-ui/core';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(1.5),
  },
  padding: {
    padding: theme.spacing(1),
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Experience extends Component {
  state = {
    projects: [{ id: 1, ...this.getInitialProjectData() }],
  };

  getInitialProjectData() {
    return {
      institute: '',
      position: '',
      duration: '',
      experienceDescription: '',
    };
  }

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
          this.setState({ open: true });
        }
      })
      .catch((err) => console.log(err));
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleAddProject = () => {
    const { projects } = this.state;
    const newProjectId = projects[projects.length - 1].id + 1;
    const newProjectData = { id: newProjectId, ...this.getInitialProjectData() };
    this.setState((prevState) => ({
      projects: [...prevState.projects, newProjectData],
    }));
  };

  handleRemoveProject = (projectId) => {
    const { projects } = this.state;
    if (projects.length > 1) {
      const updatedProjects = projects.filter((project) => project.id !== projectId);
      this.setState({ projects: updatedProjects });
    }
  };

  render() {
    const { classes } = this.props;
    const { projects } = this.state;
    return (
      <Paper className={classes.padding}>
        <Card>
          <CardHeader title="Experience Details" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            {projects.map((project) => (
              <Grid container spacing={2} alignItems="center" key={project.id}>
                <Grid item xs={12} lg={4}>
                  <h5>
                    <CheckCircleIcon />
                    <span className="pl-3">Experience {project.id}</span>
                  </h5>
                </Grid>
                <Grid item xs={0} lg={8} />
                <Grid item md={4} sm={12} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`institute${project.id}`}
                    label="Institue/Organisation"
                    style={{ width: '90%' }}
                    required
                    value={project.institute}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`position${project.id}`}
                    label="Position"
                    style={{ width: '90%' }}
                    required
                    value={project.position}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EventSeatIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={4}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`duration${project.id}`}
                    label="Duration"
                    style={{ width: '90%' }}
                    required
                    value={project.duration}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TimelapseIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    style={{ width: '97%' }}
                    name={`experienceDescription${project.id}`}
                    required
                    value={project.experienceDescription}
                    onChange={this.props.handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {projects.length > 1 && (
                  <Grid item md={12} sm={12} xs={12} lg={12}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => this.handleRemoveProject(project.id)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            ))}
            <br />
            <Divider />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleAddProject}
            >
              Add Experience
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
                end endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
        </Container>
        <p className="text-center text-muted">Page 4</p>
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

export default withStyles(styles)(Experience);