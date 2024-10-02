export default function capitalizeLetter(string) {

    console.log('String', string);
    console.log(typeof string);
    
    
    
    if (typeof string === 'string' || !string) {
        return '';
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}