type samplesType = Array<Array<number>>;


export const NearestNeighbor = {
    getDistance : (point1: [number,number], point2: [number,number]): number => {
        const x1 = point1[0];
        const y1 = point1[1];
        const x2 = point2[0];
        const y2 = point2[1];
        const xDiff = x2 - x1;
        const yDiff = y2 - y1;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }
};




