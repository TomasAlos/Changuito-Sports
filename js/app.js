
let articulosCarrito = []; 
const listaProductos = document.querySelector("#lista-productos") 
const contenedorCarrito = document.querySelector('#lista-carrito tbody') 
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito') 
const carrito = document.querySelector('#carrito'); 

document.addEventListener('DOMContentLoaded', ()=>{

    fetch('data/productos.json')
    .then((data)=>{
        //console.log(data)
        return data.json()
    })
    .then((productos)=>{
        console.log(productos)
        renderPruducts(productos)
    })
    .catch((err)=>{
        console.log(err)
    })

    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML()
})

function renderPruducts(productos){
    const contenido = document.querySelector('#lista-productos')

    let html = ""

    productos.forEach(producto=>{
        html += `
        <div class="four columns">    
        <div class="card">
                <img src="img/${producto.img}" alt="" class="imagen-producto u-full-width">
                <div class="info-card">
                    <h4>${producto.name}</h4>
                    <p>${producto.owner}</p>
                    <p class="precio">$${producto.price} <span class="u-pull-right ">$${producto.price_descount}</span></p>
                    <a href="#" class="u-full-width button input agregar-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
                </div>
            </div>  
            </div>          
        `
    });
    contenido.innerHTML = html
}

listaProductos.addEventListener('click', agregarProducto) 

carrito.addEventListener('click', eliminarProducto)

vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

function eliminarProducto(evt){ 
    evt.preventDefault(); 
    if(evt.target.classList.contains('borrar-producto')){ 
        const producto = evt.target.parentElement.parentElement; 
        const productoId = producto.querySelector('a').getAttribute('data-id'); 

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId) 
        carritoHTML();
    }
}

function agregarProducto(evt){ 
    evt.preventDefault()

    if(evt.target.classList.contains('agregar-carrito')) { 
        const producto = evt.target.parentElement.parentElement; 
        leerDatosProducto(producto) 
    }
}

function leerDatosProducto(producto){ 
    const infoProducto = {
        imagen: producto.querySelector('img').src, 
        titulo: producto.querySelector('h4').textContent, 
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    if(articulosCarrito.some( producto => producto.id === infoProducto.id)){ 
        const productos = articulosCarrito.map( producto => { 
            if(producto.id === infoProducto.id){ 
                let cantidad = parseInt(producto.cantidad); 
                cantidad +=1; 
                producto.cantidad = cantidad; 
                return producto 
            }else {
                return producto 
            }
        })
        articulosCarrito = productos.slice() 
    } else {
        articulosCarrito.push(infoProducto) 
    }
    carritoHTML()
}

function carritoHTML(){
    vaciarCarrito(); 
    articulosCarrito.forEach( producto => { 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100"/>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    })

sincronizarstorage()
}

function sincronizarstorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}


function vaciarCarrito(){ 
    while(contenedorCarrito.firstChild) { 
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
} 




