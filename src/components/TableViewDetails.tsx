import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

import { AffiliateUnitWithKey } from "./TableView";

type Props = {
  unit: AffiliateUnitWithKey;
};

const Subheading = styled.div`
  font-size: 14px;
`;

const Link = styled.div`
  font-size: 14px;
`;

const Tagline = styled.div`
  font-size: 16px;
  text-decoration: underline;
`;

const Heading = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

function TableViewDetails({ unit }: Props) {
  return (
    <div>
      {unit.tagline && (
        <Tooltip placement="topLeft" title="Tagline">
          <Tagline>{unit.tagline}</Tagline>
        </Tooltip>
      )}
      <Tooltip placement="topLeft" title="Heading">
        <Heading>{unit.heading}</Heading>
      </Tooltip>
      <Tooltip placement="topLeft" title="Subheading">
        <Subheading>{unit.subheading}</Subheading>
      </Tooltip>
      <Tooltip placement="topLeft" title="Link">
        <Link>{unit.link}</Link>
      </Tooltip>
    </div>
  );
}

export default TableViewDetails;
