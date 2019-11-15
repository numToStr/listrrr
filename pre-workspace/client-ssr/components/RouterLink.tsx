// source: https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
import React, { forwardRef, AnchorHTMLAttributes, Ref, FC } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link";

type NextComposedProps = AnchorHTMLAttributes<HTMLAnchorElement> &
    NextLinkProps;

const NextComposed = forwardRef<HTMLAnchorElement, NextComposedProps>(
    (props, ref) => {
        const {
            as,
            href,
            replace,
            scroll,
            passHref,
            shallow,
            prefetch,
            ...other
        } = props;

        return (
            <NextLink
                href={href}
                prefetch={prefetch}
                as={as}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref={passHref}
            >
                <a ref={ref} {...other} />
            </NextLink>
        );
    }
);

interface LinkPropsBase {
    activeClassName?: string;
    innerRef?: Ref<HTMLAnchorElement>;
    naked?: boolean;
}

type LinkProps = LinkPropsBase & NextComposedProps & Omit<MuiLinkProps, "ref">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link: FC<LinkProps> = props => {
    const {
        activeClassName = "active",
        className: classNameProps,
        innerRef,
        naked,
        ...other
    } = props;
    const router = useRouter();

    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === props.href && activeClassName
    });

    if (naked) {
        return <NextComposed className={className} ref={innerRef} {...other} />;
    }

    return (
        <MuiLink
            component={NextComposed}
            className={className}
            ref={innerRef}
            {...other}
        />
    );
};

export default forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link {...props} innerRef={ref} />
));
