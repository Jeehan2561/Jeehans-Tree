
function exponentialFormat(num, precision = options.precisions, mantissa = false) {
    let e = num.log10().floor()
    let le = num.log10().toStringWithDecimalPlaces(precision)
    let ee = num.log10().div(3).floor().times(3)
    let m = num.div(Decimal.pow(10, e))
    let em = num.div(Decimal.pow(10, ee))
    if (m.toStringWithDecimalPlaces(precision) == 10) {
        m = decimalOne
        e = e.add(1)
    }
    e = (e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e))
    let SR = m.toStringWithDecimalPlaces(precision) + "e" + formatWhole(e)
    let ER = em.toStringWithDecimalPlaces(precision) + "e" + formatWhole(ee)
    let LR = "e" + format(le)
    if (Decimal.gte(e, 1e9)) SR = LR
    let TSR = m.toStringWithDecimalPlaces(precision) + "x10^" + formatWhole(e)
    let TER = em.toStringWithDecimalPlaces(precision) + "x10^" + formatWhole(ee)
    let TLR = "10^" + format(le)
    if (Decimal.gte(e, 1e9)) TSR = TLR

    if (options.notation=="Scientific") return SR
    if (options.notation=="Engineering") return ER
    if (options.notation=="Logarithms") return LR
    if (options.notation=="True Scientific") return TSR
    if (options.notation=="True Engineering") return TER
    if (options.notation=="True Logarithms") return TLR
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.001) return (0).toFixed(precision)
    let init = num.toStringWithDecimalPlaces(precision)
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1) return portions[0]
    return portions[0] + "." + portions[1]
}


function regularFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    if (num.mag < 0.0001) return (0).toFixed(precision)
    if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4)
    return num.toStringWithDecimalPlaces(precision)
}

function fixValue(x, y = 0) {
    return x || new Decimal(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return decimalZero
    return x.reduce((a, b) => Decimal.add(a, b))
}

function format(decimal, precision = options.precisions, small) {
    small = small || modInfo.allowSmall
    decimal = new Decimal(decimal)
    if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
        player.hasNaN = true;
        return "NaN"
    }
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small)
    if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
    if (decimal.gte("ee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(4) + "F" + commaFormat(slog.floor(), 0)
    }
    else if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0)
    else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
    else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
    else if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision)
    else if (decimal.eq(0)) return (0).toFixed(precision)

    decimal = invertOOM(decimal)
    let val = ""
    if (decimal.lt("1e1000")){
        val = exponentialFormat(decimal, precision)
        return val.replace(/([^(?:e|F)]*)$/, '-$1')
    }
    else   
        return format(decimal, precision) + "⁻¹"

}

function formatWhole(decimal) {
    decimal = new Decimal(decimal)
    if (decimal.gte(1e9)) return format(decimal, options.precisions)
    if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, options.precisions)
    return format(decimal, 0)
}

function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new Decimal(x)
    let result = x.toStringWithDecimalPlaces(precision)
    if (new Decimal(result).gte(maxAccepted)) {
        result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
    }
    return result
}

function formatTimePlus(s) {
    let se = D(s)
    if (se.lte(60)) return format(se) + "s"
    if (se.lte(3600)) return formatWhole(Math.floor(se.div(60))) + "m " + format(se % 60) + "s"
    if (se.lte(86400)) return formatWhole(Math.floor(se.div(3600))) + "h " + formatWhole(Math.floor(se.div(60)) % 60) + "m " + format(se % 60) + "s"
    if (se.lte(31536000)) return formatWhole(Math.floor(se.div(86400)) % 365) + "d " + formatWhole(Math.floor(se.div(3600)) % 24) + "h " + formatWhole(Math.floor(se.div(60)) % 60) + "m " + format(se % 60) + "s"
    if (se.lte(3.1536e16)) return format(se.div(31536000))+"y"
    if (se.lte(D(3.1536e16).times(13.7))) return format(se.div(3.1536e16))+" eons"
    return format(se.div(3.1536e16).div(13.7))+" uni"
}

// Will also display very small numbers
function formatSmall(x, precision=options.precisions) { 
    return format(x, precision, true)    
}

function invertOOM(x){
    let e = x.log10().ceil()
    let m = x.div(Decimal.pow(10, e))
    e = e.neg()
    x = new Decimal(10).pow(e).times(m)

    return x
}