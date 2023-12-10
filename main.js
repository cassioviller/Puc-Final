function encrypt(alpha, betha) {
    return btoa(alpha + betha);
}

// Estrutura de Dados dos Produtos
const products = [
    {
        id: "insalata-caprese",
        name: "Insalata Caprese",
        price: 9.99,
        image: "assets/images/dish/1.png",
        calories: 300,
        type: "Vegetariano",
        servingSize: 1
    },
    {
        id: "spaghetti-carbonara",
        name: "Spaghetti Carbonara",
        price: 12.99,
        image: "assets/images/dish/2.png",
        calories: 500,
        type: "Não Veg",
        servingSize: 1
    },
    {
        id: "scaloppine-milanese",
        name: "Scaloppine alla Milanese",
        price: 15.99,
        image: "assets/images/dish/3.png",
        calories: 450,
        type: "Não Veg",
        servingSize: 1
    },
    {
        id: "risotto-funghi",
        name: "Risotto ai Funghi",
        price: 13.50,
        image: "assets/images/dish/4.png",
        calories: 350,
        type: "Vegetariano",
        servingSize: 1
    },
    {
        id: "branzino-grigliato",
        name: "Branzino Grigliato",
        price: 18.99,
        image: "assets/images/dish/5.png",
        calories: 300,
        type: "Não Veg",
        servingSize: 1
    },
    {
        id: "tiramisu",
        name: "Tiramisù",
        price: 89.99,
        image: "assets/images/dish/6.png",
        calories: 420,
        type: "Vegetarsiano",
        servingSize: "1-2"
    }
];

class DatabaseConnection {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || []
        this.orders = JSON.parse(localStorage.getItem('orders')) || []
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
    }

    addUser(email, password, name) {
        this.users.push({
            email: email,
            password: encrypt(email, password),
            name: name,
        })

        localStorage.setItem('users', JSON.stringify(this.users))
    }


    addOrder(total, address, paymentMethod) {
        this.orders.push({
            userEmail: this.currentUser.email,
            cart: this.cart,
            total: total,
            address: address,
            paymentMethod: paymentMethod,
        })

        localStorage.setItem('orders', JSON.stringify(this.orders))
    }

    addCartItem(productId, quantity, price, image) {
        var existing = false;
        this.cart.forEach(item => {
            if (item.id === productId) {
                existing = true;
                item.quantity += quantity;
                return;
            }
        });

        if(!existing) {
            this.cart.push({
                id: productId,
                quantity: quantity, 
                price: price,
                image: image
            });
        }

        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    removeCart() {
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    setCurrentUser(email, validUntil) {
        this.currentUser = {
            email: email,
            validUntil: validUntil
        }

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    removeCurrentUser() {
        this.currentUser = null

        localStorage.removeItem('currentUser')
    }

    findUser(email) {
        return this.users.find(user => user.email === email)
    }

    currentUserInfo() {
        return this.findUser(this.currentUser?.email)
    }

    userOrders(email) {
        return this.orders.filter(order => order.userEmail === email)
    }
}

const databaseConnection = new DatabaseConnection();

$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

document.querySelector('.header-cart').addEventListener('click', function() {
    var cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
});

// Função para adicionar ao carrinho
function addToCart(productId, productPrice, productImage) {
    databaseConnection.addCartItem(productId, 1, productPrice, productImage);
    updateCartUI();
}

// Event listener para botões de adicionar ao carrinho
document.querySelectorAll('.dish-add-btn').forEach(button => {
    button.addEventListener('click', function() {
        var productId = this.getAttribute('data-id');
        var productPrice = parseFloat(this.getAttribute('data-price').replace(",", "."));
        console.log(productPrice);
        console.log(productPrice);
        var productImage = this.getAttribute('data-image');
        addToCart(productId, productPrice, productImage);
    });
});

// Função para atualizar a quantidade de um item no carrinho
function updateItemQuantity(productId, newQuantity) {
    var item = databaseConnection.cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
    } else if (item && newQuantity <= 0) {
        removeFromCart(productId);
    }
    updateCartUI();
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
    var index = databaseConnection.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        databaseConnection.cart.splice(index, 1);
    }
    updateCartUI();
}

// Função para calcular o total do carrinho
function calculateCartTotal() {
    var total = databaseConnection.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.toFixed(2);
}

