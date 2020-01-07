import React, {Component} from "react";

export default class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div className="CurrentTime">
                <h2 id="datetime"> Current Date/Time: {this.state.date.toDateString()+ this.state.date.toLocaleTimeString()} </h2>
            </div>
        );
    }
}
