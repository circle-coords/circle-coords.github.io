const before = document.getElementById('input-before');
const incrementBefore = document.getElementById('input-increment-b');
const points = document.getElementById('input-points');
const radius = document.getElementById('input-radius');
const yValue = document.getElementById('input-y');
const after = document.getElementById('input-after');
const incrementAfter = document.getElementById('input-increment-a');

const output = document.getElementById('output');

before.addEventListener("input", updateOutput)
incrementBefore.addEventListener("input", updateOutput)
points.addEventListener("input", updateOutput)
radius.addEventListener("input", updateOutput)
before.addEventListener("input", updateOutput)
yValue.addEventListener("input", updateOutput)
after.addEventListener("input", updateOutput)
incrementAfter.addEventListener("input", updateOutput)

function updateOutput() {
    console.log('hi');
    let ret = [];
    for (let i = 0; i < points.value; i++) {
        let [x, z] = findCoords(radius.value, (2 * Math.PI / points.value) * i);
        ret.push(
            (before && before.value ? before.value.replace(/%s/g, i * incrementBefore.value) + ' ' : '') +
            `~${x != 0 ? x : ''} ~${yValue.value != 0 ? yValue.value : ''} ~${z != 0 ? z : ''}` +
            (after && after.value ? after.value.replace(/%s/g, i * incrementAfter.value) + ' ' : '')
        )
    }
    output.innerHTML = ret.join('\n');
}
updateOutput();

function roundToPlaces(num, places) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places)
}

function findCoords(radius, angle) {
    return [roundToPlaces(radius * Math.cos(angle), 3), roundToPlaces(radius * Math.sin(angle), 3)]
}