import React from "react";
import { Redirect } from "react-router-dom";

const Index = () => {
    console.log("Index");

    return <Redirect to="/login" />;
};

export default Index;
