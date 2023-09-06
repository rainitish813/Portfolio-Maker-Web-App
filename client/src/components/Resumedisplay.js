import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
}));

function ResumeDisplay({ candidateData }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className="rela-block top-bar">
        {candidateData && (
          <div className="caps name">
            <div className="abs-center">
              Resume of {candidateData.firstname} {candidateData.lastname}
            </div>
          </div>
        )}
      </div>

      <Grid container spacing={2}>
        <Grid item xs={4} className="side-bar">
          <div className="mugshot">
            <div className="logo">
              <svg viewBox="0 0 80 80" className="rela-block logo-svg">
                <path
                  d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
              <p className="logo-text">
                {candidateData.firstname[0]}
                {candidateData.lastname[0]}
              </p>
            </div>
          </div>
          <Typography paragraph>
            <i className="fas fa-envelope"></i> {candidateData.email}
          </Typography>
          <Typography paragraph>
            <i className="fas fa-phone-square-alt"></i> {candidateData.phone}
          </Typography>
        </Grid>
        <Grid item xs={8} className="content-container">
          <Section title="Education" data={candidateData.education} />
          <Section title="Projects" data={candidateData.projects} />
          <Section title="Experience" data={candidateData.experience} />
          <Section title="Skills" data={candidateData.extraInformation.skills} />
          <Section title="Interests" data={candidateData.extraInformation.interests} />
        </Grid>
      </Grid>
    </Paper>
  );
}

// Helper component to render sections
function Section({ title, data }) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography variant="subtitle1" className="caps greyed">
        {title}
      </Typography>
      <List>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={item.title || item.college || item.institute || item}
                secondary={item.subtitle || item.fromyear1 || item.duration || item.qualification1 || item.link || item.position}
              />
              {item.projectDescription && (
                <Typography variant="body2">
                  {item.projectDescription}
                </Typography>
              )}
              {item.experienceDescription && (
                <Typography variant="body2">
                  {item.experienceDescription}
                </Typography>
              )}
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary={`No ${title.toLowerCase()} data available`} />
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default ResumeDisplay;
