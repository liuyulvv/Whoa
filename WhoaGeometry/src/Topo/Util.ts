function Clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

function DegreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

function RadiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
}

export { Clamp, DegreesToRadians, RadiansToDegrees };
