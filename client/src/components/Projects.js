import React, { Component } from 'react';
import { TextField, Button, Container, Divider } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import LinkIcon from '@material-ui/icons/Link';
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col } from 'react-bootstrap';
import { Paper, withStyles, Grid } from '@material-ui/core';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const styles = theme => ({
  margin: {
    margin: theme.spacing(1.5),
  },
  padding: {
    padding: theme.spacing(1),
  },
});

class Projects extends Component {
  state = {
    open: false,
    projects: [{ title: "", link: "", projectDescription: "" }],
  };

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
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

  addProject = () => {
    this.setState((prevState) => ({
      projects: [
        ...prevState.projects,
        { title: "", link: "", projectDescription: "" }
      ],
    }));
  };

  removeProject = () => {
    if (this.state.projects.length > 1) {
      this.setState((prevState) => ({
        projects: prevState.projects.slice(0, -1),
      }));
    }
  };

  handleProjectChange = (e, index) => {
    const { name, value } = e.target;
    const projects = [...this.state.projects];
    projects[index][name] = value;
    this.setState({ projects });
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

  render() {
    const { classes } = this.props;
    const { projects } = this.state;

    return (
      <Paper className={classes.padding}>
        <Card>
          <CardHeader title="Projects Developed" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            {projects.map((project, index) => (
              <Grid container spacing={2} alignItems="center" lg={12} key={index}>
                <Grid item xs={12} lg={12}>
                  <h5>Project {index + 1}</h5>
                </Grid>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`title${index + 1}`}
                    label="Title"
                    style={{ width: '80%' }}
                    required
                    value={project.title}
                    onChange={(e) => this.handleProjectChange(e, index)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <TitleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={4} sm={6} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`link${index + 1}`}
                    label="Link"
                    style={{ width: '80%' }}
                    required
                    value={project.link}
                    onChange={(e) => this.handleProjectChange(e, index)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name={`projectDescription${index + 1}`}
                    label="Description"
                    style={{ width: '80%' }}
                    required
                    value={project.projectDescription}
                    onChange={(e) => this.handleProjectChange(e, index)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            ))}
            <br />
            <Divider />
            <br />
            <Button variant="outlined" color="primary" onClick={this.addProject}>
              Add Project
            </Button>
            {projects.length > 1 && (
              <Button variant="outlined" color="secondary" onClick={this.removeProject}>
                Remove Project
              </Button>
            )}
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
        <p className="text-center text-muted">Page 3</p>
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

export default withStyles(styles)(Projects);
