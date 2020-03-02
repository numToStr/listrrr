import React from "react";
import { InputAdornment, IconButton, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchTwoTone";
import FormikForm from "./Form/FormikForm";
import FormikTextField from "./Form/FormikTextField";
import { SubmitHandler } from "../@types/types";

const initValues = {
    search: "",
};

const SearchBar = () => {
    const onSubmit: SubmitHandler<typeof initValues> = async values => {
        console.log(values);

        return true;
    };

    return (
        <Box
            bgcolor="background.paper"
            borderRadius="borderRadius"
            boxShadow={1}
            p={[0.5, 0.6]}
        >
            <FormikForm onSubmit={onSubmit} initialValues={initValues}>
                <FormikTextField
                    name="search"
                    placeholder="Press / to start searching..."
                    fullWidth
                    variant="standard"
                    margin="none"
                    type="search"
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton color="primary" type="submit">
                                    <SearchIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormikForm>
        </Box>
    );
};

export default SearchBar;
