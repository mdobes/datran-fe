export const colorByDelay = (delay: number): string => {
    if (delay < 0){
        return "#007FFF";
    }else if (delay >= 0 && delay < 30){
        return "#00AA00";
    }else if (delay >= 30  && delay < 180){
        return "#006400";
    }else if (delay >= 180  && delay < 300) {
        return "#FF841F";
    }else if (delay >= 300  && delay < 600) {
        return "#d25e00";
    }else if (delay >= 600  && delay < 1200) {
        return "#DC143C";
    }else if (delay >= 1200){
        return "#8B4513";
    }

    return "#ed00ff";
}