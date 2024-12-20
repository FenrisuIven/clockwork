export const getCurrentTime = () => {
    const [ hours, minutes, seconds ] = new Date().toLocaleTimeString('uk-GB').split(':');
    return { hours, minutes, seconds };
}
