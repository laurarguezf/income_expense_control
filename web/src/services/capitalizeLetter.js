export default function capitalizeLetter(string) {

    if (typeof string !== 'string' || !string) {
        return '';
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}