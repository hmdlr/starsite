import './navbar.scss';

export const Navbar = () => {
  return (
      <div className={'navbar'}>
        <div className={'navbar__logo'}>
          <img src={'/logo.png'} alt={'logo'}/>
        </div>
        <div className={'navbar__links'}>
          <a href={'#about'}>About</a>
          <a href={'#api'}>API</a>
          <a href={'/auth'}>Login</a>
        </div>
      </div>
  );
};
