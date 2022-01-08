import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import HostHomePage from "./components/HostHomePage";
import GuestHomePage from "./components/GuestHomePage";

const { Header, Content } = Layout;

class App extends React.Component {
  // when state changes, will rerender. Render is the process from Data--> View
  state = {
    authed: false, //
    asHost: false,
  };
  // component life cycle event, didMount is the event after first render
  componentDidMount() {
    // go to localStorage to get info, to see if the token is valid
    const authToken = localStorage.getItem("authToken");
    // go to localStorage to get info to see if the user role is correct
    const asHost = localStorage.getItem("asHost") === "true";
    // setState will rerender every time
    this.setState({
      authed: authToken !== null,
      asHost,
    });
  }
  //event handler, need decriptive name, keeps as login state
  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken"); //delete info in localStorage
    localStorage.removeItem("asHost"); //delete info in localStorage
    this.setState({
      authed: false, // set the state as false
    });
  };

  renderContent = () => {
    // if not login, go to login page
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
    // if login successfully, if asHost, go to host home page
    if (this.state.asHost) {
      return <HostHomePage />;
    }
    // if login successfully, if not asHost, go to guest home page
    return <GuestHomePage />;
  };
  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            Stays Booking
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default App;
