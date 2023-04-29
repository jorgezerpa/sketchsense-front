type FeaturesType={
    getPathCount:(paths:Array<Array<number>>)=>number;
    getPointCount:(paths:Array<Array<number>>)=>number;
}

export const features:FeaturesType={
    getPathCount:(paths)=>{
       return paths.length;
    },
    getPointCount:(paths)=>{
       const points=paths.flat();
       return points.length;
    }
};


