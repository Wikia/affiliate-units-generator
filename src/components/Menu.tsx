import React from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "../store/store";
import { setJsonMode, setTableMode } from "../store/user/actions";

enum MenuKey {
  JSON = 'json',
  TABLE = 'table',
};

const mapStateToProps = (state: AppState) => ({
  currentMode: state.user.isTableMode() ? MenuKey.TABLE : MenuKey.JSON,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doSwitchMode: (mode: string) => {
    if (mode === MenuKey.TABLE) {
      dispatch(setTableMode());
    } else {
      dispatch(setJsonMode());
    }
  },
});

type Props = {
  currentMode: string;
  doSwitchMode: (mode: string) => void;
};

function AppMenu({ currentMode, doSwitchMode }: Props) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[currentMode]}
      style={{ lineHeight: "64px" }}
      onClick={e => doSwitchMode(e.key)}
    >
      <Menu.Item key={MenuKey.JSON}>JSON</Menu.Item>
      <Menu.Item key={MenuKey.TABLE}>Table</Menu.Item>
    </Menu>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
