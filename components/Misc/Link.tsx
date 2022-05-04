import NextLink from "next/link";
import { Link as CLink, LinkProps } from "@chakra-ui/react";

type MyLinkProps = {
  href: string;
  children: React.ReactNode;
} & LinkProps;

const Link = ({ href, children, ...rest }: MyLinkProps) => {
  return (
    <NextLink href={href} passHref>
      <CLink as="a" {...rest}>
        {children}
      </CLink>
    </NextLink>
  );
};

export default Link;
