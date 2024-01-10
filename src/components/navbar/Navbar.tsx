import "./navbar.scss";
import { FrontPaths } from "@hmdlr/utils/dist/Microservice";

export const Navbar = () => {
  return (
    <div className={"navbar"}>
      <div className={"navbar__logo"}>
        <a
          href="/"
          className={"no-style"}
          style={{
            textDecoration: "none",
            color: "unset",
          }}
        >
          <img src={"/logo.png"} alt={"logo"} />
        </a>
      </div>
      <div className={"navbar__links"}>
        <a href={"/#about"}>About</a>
        <a href={FrontPaths["workspace"]}>Configuration</a>
        <a href={"/auth"}>Login</a>
      </div>
    </div>
  );
};
