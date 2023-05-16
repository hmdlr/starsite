import { useConfigurations } from "../../hooks/configurations/useConfigurations";
import { ConfigLogoTitleContainer } from "../configuration/configsContainer/ConfigLogoTitleContainer";

import './createCustomConfig.scss';
import { RulesetContainer } from "./ruleset/RulesetContainer";
import { LoadingButton } from "../../components/loadingButton/LoadingButton";
import { useRulesets } from "../../hooks/configurations/useRulesets";
import { useState } from "react";

export const CustomConfigRulesets = () => {
  const { currentEditConfig } = useConfigurations();

  const {
    activeRulesets,
    allRulesets,
    selectableRulesets,
    markRulesetActive,
    markRulesetInactive,
    saveRulesetsToConfig
  } = useRulesets();

  const [dragging, setDragging] = useState(false);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);
    event.dataTransfer.setData("rulesetId", event.currentTarget.dataset.rulesetId!);
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
  };

  const onDropActive = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const rulesetId = event.dataTransfer.getData("rulesetId");
    if (!rulesetId) {
      return;
    }
    const ruleset = allRulesets.find((r) => r.id === rulesetId);
    markRulesetActive(ruleset!);
    setDragging(false);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (event.dataTransfer.types.includes('rulesetId')) {
      event.dataTransfer.dropEffect = 'move';
    }
  };

  return (
      <div className={'ruleset_select'}>
        <div className={'ruleset_select__config_title'}>
          <ConfigLogoTitleContainer config={currentEditConfig}/>
        </div>

        <div className={`ruleset_select__currently_selected`}>
          <span>Current configuration rulesets:</span>
          <div className={'ruleset_select__dropbox'}
               onDrop={onDropActive}
               onDragOver={onDragOver}
          >

            <div className={`drag-overlay`}>
                <span className={`${!dragging ? 'invisible' : 'visible'}`}>
                  Drop the rulesets here <span role={'img'} aria-label={'upload'}>📥</span>
                </span>
            </div>

            <div
                className={`ruleset_select__dropbox_active_rulesets ${dragging ? 'dragging' : ''}`}
            >
              {
                activeRulesets?.map((ruleset, idx) => {
                  return (
                      <div className={'active_ruleset_deletable'} key={idx}>
                        <RulesetContainer key={ruleset.id} ruleset={ruleset}/>
                        <div className={'active_ruleset_deletable__delete'}
                             onClick={() => markRulesetInactive(ruleset)}>
                          <img src={'/delete.svg'} alt={'delete'}/>
                        </div>
                      </div>
                  );
                })
              }
            </div>

            <div className={'ruleset_select__dropbox_footer'}>
              <div className={`ruleset_select__dropbox_promo ${dragging ? 'dragging' : ''}`}>
                <span>Want more than 4 rulesets per configuration? </span>
                <span>Check out our premium options!</span>
              </div>

              <LoadingButton
                  className={`white_formal_button small ${dragging ? 'dragging' : ''}`}
                  text={'Save'}
                  callbackFn={saveRulesetsToConfig}
              />
            </div>
          </div>
        </div>

        <div style={{ width: '100%', justifyContent: 'center' }}>
          <div className={'ruleset_select__choose_rulesets'}>
            <div className={'ruleset_select__search_rulesets'}>
              <input
                  type="text"
                  className={'did-floating-input'}
                  placeholder={'Bank of America'}
              />
              <LoadingButton className={'white_formal_button small'} text={'Search'} callbackFn={() => {
              }}/>
            </div>
            <span>Drag and drop rulesets into the configuration box</span>

            <div
                className={'ruleset_select__selectable_rulesets'}
            >
              {
                selectableRulesets?.map((ruleset) => {
                  return (
                      <RulesetContainer
                          key={ruleset.id}
                          ruleset={ruleset}
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd}
                          draggable={true}
                      />
                  );
                })
              }
            </div>
            <span className={'ruleset_select__selectable_rulesets_create_msg mt30'}>
            Or, <a href="/ruleset/create">create</a> a custom ruleset, for any brand you'd like
          </span>
          </div>
        </div>

      </div>
  );
};
