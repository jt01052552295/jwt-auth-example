import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "./Link";

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

export default function NavLink({ children, href, exact, ...props }) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  //   console.log(children);
  //   console.log(href);
  //   console.log(exact);
  //   console.log(props);

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
