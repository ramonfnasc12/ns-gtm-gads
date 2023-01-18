//Adicionar em Configurações > Códigos Externos > Códigos de rastreamento > Para a Loja
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-XXXX', {
        allow_enhanced_conversions: true
    });
    var enhanced_conversion_data = {
        "email": '',
        "phone_number": '',
    };
</script>

<script type="text/javascript">
    setTimeout(function () {
        console.log("Remarketing + Enhanced Commerce code is loaded");
        //view_item
        //enhanced commerce + remarketing
        if (LS.template == "product") {
            console.log("view_item is under work");
            function g_gtagEvent(g_event) {
                gtag('event', g_event, {
                    'currency': LS.currency.code,
                    'value': LS.variants[0].price_number,
                    'items': [
                        {
                            'id': LS.variants[0].id,
                            'item_id': LS.variants[0].id,
                            'item_name': LS.product.name,
                            'currency': LS.currency.code,
                            'price': LS.variants[0].price_number,
                            'google_business_vertical': 'retail',
                            'quantity': 1, //inserir seletor da caixa de quantidade (se não existir, insira o numero 1)
                        }
                    ]
                });
            }
            g_gtagEvent('view_item')

            //add_to_cart
            //enhanced commerce + remarketing
            document.addEventListener('click', function (e) {
                for (i = 0; i < e.path.length; i++) {
                    if (e.path[i].value) {
                        if (e.path[i].value == "Comprar") {
                            console.log('add_to_cart has been clicked');
                            g_gtagEvent('add_to_cart')
                        }
                    }
                }
            });
        }
    }, 3000)
</script>

//Adicionar em Configurações > Códigos Externos > Códigos de rastreamento > Para o Checkout
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-XXXX', {
        allow_enhanced_conversions: true
    });
    var enhanced_conversion_data = {
        "email": '',
        "phone_number": '',
    };
</script>

<script type="text/javascript">
    setTimeout(function () {
        //begin_checkout
        //enhanced commerce
        if (window.location.href.includes('/checkout/')) {
            //g_checkout_items
            var g_checkout_items = [];
            for (i = 0; i < LS.cart.items.length; i++) {
                g_checkout_items.push({
                    'id': LS.cart.items[i].id,
                    'item_id': LS.cart.items[i].id,
                    'item_name': LS.cart.items[i].name,
                    'currency': LS.currency,
                    'price': Number((LS.cart.items[i].unit_price / 100).toFixed(2)),
                    'quantity': LS.cart.items[i].quantity,
                    'google_business_vertical': 'retail'
                });
            }
            if (window.location.href.includes('/checkout/v3/start/')) {
                console.log('begin_checkout has been started');
                gtag('event', 'begin_checkout', {
                    'currency': LS.currency,
                    'value': Number((LS.cart.subtotal / 100).toFixed(2)),
                    'items': g_checkout_items
                });
            }

            //add_payment_info
            if (window.location.href.includes('/checkout/v3/next/')) {
                console.log('add_payment_info has been started');
                gtag("event", "add_payment_info", {
                    'currency': LS.currency,
                    'value': Number((LS.cart.subtotal / 100).toFixed(2)),
                    'items': g_checkout_items
                });
            }
        }
    }, 3000)
</script>

//Adicionar em Configurações > Códigos Externos > Outros códigos de Conversão > Códigos de conversão para a página de
finalização de compra
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-XXXX', {
        allow_enhanced_conversions: true
    });
    var enhanced_conversion_data = {
        "email": '',
        "phone_number": '',
    };
</script>

<script>
    setTimeout(function () {
        console.log("Remarketing + Enhanced Commerce code is loaded");
        //purchase
        //enhanced commerce + remarketing
        if (window.location.href.includes('/checkout/')) {
            var g_checkout_items = [];
            for (i = 0; i < LS.cart.items.length; i++) {
                g_checkout_items.push({
                    'id': LS.cart.items[i].id,
                    'item_id': LS.cart.items[i].id,
                    'item_name': LS.cart.items[i].name,
                    'currency': LS.currency,
                    'price': Number((LS.cart.items[i].unit_price / 100).toFixed(2)),
                    'quantity': LS.cart.items[i].quantity,
                    'google_business_vertical': 'retail'
                });
            }
            if (window.location.href.includes('/checkout/v3/success')) {
                console.log('Compra realizada');
                gtag('event', 'purchase', {
                    'coupon': LS.order.coupon,
                    'currency': LS.currency,
                    'items': g_checkout_items,
                    'transaction_id': LS.order.id,
                    'value': Number(LS.order.total / 100).toFixed(2),
                });
            }
        }
    }, 3000)
</script>

<script>
    if (window.location.href.includes('success')) {
        if (LS.order) {
            enhanced_conversion_data.email = LS.cart.contact.email
            enhanced_conversion_data.phone_number = LS.cart.contact.phone
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXX/XXXXX',
                'value': (LS.cart.subtotal / 100),
                'currency': 'BRL',
                'transaction_id': LS.order.number
            });
        }
    }
</script>
