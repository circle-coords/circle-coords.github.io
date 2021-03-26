const before = document.getElementById('input-before');
const incrementBefore = document.getElementById('input-increment-b');
const varStartBefore = document.getElementById('input-var-start-b');
const points = document.getElementById('input-points');
const radius = document.getElementById('input-radius');
const yValue = document.getElementById('input-y');
const after = document.getElementById('input-after');
const incrementAfter = document.getElementById('input-increment-a');
const varStartAfter = document.getElementById('input-var-start-a');

const output = document.getElementById('output');

const autoUpdate = document.getElementById('auto-update')
const updateButton = document.getElementById('update')
const copyButton = document.getElementById('copy')
const copyConfirmation = document.getElementById('copy-indicator');

before.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
incrementBefore.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
varStartBefore.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
points.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
radius.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
before.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
yValue.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
after.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
incrementAfter.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
varStartAfter.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });

updateButton.addEventListener("click", updateOutput);

autoUpdate.addEventListener("click", () => {
    if (autoUpdate.checked) {
        updateButton.classList.add('hidden');
        return;
    }
    updateButton.classList.remove('hidden');
});

copyButton.addEventListener("click", copy);

function updateOutput() {
    let ret = [];
    for (let i = 0; i < points.value; i++) {
        let [x, z] = findCoords(radius.value, (2 * Math.PI / points.value) * i);
        ret.push(
            (before && before.value ? before.value.replace(/%s/g, Number(varStartBefore.value) + i * incrementBefore.value) + ' ' : '') +
            `~${x != 0 ? x : ''} ~${yValue.value != 0 ? yValue.value : ''} ~${z != 0 ? z : ''}` +
            (after && after.value ? ' ' + after.value.replace(/%s/g, Number(varStartAfter.value) + i * incrementAfter.value) : '')
        )
    }
    output.innerHTML = ret.join('\n');
}
updateOutput();

function copy() {
    output.select();
    output.setSelectionRange(0, 9999999);
    document.execCommand("copy");
    output.setSelectionRange(-1, -1);
    copyButton.focus();
    copyConfirmation.classList.remove('hidden');
    setTimeout(() => {
        copyConfirmation.classList.add('hidden');
    }, 4000)
}

function roundToPlaces(num, places) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places)
}

function findCoords(radius, angle) {
    return [roundToPlaces(radius * Math.cos(angle), 3), roundToPlaces(radius * Math.sin(angle), 3)]
}