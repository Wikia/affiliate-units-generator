import React from "react";
import { Icon } from "antd";

type Props = {
  json: string,
};

enum ValidationState {
  UNDEFINED,
  OK,
  ERROR,
};

export function IsValidJson(json: string): boolean {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }
    return true;
}

function JsonValidator({ json }: Props) {
  const [validationState, setValidationState] = React.useState<ValidationState>(ValidationState.UNDEFINED);

  React.useEffect(() => {
    if (!json) {
      setValidationState(ValidationState.UNDEFINED);
      return;
    }
    setValidationState(IsValidJson(json) ? ValidationState.OK : ValidationState.ERROR);
  }, [json]);

  switch (validationState) {
    case ValidationState.OK:
      return <Icon style={{ padding: "0 20px" }} type="check" />;
    case ValidationState.ERROR:
      return <Icon style={{ padding: "0 20px" }} type="warning" />;
    default:
      return null;
  }
}

export default JsonValidator;
