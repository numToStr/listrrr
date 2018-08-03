import React from "react";
import { asyncComponent } from "react-async-component";
import Loader from "../../../components/Loader";

export const Home = asyncComponent({
	resolve: () => import("../../../views/Home"),
	LoadingComponent: () => <Loader />, // Optional
	ErrorComponent: ({ error }) => <div>{error.message}</div> // Optional
});

export const Todos = asyncComponent({
	resolve: () => import("../../../containers/Todos"),
	LoadingComponent: () => <Loader />, // Optional
	ErrorComponent: ({ error }) => <div>{error.message}</div> // Optional
});
