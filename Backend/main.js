import { chromium } from 'playwright';

// generar resultados

async function getResultFromGoogle(query)
{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.buscadordeempleo.gov.co/#/home');
    await page.waitForSelector('input[name = "search-job-input"]')
    await page.type('input[name = "search-job-input"]',query);
    page.keyboard.press('Enter');
    console.log('he llegado hasta enter')
    await page.waitForSelector('div[class = "results-card-container"]')
    //await page.waitForNavigation({waitUntil: 'networkidle'});
    console.log('he llegado mas abajo')
    const listadoResultados = await page.evaluate(()=> {
        let resultados = [];
        console.log('entramos a lista de resultado')
        document.querySelectorAll('div[class = "results-card-container"]').forEach((anchor, index)=>{
            lista = anchor.querySelector('div[class = "results-card-secondary-info"]').innerText
            divide = lista.split('\n');
            resultados.push({
                index: index,
                title: divide[0],
                content: divide[divide.length - 1],
                url: anchor.querySelector('a').href,
            });
        });
        return resultados;
    });

    console.log(listadoResultados);
    await browser.close();


}


//getResultFromGoogle('Mecanico');


async function getResultFromGoogle1(query)
{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://co.computrabajo.com/trabajo-de-mecanico');
    console.log('he llegado hasta enter pagina')
    await page.waitForSelector('form[class="cont"]')
    console.log('he llegado hasta enter pagina1')
    await page.type('input[id="prof-cat-search-input-holder"]',query);
    page.keyboard.press('Enter');
    console.log('he llegado hasta enter')
    await page.waitForSelector('article[class = "box_offer"]')
    //await page.waitForNavigation({waitUntil: 'networkidle'});
    console.log('he llegado mas abajo')
    const listadoResultados = await page.evaluate(()=> {
        let resultados = [];
        console.log('entramos a lista de resultado')
        document.querySelectorAll('article[class = "box_offer"]').forEach((anchor, index)=>{
            lista = anchor.innerText
            divide = lista.split('\n');
            resultados.push({
                index: index,
                title: divide[0],
                content: divide[divide.length - 1],
                cositas: lista,
                url: anchor.querySelector('h2 a').href,
            });
        });
        return resultados;
    });

    console.log(listadoResultados);
    return listadoResultados;
    await browser.close();


}

getResultFromGoogle1('Mecanico');