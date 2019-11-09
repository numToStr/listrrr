import React, { forwardRef } from "react";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps
} from "react-router-dom";

export default forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
));
