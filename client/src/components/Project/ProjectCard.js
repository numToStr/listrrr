import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const ProjectCard = ({ title }) => {
    return (
        <Grid item xs>
            <Card>
                <CardContent>
                    <Typography>{title}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProjectCard;
