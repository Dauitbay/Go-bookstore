import React from "react";
import { logError } from "../utils/logger";

export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: any, info: any) {
        logError(error, info);
    }
    render() {
        if (this.state.hasError) return <div className="p-6">Something went wrong.</div>;
        return this.props.children;
    }
}
