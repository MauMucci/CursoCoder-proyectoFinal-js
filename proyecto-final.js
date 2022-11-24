let shop_content = document.getElementById("shop-content");
let ver_carrito = document.getElementById("ver-carrito");
let modal_div = document.getElementById("modal-div");


//cargo lo que esta en el LS ó un carrito vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


//Le creo un div a cada elemento
productos.forEach((product) => {
    //creo cada card para cada producto en html
    let card_elemento = document.createElement("div"); 
    card_elemento.className = "card"; 
    card_elemento.innerHTML = `
    <img src ="${product.img}">
    <h3> ${product.nombre}</h3>
    <p class ="precio" >${product.precio}</p>
    `
    ;

    shop_content.append(card_elemento); //shop_content es el padre del card 

    //agrego el boton "comprar" a cada card
    let boton_comprar = document.createElement("button")
    boton_comprar.innerText = "COMPRAR";

    card_elemento.append(boton_comprar);

    //en cada click en el boton "comprar", se agrega al carrito
    boton_comprar.addEventListener("click",() => {
        carrito.push({
            id: product.id,
            img:product.img,
            nombre:product.nombre,
            precio:product.precio
        });
        guardar_LS();
        Toastify({
            text: "Producto agregado al carrito",
            duration:1000,
            className: "info",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast();
    })
});

let refrescar_carrito= () =>{

    modal_div.innerHTML =""; //de esta forma limpio, si no estuviera esto, cargaria el carrito cada vez que lo abrimos
    modal_div.style.display = "flex"; //para hacer visible el carrito
    let modal_header = document.createElement("div");
    modal_header.className = "modal-header"
    modal_header.innerHTML = `
    <h1 class="modal-header-title"> Carrito de compras</h1>
     `;

     modal_div.append(modal_header);

     

     //agrego el boton para cerrar el carrito
     let modal_button = document.createElement("button");
     modal_button.innerText="❌";
     modal_button.className = "modal-header-button";

    //para que cierre el modal cuando se presione en X
    modal_button.addEventListener("click",() =>{
        modal_div.style.display ="none";
    })

    modal_header.append(modal_button);

    //contenido_carrito genera en html la informacio visual de cada elemento del carrito
    carrito.forEach((product)  => {
        let contenido_carrito = document.createElement("div")
        contenido_carrito.className="contenido-carrito"
        contenido_carrito.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}></h3>
        <p>${product.precio} </p>

        `;
        modal_div.append(contenido_carrito);

        //creo el boton borrar
     let boton_borrar = document.createElement("button");
     boton_borrar.className = "boton-borrar";
     boton_borrar.innerText="BORRAR";
     modal_div.append(boton_borrar);

     boton_borrar.addEventListener("click",() => {eliminar_producto(product.id) });
    });
    
    //calculo el monto total
    let total = carrito.reduce((acc,el) => acc + el.precio,0);
    let compra_total = document.createElement("div")
    compra_total.className="compra-total"
    compra_total.innerHTML = `Total a pagar: $ ${total}`;
    modal_div.append(compra_total);
    console.log("carrito",total);
};

ver_carrito.addEventListener("click",refrescar_carrito);
//le doy funcionalidad al boton_borrar
let eliminar_producto = (id) => {
    let buscar_id = carrito.find((element) => element.id==id);
    carrito = carrito.filter((carrito_filtrado) => {
        return carrito_filtrado !== buscar_id;
    });
    refrescar_carrito();
    guardar_LS();

    };


//Local Storage
let guardar_LS = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

