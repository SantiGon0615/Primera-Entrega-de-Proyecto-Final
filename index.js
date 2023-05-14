console.log("Anda")

const btnCart = document.querySelector('.conteiner-cart-icon')
const conteinerCartProductos = document.querySelector('.conteiner-cart-productos')

btnCart.addEventListener('click', () => {
    conteinerCartProductos.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-producto')
const RowProduct = document.querySelector('.row-producto')


const productList = document.querySelector('.conteiner-items')

let allProducts = [];


const valorTotal = document.querySelector('.total-pagar')

const countProductos = document.querySelector('#contador-productos')



productList.addEventListener ('click', e => {

    if(e.target.classList.contains('btn-add-cart')){
        const producto = e.target.parentElement


        const infoProducto = {
            quantity: 1,
            title: producto.querySelector('h2').textContent,
            price: producto.querySelector('p').textContent,
        };

        const existe = allProducts.some(producto => producto.title === infoProducto.title)
        
        if (existe){
            const productos = allProducts.map(producto => {
                if(producto.title === infoProducto.title){
                    producto.quantity++;
                    return producto
                }
                else{
                    return producto
                }
            })
            allProducts = [...productos]
        }else{
          allProducts = [...allProducts, infoProducto]  
        }

        

        showHTML()

    }

})


RowProduct.addEventListener('click', e => {
    if(e.target.classList.contains('icon-close')){
        const producto = e.target.parentElement
        const title = producto.querySelector('p').textContent

        allProducts = allProducts.filter(
            producto => producto.title !== title
            );

            console.log(allProducts)
            showHTML()

    }
})


//funcion para mostrar html
const showHTML = () => {


    if(!allProducts.length){
        conteinerCartProductos.innerHTML=`
        <p class="cart-empty"><carrito vacio</p>
        `
    }
//Limpiar html
RowProduct.innerHTML = '';

let total = 0;
let totalOfProductos = 0;

    allProducts.forEach(producto => {
        const conteinerProductos = document.createElement('div')
        conteinerProductos.classList.add('cart-producto')

        conteinerProductos.innerHTML = `
                    <div class="info-cart-producto">
                        <span class="cantidad-producto-carrito">${producto.quantity}</span>
                        <p class="titulo-producto-carrito">${producto.title}</p>
                        <span class="precio-carrito-producto">${producto.price}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
        `
        RowProduct.append(conteinerProductos);

        total = total + parseInt(producto.quantity * producto.price.slice(1));
        totalOfProductos = totalOfProductos + producto.quantity;

    })

    valorTotal.innerText = `$${total}`;
    countProductos.innerText = totalOfProductos;
}