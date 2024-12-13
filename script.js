const generateBtn = document.getElementById('generate-pdf');
const fotos = document.getElementById('fotos');
const urlsFotos = [];
let displayImpressao = false;

fotos.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
        let url = returnFotos(file)
        urlsFotos.push(url)
    });
})
const returnFotos = (fotos) =>{
    const fileURL = URL.createObjectURL(fotos);
    return fileURL;
}
generateBtn.addEventListener('click', () => {
    const form = document.getElementById('report-form')
    const formDataAll = document.querySelectorAll('#report-form .input');
    const campos = document.querySelector('#Impressão .campos');
    const imagensCampo = document.querySelector('#Impressão .imagens');
    const impressao = document.getElementById('Impressão')
    
    campos.innerHTML = '';
    imagensCampo.innerHTML = '';

    for (let i = 0; i < formDataAll.length; i++) {
        
        const e = formDataAll[i];
        console.log(e)
        if (e.value.trim() === '') {
            alert(`O campo ${e.name} está vazio!`);
            displayImpressao = false;
            break; // Interrompe o loop
        }
        
    
        if (e.name !== 'fotos') {
            campos.innerHTML += `
                <div class="conteudo-wrapper w50">
                    <div class="campo">${e.name}</div>
                    <div class="resposta">${e.value}</div>
                </div>
            `;
        }
        else if(e.name == 'fotos'){
        
            urlsFotos.forEach((image)=>{
                imagensCampo.innerHTML += `<img src="${image}" alt="logo" />`
            })
        }
        displayImpressao = true;
    }
    if(displayImpressao){
        impressao.style.display = 'block';
        savePDF(impressao)
    }else{
        impressao.style.display = 'none';
    }
})

async function savePDF(targetDiv){
    const options = {
        margin: 10,
        filename: 'arquivo.pdf',
        html2canvas: {
            scale: 5,  // Aumente a escala (padrão é 1)
            logging: true, // Ajuda no debug, pode remover depois
            useCORS: true, // Para usar imagens de domínios externos
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(targetDiv).save();
    
}
  