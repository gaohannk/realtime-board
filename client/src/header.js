import React, {Component} from "react";
import "./public/stylesheets/header.css";
import Time from "./time";

export default class Header extends Component {

    render() {
        return (
            <div className="Dashboard">
                <header className="Dashboard-header">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/MBTA.svg" className="Dashboard-logo" alt="logo"/>
                    <h1 className="Dashboard-title">North Station Information</h1>
                    <Time> </Time>
                </header>
                <p className="Dashboard-intro"></p>
            </div>
        );
    }
}

