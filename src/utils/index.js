export const replaceCDATA = str =>
    str.replace("<![CDATA[", "").replace("]]>", "");

export const getAudioTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((hours ? time % 3600 : time) / 60);
    const seconds = Math.floor(time % 60);
    let result = hours ? `${hours}:` : "";
    result += minutes >= 10 ? `${minutes}:` : `0${minutes}:`;
    result += seconds >= 10 ? `${seconds}` : `0${seconds}`;

    return result;
};
