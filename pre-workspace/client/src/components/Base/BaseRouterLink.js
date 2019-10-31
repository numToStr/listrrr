import React, { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

export default forwardRef((props, ref) => (
    <RouterLink to={props.to} {...props} ref={ref} />
));