// Função para renderizar os itens do carrinho no modal
function renderCartItems(selector = '#cartModal .modal-body') {
    var cartItemsContainer = document.querySelector(selector);
    cartItemsContainer.innerHTML = '';

    databaseConnection.cart.forEach(item => {
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.id}" style="width: 50px; height: 50px;">
            <p>${item.id} - R$ ${item.price}</p>
            <span>Quantidade: ${item.quantity}</span>
        `;

        var decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.className = 'quantity-btn decrease';
        decreaseButton.addEventListener('click', function() {
            updateItemQuantity(item.id, item.quantity - 1);
        });
        itemElement.appendChild(decreaseButton);

        var increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.className = 'quantity-btn increase';
        increaseButton.addEventListener('click', function() {
            updateItemQuantity(item.id, item.quantity + 1);
        });
        itemElement.appendChild(increaseButton);

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', function() {
            removeFromCart(item.id);
        });
        itemElement.appendChild(removeButton);

        cartItemsContainer.appendChild(itemElement);
    });

    var totalElement = document.createElement('div');
    totalElement.className = 'total';
    totalElement.textContent = `Total: R$ ${calculateCartTotal()}`;
    cartItemsContainer.appendChild(totalElement);
}

// Função para atualizar a interface do usuário do carrinho
function updateCartUI() {
    var totalItems = databaseConnection.cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-number').textContent = totalItems;
    renderCartItems();

    var checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.disabled = databaseConnection.cart.length === 0;
}

document.getElementById('checkoutButton').addEventListener('click', function() {
    if (databaseConnection.cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        checkLogin('checkout.html');
    }
});

// Função para cadastrar um novo usuário
function register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var name = document.getElementById('name').value;

    if (password !== confirmPassword) {
        alert('As senhas não conferem!');
        return;
    }

    databaseUser = databaseConnection.findUser(email);
    if (databaseUser) {
        alert('Já existe um usuário cadastrado com esse e-mail!');
        return;
    }

    databaseConnection.setCurrentUser(email, new Date().getTime() + 3000000);

    databaseConnection.addUser(email, password, name);

    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'index.html';
}

// Função para fazer login
function login() {
    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    var user = databaseConnection.findUser(email);

    if (!user) {
        alert('Usuário ou senha incorretos!');
        return;
    }

    var validPassword = password && encrypt(email, password) === user.password;

    if (user && validPassword) {
        databaseConnection.setCurrentUser(email, new Date().getTime() + 3000000);

        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

// Função para verificar se o usuário está logado
function checkLogin(goToPage = "user.html") {
    var currentUser = databaseConnection.currentUser;
    if (!currentUser) {
        window.location.href = 'login_or_register.html';
        return;
    }

    var validUntil = currentUser.validUntil;
    if (validUntil < new Date().getTime()) {
        databaseConnection.removeCurrentUser();

        alert('Sessão expirada! Faça login novamente.');
        window.location.href = 'login_or_register.html';
        return;
    }

    window.location.href = goToPage;
}

// Função para fazer logout
function logout() {
    databaseConnection.removeCurrentUser();
    databaseConnection.removeCart();

    window.location.href = 'index.html';
}

function makeOrder() {
    var total = calculateCartTotal();
    var address = document.getElementById('address').value;
    var payment = document.getElementById('payment').value;

    if(!address) {
        alert('Informe o endereço de entrega!');
        return;
    }

    if(payment === 'INVALID') {
        alert('Selecione um método de pagamento válido!');
        return;
    }

    databaseConnection.addOrder(total, address, payment);
    databaseConnection.removeCart();

    alert('Pedido realizado com sucesso!');
    window.location.href = 'user.html';
}

function loadUserInfo() {
    var currentUser = databaseConnection.currentUserInfo();
    
    document.getElementById('name').textContent = currentUser.name;
    document.getElementById('email').textContent = currentUser.email;
    
    var orders = databaseConnection.userOrders(currentUser.email);

    var ordersContainer = document.querySelector('#orders');

    orders.forEach(item => {
        cartItems = item.cart.map(cartItem => {
            return `- ${cartItem.id} - ${cartItem.quantity}x`;
        }).join('<br>');

        var itemElement = document.createElement('tr');
        itemElement.innerHTML = `
            <td style="text-align: left !important">${cartItems}</td>
            <td>${item.address}</td>
            <td>${item.paymentMethod}</td>
            <td>R\$ ${item.total}</td>
        `;

        ordersContainer.appendChild(itemElement);
    });
}

function loadCheckoutInfo() {
    var currentUser = databaseConnection.currentUserInfo();

    if(!currentUser) {
        window.location.href = 'login_or_register.html';
        return;
    }
    
    var cart = databaseConnection.cart;
    if(cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    var cartItemsContainer = document.querySelector("#cart");
    cartItemsContainer.innerHTML = '';

    databaseConnection.cart.forEach(item => {
        var itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
        <li class="list-group-item d-flex justify-content-between lh-sm align-middle">
            <img src="${item.image}" alt="${item.id}" style="width: 50px; height: 50px; margin: 16px">
            <span style="margin-top: 32px; font-weight: bold">${item.id}</span>
            <span style="margin-top: 32px">Quantidade: ${item.quantity}</span>
            <span style="margin-top: 32px; margin-right: 16px;">Preço: ${item.price}</span>

        </li>
        `;

        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total').textContent = `R$ ${calculateCartTotal()}`;
}

updateCartUI()
