import './navbar.scss';
import { useAuth } from "../../hooks/useAuth";
import env from "../../env";
import { DeployedPaths, FrontPaths } from "@hmdlr/utils/dist/Microservice";

export const Navbar = () => {
  const { username } = useAuth();
  return (
      <div className={'navbar'}>
        <div className={'navbar__logo'}>
          <a href="/" className={'no-style'} style={{
            textDecoration: 'none',
            color: 'unset',
          }}>
            <img src={'/logo.png'} alt={'logo'}/>
          </a>
        </div>
        <div className={'navbar__links'}>
          <a href={'/#about'}>About</a>
          <a href={
            FrontPaths["workspace"]
          }>Configuration</a>
          <a href={'/auth'}>Login</a>
        </div>
        <div className={'navbar__user'}>
          <span>
            {username ? '@' : ''}{username}
          </span>
        </div>
      </div>
  );
};
