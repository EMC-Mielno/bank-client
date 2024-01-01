export default function (number) {
    let strNumber = number.toString();
    return '··' + strNumber.slice(-4);
}