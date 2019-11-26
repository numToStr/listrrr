import React, { FC, memo } from "react";
import { Box, makeStyles, FormControlLabel, Radio } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import { ThemeBgColor } from "../../@types/types";

const useStyles = makeStyles(({ palette: { getContrastText } }) => ({
    btn: ({ color }: ThemeBgColor) => ({
        background: color,
        color: getContrastText(color),
    }),
    radio: ({ color }: ThemeBgColor) => ({
        color: getContrastText(color),
    }),
    label: {
        paddingRight: "0.4rem",
    },
}));

type Props = BoxProps & {
    themeColor: ThemeBgColor;
};

const ThemeBgColorButton: FC<Props> = ({ themeColor, ...props }) => {
    const styles = useStyles(themeColor);

    return (
        <Box
            py={1}
            borderRadius="borderRadius"
            className={styles.btn}
            textAlign="center"
            {...props}
        >
            <FormControlLabel
                control={
                    <Radio
                        color="default"
                        classes={{
                            root: styles.radio,
                            checked: styles.radio,
                        }}
                    />
                }
                value={themeColor}
                label={themeColor.title}
            />
        </Box>
    );
};

export default memo(ThemeBgColorButton);
