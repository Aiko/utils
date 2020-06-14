/* A collection of expansions to the JS browser runtime for convenience.
*
* @author   Priansh Shah <priansh@helloaiko.com>, Ruben Touitou <ruben@helloaiko.com> for Aiko AI <https://helloaiko.com>
* @license  MIT
*/

const _API = window.location.origin

const post = async (url, data, token) => {
    let s = await fetch(_API + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token || ""
        }
    }).catch(e => {
        console.error('Error in sending request', e)
        throw e
    })
    if (s.status != 200) {
        console.error('Server returned error:', s.status)
        const d = await s.json()
        console.error(d)
        if (d) return {error: s.status, msg: d.error}
        return { error: s.status }
    }
    let d = await s.json().catch(e => {
        console.error('Error when trying to consume JSON from server response.', e)
        throw e
    })
    if (d.error) throw d.error;
    else return d
}

window.post = post
const log = (...args) => {
    // NOTE: you cannot pass colors or a tag to log
    // please use info, success, or error for your pretty messages :)
    console.log("[App]", ...args)
}
const success = console.log
const error = console.error
window.info = console.info
window.log = log
window.error = error


Date.prototype.toMonth = function () {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September'
    ][this.getMonth()]
}

Date.prototype.toDate = function () {
    return `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`
}

Date.prototype.toTime = function () {
    return this.toISOString().substr(11, 8)
}

Array.prototype.tail = function (n) {
    return this.slice(-n)
}

Array.prototype.last = function () {
    return this.tail(1)[0]
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

Array.prototype.joinTo = function (to, separator) {
    const toJoin = this.slice(0, to)
    if (this.length > toJoin.length)
        return toJoin.join(separator || ',') + ' + ' + (this.length - toJoin.length)
    else return toJoin.join(separator || ',')
}

String.prototype.getDomain = function () {
    try {
        let url;
        if (!this.startsWith('http://') && !this.startsWith('https://')) {
            url = new window.URL('http://' + this)
        } else {
            url = new window.URL(this)
        }
        return url.host
    } catch (e) {
        return null
    }
}

Number.prototype.secondsToTimestring = function () {
    return new Date(this * 1000).toISOString().substr(11, 8)
}

Number.prototype.toFilesize = function () {
    const byte = 1
    const kilobyte = byte * 1000
    const megabyte = kilobyte * 1000
    const gigabyte = megabyte * 1000
    if (this > gigabyte) return (this / gigabyte).toFixed(2) + ' GB'
    if (this > megabyte) return (this / megabyte).toFixed(2) + ' MB'
    if (this > kilobyte) return (this / kilobyte).toFixed(2) + ' KB'
    return this + ' bytes'
}

const ObjectID2Date = _id => {
    const timestamp = _id.substring(0, 8)
    return new Date(parseInt(timestamp, 16) * 1000)
}

window.copy = t => {
    const el = document.createElement('textarea')
    el.value = t
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
    }
}

const _Channel2Hex = c => c.toString(16).padStart(2, '0')
const RGB2Hex = (r, g, b) => _Channel2Hex(r) + _Channel2Hex(g) + _Channel2Hex(b)

const rgbIsDark = (r, g, b) => {
    const hsp = Math.sqrt(0.299 * (r**2) + 0.587 * (g**2) + 0.114 * (b**2))
    return hsp < 150
}

const Image2Color = imurl => new Promise((s, _) => {
    const thief = new ColorThief()
    const image = new Image()
    image.onload = () => {
        const palette = thief.getPalette(image)
        console.log(palette)
        const darkColors = palette.filter(rgb => rgbIsDark(...rgb))
        console.log(darkColors)
        if (!darkColors || darkColors.length == 0) return s(null);
        const rgb = darkColors[0]
        console.log(...rgb)
        const color = RGB2Hex(...rgb)
        console.log(color)
        return s(color)
    }
    image.crossOrigin = "Anonymous"
    image.src = imurl
})

const ext2icon = ext => {
    switch (ext) {
        case 'gz':
            return 'fa-file-archive';
        case 'zip':
            return 'fa-file-archive';
        case 'tar':
            return 'fa-file-archive';
        case '7z':
            return 'fa-file-archive';
        case 'rar':
            return 'fa-file-archive';

        case 'mp3':
            return 'fa-file-audio';
        case 'aac':
            return 'fa-file-audio';
        case 'ogg':
            return 'fa-file-audio';
        case 'wav':
            return 'fa-file-audio';
        case 'raw':
            return 'fa-file-audio';

        case 'js':
            return 'fa-file-code';
        case 'css':
            return 'fa-file-code';
        case 'cpp':
            return 'fa-file-code';
        case 'java':
            return 'fa-file-code';
        case 'class':
            return 'fa-file-code';
        case 'py':
            return 'fa-file-code';
        case 'cs':
            return 'fa-file-code';
        case 'gml':
            return 'fa-file-code';
        case 'bin':
            return 'fa-file-code';
        case 'asm':
            return 'fa-file-code';
        case 'pl':
            return 'fa-file-code';
        case 'hs':
            return 'fa-file-code';
        case 'jsx':
            return 'fa-file-code';
        case 'ts':
            return 'fa-file-code';
        case 'html':
            return 'fa-file-code';
        case 'json':
            return 'fa-file-code';
        case 'sh':
            return 'fa-file-code';
        case 'env':
            return 'fa-file-code';

        case 'xls':
            return 'fa-file-excel';
        case 'xlsx':
            return 'fa-file-excel';
        case 'csv':
            return 'fa-file-excel';
        case 'numbers':
            return 'fa-file-excel';

        case 'jpg':
            return 'fa-file-image';
        case 'jpeg':
            return 'fa-file-image';
        case 'png':
            return 'fa-file-image';
        case 'gif':
            return 'fa-file-image';
        case 'psd':
            return 'fa-file-image';
        case 'ai':
            return 'fa-file-image';
        case 'tiff':
            return 'fa-file-image';
        case 'bmp':
            return 'fa-file-image';
        case 'riff':
            return 'fa-file-image';
        case 'xbmp':
            return 'fa-file-image';
        case 'webp':
            return 'fa-file-image';

        case 'mp4':
            return 'fa-file-movie';
        case 'avi':
            return 'fa-file-movie';
        case 'wmv':
            return 'fa-file-movie';
        case 'flv':
            return 'fa-file-movie';
        case 'mov':
            return 'fa-file-movie';
        case 'webm':
            return 'fa-file-movie';
        case 'mpeg':
            return 'fa-file-movie';
        case 'mpg':
            return 'fa-file-movie';
        case 'mpv':
            return 'fa-file-movie';

        case 'doc':
            return 'fa-file-word';
        case 'docx':
            return 'fa-file-word';
        case 'txt':
            return 'fa-file-text';
        case 'pdf':
            return 'fa-file-pdf';

        case 'ppt':
            return 'fa-file-powerpoint';
        case 'pptx':
            return 'fa-file-powerpoint';
        case 'odp':
            return 'fa-file-powerpoint';

        default:
            return 'fa-file';
    }
}