import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { logError } from "../utils/logger";
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, info) {
        logError(error, info);
    }
    render() {
        if (this.state.hasError)
            return _jsx("div", { className: "p-6", children: "Something went wrong." });
        return this.props.children;
    }
}
