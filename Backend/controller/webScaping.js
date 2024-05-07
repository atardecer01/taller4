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
    return listadoResultados;
    await browser.close();


}

async function getResultFromGoogle1(query)
{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://co.computrabajo.com');
    await page.waitForSelector('input[id = "prof-cat-search-input"]')
    await page.type('input[id = "prof-cat-search-input"]',query);
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
                url: anchor.querySelector('a').href,
            });
        });
        return resultados;
    });

    console.log(listadoResultados);
    return listadoResultados;
    await browser.close();


}

const buscar = async (req, res, next) => {
  const { search } = req.body;

  try {
    const resultado = await getResultFromGoogle(search);
      
    // Enviar respuesta con el token
    res.status(200).json({ respuesta: 'ok', resultados: resultado });
  } catch (error) {
    console.log(error);
    res.status(500).json('Error interno del servidor1');
  }
};




export { buscar }