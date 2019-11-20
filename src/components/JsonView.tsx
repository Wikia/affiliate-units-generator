import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PageHeader, Button, Form, Input } from "antd";

import { loadUnits } from "../store/units/actions";
import { setTableMode } from "../store/user/actions";
import { AppState } from "../store/store";

import JsonValidator, { IsValidJson } from "./JsonValidator";

const { TextArea } = Input;

type Props = {
  baseJson?: string;
  doLoad: (json: string) => void;
};

function JsonView({ baseJson, doLoad }: Props) {
  const [json, setJson] = React.useState<string>(
    (baseJson && baseJson.length && baseJson !== "[]") ? baseJson : ''
  );

  function onJsonChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setJson(e.target.value);
  }

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();

    doLoad(json);
  }

  const SubmitButton = (
    <Form.Item>
      <Button
        type="primary"
        onClick={onSubmit}
        disabled={!IsValidJson(json)}
        icon="import"
      >
        Load JSON
      </Button>
      <JsonValidator json={json} />
    </Form.Item>
  );

  return (
    <PageHeader
      ghost={false}
      title="JSON View"
      subTitle="Paste affiliated-units.json here"
    >
      <Form layout="vertical">
        {SubmitButton}
        <Form.Item required>
          <TextArea
            className="code"
            rows={10}
            value={json}
            onChange={onJsonChange}
            autoFocus
            autoSize
          />
        </Form.Item>
        {SubmitButton}
      </Form>
    </PageHeader>
  );
}

const mapStateToProps = (state: AppState): Partial<Props> => ({
  baseJson: JSON.stringify(state.units, null, 2),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doLoad: (json: string) => {
    dispatch(loadUnits(json));
    dispatch(setTableMode());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JsonView);
