
export function consoleLogWriter(message: string, musteriyeTeslimEdildiMi = false) {

    let logElement: any;
    let informationText = document.getElementById('informationText') as HTMLElement;
    
    informationText.innerText= ` ${consoleLogText(message, false)}`;
    console.log(informationText.innerText);

    /*if (musteriyeTeslimEdildiMi ) {

        setTimeout(() => {
            while (informationText.hasChildNodes()) {
                informationText.removeChild(informationText.children[0]);
            }
            console.clear();
        },2500);
    }
    else {
        logElement = document.createElement('div');
        logElement.class = 'text-secondary logElementItem';

        logElement.innerHTML = ` ${consoleLogText(message, false)}`;

        console.log(consoleLogText(message, false));
        informationText?.appendChild(logElement);
    }
    */


}

export function consoleLogText(message: string, timeState: boolean = true): string {
    if (!timeState) {
        return `[Log] : ${message} (${nowDateStringFormat(new Date())})`;
    }
    else {
        return message;
    }
}
export function nowDateStringFormat(currentDate: Date): String {
    let hours: string, minutes: string, seconds: string;

    var hour = Number(currentDate.getHours())
    if (hour < 10) {
        hours = `0${hour}`;
    }
    else {
        hours = `${hour}`
    }
    var minute = Number(currentDate.getMinutes())
    if (minute < 10) {
        minutes = `0${minute}`;
    } else {
        minutes = `${minute}`
    }
    var second = Number(currentDate.getSeconds())

    if (second < 10) {
        seconds = `0${second}`;
    } else {
        seconds = `${second}`
    }

    return (hours + ':' + minutes + ':' + seconds);
}