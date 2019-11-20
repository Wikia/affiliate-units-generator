import React from "react";
import { Layout } from "antd";
import { connect } from "react-redux";

import { AppState } from "../store/store";
import User from "../models/User";

import Menu from "./Menu";
import JsonView from "./JsonView";
import TableView from "./TableView";

const { Header, Content } = Layout;

type Props = {
  user?: User;
};

function App({ user }: Props) {
  if (!user) {
    return null;
  }

  return (
    <Layout className="layout">
      <Header>
        <Menu />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {user.isJsonMode() && <JsonView />}
          {user.isTableMode() && <TableView />}
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state: AppState): Partial<Props> => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(App);
