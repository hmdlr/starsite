import React, { useEffect, useRef, useState } from "react";
import './createRuleset.scss';
import { LoadingButton } from "../../../components/loadingButton/LoadingButton";
import { useRulesets } from "../../../hooks/configurations/useRulesets";
import { useNavigate } from "react-router-dom";
import { IBrandCreatePayload } from "@hmdlr/types";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";
import ReactLoading from "react-loading";
import { usePopup } from "../../../hooks/popup/usePopup";

export const CreateRuleset = () => {
  const navigate = useNavigate();
  const {
    create,
    validateCreateRuleset,
    enhance,
    enhanceUploadLogo
  } = useRulesets();

  const { popup } = usePopup();

  const [authUrl, setAuthUrl] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [chosenLogo, setChosenLogo] = React.useState<string>('');

  const [candidates, setCandidates] = useState<Array<string>>([]);
  const [createdRulesetFromServer, setCreatedRulesetFromServer] = useState<IBrand>();

  const [step, setStep] = React.useState(1);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const step3Ref = useRef<HTMLDivElement | null>(null);

  const handleCreate = async () => {
    const localCreateRuleset: Partial<IBrandCreatePayload> = {
      name,
      authUrl
    };
    if (!validateCreateRuleset(localCreateRuleset)) {
      return;
    }
    setCreatedRulesetFromServer(await create(localCreateRuleset));
    scrollTo(3);
  };

  const scrollTo = (newStep: number) => {
    setStep(newStep);
  };

  useEffect(() => {
    switch (step) {
      case 1:
        return;
      case 2:
        step2Ref.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      case 3:
        step3Ref.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      default:
        return;
    }
  }, [step]);

  useEffect(() => {
    if (!createdRulesetFromServer?.id || step !== 3) {
      return;
    }

    enhance(createdRulesetFromServer.id).then((candidates) => {
      setCandidates(candidates);
    });

  }, [createdRulesetFromServer, step]);

  const handleFinishCreation = async () => {
    if (!createdRulesetFromServer?.id) {
      return;
    }
    await enhanceUploadLogo(createdRulesetFromServer.id, chosenLogo);
    popup.success('Ruleset created successfully');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
      <div className={'step-wizard-wrapper'}>

        <div className={`custom__ruleset step ${step >= 1 ? 'step-was-active' : ''}`}>
          <div className={'custom__ruleset__ruleset_url'}>
            <span>Let's start by entering the brand's authentication URL</span>
            <input
                type="url"
                placeholder={'https://my.page.com/login'}
                onChange={(e) => setAuthUrl(e.target.value)}
                value={authUrl}
            />
            <LoadingButton
                text={'Next'}
                className={'white_formal_button small'}
                callbackFn={() => scrollTo(2)}
            />
          </div>
          <div className={'custom__config__image_and_next'}>
            <img src="/brands/tab_holding.svg" alt=""/>
          </div>
        </div>

        <div ref={step2Ref} className={`custom__ruleset step ${step >= 2 ? 'step-was-active' : ''}`}>
          <div className={'custom__ruleset__ruleset_url'}>
            <span>What do you want this ruleset to be named?</span>
            <input
                type="text"
                placeholder={'MyBank #1'}
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <LoadingButton
                text={'Next'}
                className={'white_formal_button small'}
                callbackFn={handleCreate}
            />
          </div>
          <div className={'custom__config__image_and_next'}>
            <img src="/brands/preferences.svg" alt=""/>
          </div>
        </div>

        <div ref={step3Ref} className={`custom__ruleset step ${step >= 3 ? 'step-was-active' : ''}`}>
          <div className={'custom__ruleset__ruleset_url'}>

            {candidates.length === 0 && (
                <div className={'images-loading-container'}>
                  <span>Hold tight, we're loading your ruleset. You can enjoy your coffee ☕</span>
                  <ReactLoading type={'balls'} color={'#94a3b8'} height={200} width={200}/>
                </div>
            )}

            {candidates.length > 0 && (
                <div className={'ruleset_enhance__candidates'}>
                  <span>
                    We've found some logo candidates. Please select the one that seems to be the
                    most appropriate.
                  </span>
                  {candidates.map((candidate, idx) => (
                      <div className={'ruleset_enhance__candidate'} key={`div-${idx}`}>
                        <img
                            key={idx}
                            src={candidate}
                            style={{
                              border: `${chosenLogo === candidate ? '2px solid #94a3b8' : ''}`
                            }}
                            onClick={() => setChosenLogo(candidate)}
                            onError={
                          (e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('hidden');
                          }
                        }/>
                      </div>
                  ))}
                </div>
            )
            }

            <div style={{
              display: `${candidates.length === 0 ? 'none' : 'block'}}`
            }}>
              <LoadingButton
                  text={'Finish'}
                  className={'white_formal_button small'}
                  callbackFn={handleFinishCreation}
                  disabled={chosenLogo === ''}
              />
            </div>
          </div>
          <div className={'custom__config__image_and_next'}>
            <img src="/brands/logo_design_undraw.svg" alt=""/>
          </div>
        </div>

      </div>
  );
};
