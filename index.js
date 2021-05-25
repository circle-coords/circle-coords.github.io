const before = document.getElementById('input-before');
const incrementBefore = document.getElementById('input-increment-b');
const varStartBefore = document.getElementById('input-var-start-b');
const points = document.getElementById('input-points');
const radius = document.getElementById('input-radius');
const yValue = document.getElementById('input-y');
const after = document.getElementById('input-after');
const incrementAfter = document.getElementById('input-increment-a');
const varStartAfter = document.getElementById('input-var-start-a');

const resetButton = document.getElementById('reset');

const explanations = document.getElementById('explanations');
const explanationContainer = document.getElementById('explanation-container');

const output = document.getElementById('output');

const autoUpdate = document.getElementById('auto-update')
const updateButton = document.getElementById('update')
const copyButton = document.getElementById('copy')
const copyConfirmation = document.getElementById('copy-indicator');

//input listeners
before.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
incrementBefore.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
varStartBefore.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
points.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
radius.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
yValue.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
after.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
incrementAfter.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });
varStartAfter.addEventListener("input", () => { if (autoUpdate.checked) updateOutput(); });

//focus listeners
before.addEventListener("focus", () => { showExplanation("<span>The value placed before the coordinates.</span><span>Use <span class=\"code\">%s</span> to indicate an auto-incrementing variable. This may be used to create things such as animations.</span>") });
incrementBefore.addEventListener("focusin", () => { showExplanation("<span>The <span class=\"code\">%s</span> in value before field gets replaced with an auto-incremented number, multiplied by this value.</span>") });
varStartBefore.addEventListener("focusin", () => { showExplanation("<span>The <span class=\"code\">%s</span> in value before field gets replaced with an auto-incremented number, added to this value.</span>") });
points.addEventListener("focusin", () => { showExplanation("<span>The number of points the circle contains. For best effects, use a multiple of 4.</span>") });
radius.addEventListener("focusin", () => { showExplanation("<span>The radius of the circle.</span>") });
yValue.addEventListener("focusin", () => { showExplanation("<span>The Y value used in the coordinates.</span>") });
after.addEventListener("focusin", () => { showExplanation("<span>The value placed after the coordinates.</span><span>Use <span class=\"code\">%s</span> to indicate an auto-incrementing variable. This may be used to create things such as animations.</span>") });
incrementAfter.addEventListener("focusin", () => { showExplanation("<span>The <span class=\"code\">%s</span> in value after field gets replaced with an auto-incremented number, multiplied by this value.</span>") });
varStartAfter.addEventListener("focusin", () => { showExplanation("<span>The <span class=\"code\">%s</span> in value after field gets replaced with an auto-incremented number, added to this value.</span>") });

before.addEventListener("focusout", () => { hideExplanation() });
incrementBefore.addEventListener("focusout", () => { hideExplanation() });
varStartBefore.addEventListener("focusout", () => { hideExplanation() });
points.addEventListener("focusout", () => { hideExplanation() });
radius.addEventListener("focusout", () => { hideExplanation() });
yValue.addEventListener("focusout", () => { hideExplanation() });
after.addEventListener("focusout", () => { hideExplanation() });
incrementAfter.addEventListener("focusout", () => { hideExplanation() });
varStartAfter.addEventListener("focusout", () => { hideExplanation() });


updateButton.addEventListener("click", updateOutput);
resetButton.addEventListener('click', resetInputs);

autoUpdate.addEventListener("click", () => {
    if (autoUpdate.checked) {
        updateButton.classList.add('hidden');
        return;
    }
    updateButton.classList.remove('hidden');
});

copyButton.addEventListener("click", copy);

function resetInputs() {
    before.value = '';
    incrementBefore.value = 1;
    varStartBefore.value = 0;
    points.value = 16;
    radius.value = 1;
    yValue.value = 0;
    after.value = '';
    incrementAfter.value = 1;
    varStartAfter.value = 0;
    updateOutput();
}
function showExplanation(html) {
    explanationContainer.innerHTML = html;
    explanations.classList.remove('hidden');
}
function hideExplanation() {
    explanationContainer.innerHTML = "";
    explanations.classList.add('hidden');
}
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