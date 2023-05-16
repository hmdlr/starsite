import { IBrand } from "@hmdlr/types/dist/brands/IBrand";
import './rulesetContainer.scss'
import { Img } from "../../../components/protectedImage/Img";
import React from "react";

export const RulesetContainer = (props: {
  ruleset?: IBrand,
  draggable?: boolean,
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragEnd?: (event: React.DragEvent<HTMLDivElement>) => void
}) => {
  const { ruleset } = props;

  return (
    <div
        className={'ruleset'}
        draggable={props.draggable}
        onDragStart={props.onDragStart}
        onDragEnd={props.onDragEnd}
        data-ruleset-id={ruleset!.id}
        style={{
          cursor: props.draggable ? 'grab' : 'default'
        }}
    >
      <Img
          className={'ruleset_logo'}
          src={ruleset?.logo}
          alt=""
      />
      <span>{ruleset?.name}</span>
    </div>
  );
}
