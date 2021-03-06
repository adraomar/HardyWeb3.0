let carritoDeCompras = new Array();
let stock = new Array();
let seleccionados = 0;

const contenedorProductos = document.getElementById("contenedor-productos");

function mostrarProductos() {
    fetch('https://dummyjson.com/products').then(response => response.json()).then(prod => {
        stock = prod;
        renderProductos(prod);
    });
}

function renderProductos(stockProductos) {
    stockProductos.products.forEach(el => {
        let div = document.createElement('div');
        div.className = 'card mb-3';
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${el.images[2]}" class="img-fluid rounded-start" style="width: 13rem;" alt="...">
             </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${el.title}</h5>
                    <p class="card-text">Precio: $ ${el.price.toLocaleString('de-DE')}</p>
                    <button id="boton${el.id}" type="button" class="btn btn-success"><i class="bi bi-cart-plus-fill"></i> Agregar al carrito</button>
                </div>
            </div>
        </div>`;

        contenedorProductos.appendChild(div);

        let btnAgregar = document.getElementById(`boton${el.id}`);
        btnAgregar.addEventListener('click', () => {

            Swal.fire({
                title: '¿Desea agregar este producto al carrito?',
                text: "",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Agregar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(`${el.id}`);
                    Swal.fire({
                        title: '¡Correcto!',
                        text: "Producto agregado correctamente.",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    })
                    agregarAlCarrito(el.id);
                    actualizarSeleccionados();
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                        title: '¡Cancelado!',
                        text: "Este producto no se ha agregado al carrito.",
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar'
                    })
                }
            })
        });
    });
}

// Carrito System
function agregarAlCarrito(id) {
    let productoAgregar = stock.products.find(item => item.id === id)
    console.log("Se ha agregado un producto al carrito.");
    carritoDeCompras.push(productoAgregar);
    localStorage.setItem("CarritoDeCompras", JSON.stringify(carritoDeCompras));
    actualizarSeleccionados();
}

function actualizarSeleccionados() {
    let carrito = JSON.parse(localStorage.getItem("CarritoDeCompras"));
    let contador = 0;

    if(carrito != null) {
        carrito.forEach(producto => {
            contador++;
        });
    } else {
        contador = 0;
    }

    let span = document.getElementById('contador-carrito');
    span.innerText = contador;
}

function cargarElementos() {
    actualizarSeleccionados();
    mostrarProductos();
    estadoUsuario();
}

function sitioEnConstruccion() {
    Swal.fire('Esta sección se encuentra en construcción no puedes acceder momentaneamente.');
}