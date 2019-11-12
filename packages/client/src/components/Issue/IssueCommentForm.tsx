import React, { FC, memo } from "react";
import { Box, Button, FormControl } from "@material-ui/core";
import FormikForm from "../Form/FormikForm";
import FormikTextArea from "../Form/FormikTextArea";
import { SubmitHandler } from "../../@types/types";
import FormikSubmitButton from "../Form/FormikSubmitButton";
import { useCloseOrOpenMutation } from "../../gql/shared.query";
import { EntityType } from "../../generated/graphql";

type Props = {
    issueID: string;
    closed: boolean;
};

const IssueCommentForm: FC<Props> = ({ issueID, closed }) => {
    const [closeOrOpen] = useCloseOrOpenMutation();

    const btnText = closed ? "Reopen Issue" : "Close Issue";

    const handleSubmit: SubmitHandler<{ comment: string }> = values => {
        console.log(values);
    };

    const handleCloseOrOpen = () => {
        closeOrOpen({
            data: {
                closed: !closed
            },
            where: {
                _id: issueID,
                type: EntityType.Issue
            }
        });
    };

    return (
        <FormikForm onSubmit={handleSubmit} initialValues={{ comment: "" }}>
            <FormikTextArea name="comment" label="Leave a comment" />
            <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Box mr={1}>
                    <FormControl margin="normal">
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={handleCloseOrOpen}
                        >
                            {btnText}
                        </Button>
                    </FormControl>
                </Box>
                <FormikSubmitButton fullWidth={false}>
                    Comment
                </FormikSubmitButton>
            </Box>
        </FormikForm>
    );
};

export default memo(IssueCommentForm);
