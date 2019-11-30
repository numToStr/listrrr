import React, { FC, memo } from "react";
import { Box, Button, FormControl } from "@material-ui/core";
import FormikForm from "../Form/FormikForm";
import FormikTextArea from "../Form/FormikTextArea";
import { SubmitHandler } from "../../@types/types";
import FormikSubmitButton from "../Form/FormikSubmitButton";
import { useICloseOrOpenMutation } from "../../gql/shared.query";
import { EntityType } from "../../generated/graphql";

type Props = {
    issueID: string;
    closed: boolean;
};

const initValues = { comment: "" };

const IssueCommentForm: FC<Props> = ({ issueID, closed }) => {
    const [closeOrOpen] = useICloseOrOpenMutation();

    const btnText = closed ? "Reopen Issue" : "Close Issue";

    const handleSubmit: SubmitHandler<typeof initValues> = async values => {
        console.log(values);
    };

    const handleCloseOrOpen = () => {
        closeOrOpen({
            variables: {
                data: {
                    closed: !closed,
                },
                where: {
                    _id: issueID,
                    type: EntityType.ISSUE,
                },
            },
        });
    };

    return (
        <FormikForm onSubmit={handleSubmit} initialValues={initValues}>
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
