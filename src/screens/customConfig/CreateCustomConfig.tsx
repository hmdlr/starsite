import './createCustomConfig.scss';

export const CreateCustomConfig = () => {
  return (
      <div className={'custom__config'}>
        <div className={'custom__config__config_name'}>
          <span>What will this configuration be named?</span>
          <input type="text"/>
        </div>
        <div className={'custom__config__image_and_next'}>
          <img src="/configurations/settings.svg" alt=""/>
          <div className={'custom__config__image_and_next__button'}>
            <button className={'green_neon_button_xl'}>Next</button>
          </div>
        </div>
      </div>
  );
};
