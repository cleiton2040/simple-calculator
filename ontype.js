const charstoadd = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '^', '/', '.', 'π', '*']
const monitor = {
    show: document.getElementById('monitor-show'),
    result: document.getElementById('monitor-result')
}

for ( const x of document.querySelectorAll('th')) {
    x.addEventListener('click', type.bind(null, x))
}

function type(element) {

    const { innerHTML } = element;
    const { show } = monitor;

    if (charstoadd.includes(innerHTML)) show.innerHTML += innerHTML;
    else {

        switch (innerHTML) {
            case 'C': show.innerHTML = ''; calculate({ innerHTML: 0 }); break;
            case '←': show.innerHTML = show.innerHTML.slice(0, -1); break;
        }

    }

    calculate()
    rewriteBeauty()

}

async function calculate(value) {

    const { show, result } = monitor;
    const { innerHTML } = value || show

    if (!innerHTML || innerHTML.length > 20) return;
    else {

        const toeval = innerHTML.replace(/\^/g, '**').replace(/π/g, Math.PI)
        const operation = `${await eval(toeval)}`.slice(0, 15);
        let i = 0;

        result.innerHTML = '';
        
        const interval = setInterval(() => {

            result.innerHTML += operation[i++] || '';

            if(i > 15) return clearInterval(interval)
            
        }, 50)
    }

}

function rewriteBeauty() {

    const { show } = monitor;
    let newInnerHTML = '';

    for (const x of show.innerHTML) {
        if (!+x && x !== ' ') newInnerHTML += ' ' + x + ' ';
        else newInnerHTML += x;
    }

    show.innerHTML = newInnerHTML;

}