import React from "react";
import styled from "styled-components";
import { Tooltip, Icon, Tag } from "antd";

import { AffiliateUnitWithKey } from "./TableView";
import countries from './countries.json';

type Props = {
  unit: AffiliateUnitWithKey;
};

const Countries = styled.div`
  margin-bottom: 10px;
`;

type IconWithTooltipProps = {
  type: string;
  color: string;
  tooltip: string;
};

function IconWithTooltip({ type, color, tooltip }: IconWithTooltipProps) {
  return (
    <Tooltip title={tooltip}>
      <Icon
        type={type}
        style={{ color: color, fontSize: "20px", margin: "2px" }}
      />
    </Tooltip>
  );
}

function findCountry(code: string): string {
  const country = countries.find(country => country.Code === code);
  return country ? country.Name : "";
}

function TableViewFeatures({ unit }: Props) {
  return (
    <div>
      {unit.country && (
        <Countries>
          {unit.country.map(c => (
            <Tooltip key={c} title={`Available only in ${findCountry(c)}`}>
              <Tag>{c}</Tag>
            </Tooltip>
          ))}
        </Countries>
      )}
      {unit.isExternal ? (
        <IconWithTooltip type="link" color="green" tooltip="External link" />
      ) : (
        <IconWithTooltip type="link" color="blue" tooltip="Internal link" />
      )}
      {unit.launchOn ? (
        <IconWithTooltip
          type="clock-circle"
          color="green"
          tooltip={`Launch date: ${unit.launchOn}`}
        />
      ) : (
        <IconWithTooltip
          type="clock-circle"
          color="gray"
          tooltip="No special launch date"
        />
      )}
      {unit.disableOnSearch ? (
        <IconWithTooltip
          type="search"
          color="red"
          tooltip="Unit disabled on search"
        />
      ) : (
        <IconWithTooltip
          type="search"
          color="green"
          tooltip="Unit enabled on search"
        />
      )}
      {unit.disableOnPage ? (
        <IconWithTooltip
          type="read"
          color="red"
          tooltip="Unit disabled on articles"
        />
      ) : (
        <IconWithTooltip
          type="read"
          color="green"
          tooltip="Unit enabled on articles"
        />
      )}
      {unit.onlyOnIOS && (
        <IconWithTooltip
          type="apple"
          color="red"
          tooltip="Unit visible only on iOS"
        />
      )}
      {unit.onlyOnAndroid && (
        <IconWithTooltip
          type="android"
          color="red"
          tooltip="Unit visible only on Andorid"
        />
      )}
    </div>
  );
}

export default TableViewFeatures;
