//VAriables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//Generar un object con la búsqueda
const datosBusqueda = {
    marca: '', 
    year: '', 
    minimo: '', 
    maximo: '', 
    puertas: '', 
    transmision: '', 
    color: '', 
}


//Events
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos( autos );

    //full years options
    fillSelect();
})

// event listener para los select de búsqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtradoAuto();
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtradoAuto();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtradoAuto();
    console.log( datosBusqueda )

})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtradoAuto();
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtradoAuto();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtradoAuto();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtradoAuto();


})



//Functions
function mostrarAutos( autos ) {
    cleanHTML();
    if( autos.length > 0) {
        return autos.forEach( auto => {
            const autoHTML = document.createElement('P');
            
            const { marca, modelo , year, precio, puertas, color, transmision } = auto;
    
            autoHTML.textContent = `
                ${ marca } ${ modelo } - ${ year } - ${ puertas } Puertas - Transmision: ${ transmision } - Precio: ${ precio } - Color: ${ color } 
            `;
    
            //insert in HTML
            resultado.appendChild( autoHTML );
        })
    }
    const noticeHTML = document.createElement('P');
    noticeHTML.classList.add('alerta', 'error')
    noticeHTML.textContent = ' No hay resultados'
    return resultado.appendChild(noticeHTML)
     
}

//limpiar HTML
function cleanHTML() {
    while( resultado.firstChild ) {
        resultado.removeChild(resultado.firstChild)
    }
}

//generate select years
function fillSelect() {

    for( let i = max; i >= min; i-- ) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild( opcion );
    }
    
}

//funcion que filtra en base a la búsqueda
function filtradoAuto() {
    const resultado = autos.filter( auto => 
        filterBrand(auto) && filterYear(auto) && filterMin(auto) && filterMax(auto)  && filterDoor(auto) && filterTransmition(auto) && filterColor(auto)
    )
    
    return mostrarAutos( resultado );
}


function filterBrand( auto ) {
    const  { marca } = datosBusqueda;
    return marca ? auto.marca === marca : auto;
}
function filterYear( auto ) {
    const  { year } = datosBusqueda;
    return year ? auto.year === year : auto;
}
function filterMin( auto ) {
    const  { minimo } = datosBusqueda;
    return minimo ? auto.precio >= minimo : auto;
}
function filterMax( auto ) {
    const  { maximo } = datosBusqueda;
    return maximo ? auto.precio <= maximo : auto;
}
function filterDoor( auto ) {
    const  { puertas } = datosBusqueda;
    return puertas ? auto.puertas === puertas : auto;
    
}
function filterTransmition( auto ) {
    const  { transmision } = datosBusqueda;
    return transmision ? auto.transmision === transmision : auto;
    
}
function filterColor( auto ) {
    const  { color } = datosBusqueda;
    return color ? auto.color === color : auto;

}