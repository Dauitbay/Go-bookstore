import React from "react";

export function Spinner({ size = 20 }: { size?: number }) {
    return (
        <div
            className="animate-spin rounded-full border-2 border-white border-t-transparent"
            style={{ width: size, height: size }}
        />
    );
}

