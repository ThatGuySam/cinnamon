// https://github.com/papnkukn/qrcode-svg
import QRCode from 'qrcode-svg'

export function makeQrSvg (options = {}) {

    // console.log('QRCode', QRCode)

    const {
        url
    } = options

    return new QRCode({
        content: url,
        padding: 1,
        width: 256,
        height: 256,
        color: "#000000",
        background: "#ffffff",
        ecl: "H",
        join: true,
        xmlDeclaration: false,

        container: 'svg-viewbox'
    }).svg()

}