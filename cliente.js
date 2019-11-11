//console.log("Soy el archivo cliente.js");
const inquirer = require('inquirer');
const fs = require ('fs');

//Preguntas
//var fehca = new Date();
let preguntasDelivery =
[
	{
		type: 'confirm',
		name: 'paraDelivery',
		message: '¿La Pizza es para llevar?',
	},
	{
		type: 'input',
		name: 'direccionCliente',
		message: 'Ingresa tu dirección:',
		when: respuestas => {
            return respuestas.paraDelivery;
        },
		validate: rta => {
           if( rta.trim() == '' || rta.length < 4  ){
                return 'Ingrese una dirección valida';
           }
           
           else{
            return true;
           }
           
        }
	},
	{
		type: 'input',
		name: 'nombreCliente',
		message: 'Ingresa tu nombre:',
		validate: rtaDeEstaPregunta => {
            if (rtaDeEstaPregunta.length < 3 || rtaDeEstaPregunta.trim() == ''){
                 return 'Ingrese un nombre valido';
            }
            else {
                return true;
            }
        }
    },
	{
		type: 'input',
		name: 'telefonoCliente',
		message: 'Ingresa tu teléfono:',
		validate: rtaDeEstaPregunta => {
			if (rtaDeEstaPregunta.trim() == '') {
				return 'No puede estar vacío';
			} else if (rtaDeEstaPregunta.length < 8 || isNaN(rtaDeEstaPregunta)) {
				return 'Ingresá un número válido y mayor a 8 números';
			}
			return true;
		}
	},
	{
		type: 'list',
		name: 'gustoPizza',
		message: 'Elegí el gusto de la pizza:',
        choices: ['Muzza', 'Calabresa', 'Napo', 'Fugazzeta'],
        default: 'Muzza',
	},
	{
		type: 'list',
		name: 'tamanioPizza',
		message: 'Elegí el tamaño de la pizza:',
        choices: ['Personal', 'Mediana', 'Grande'],
        default: 'Grande'
	},
	{
		type: 'confirm',
		name: 'conBebida',
		message: '¿Quéres agregar una bebida?'
	},
	{
		type: 'list',
		name: 'gustoBebida',
		message: 'Elegí el gusto de la bebida:',
        choices: ['Coca-cola', 'Pepsi', 'Manaos'],
        default: 'Coca-cola',
		when: rtas => rtas.conBebida,
	},
	{
		type: 'confirm',
		name: 'clienteHabitual',
		message: '¿Sos cliente habitual?',
		default: false,
	},
	{
		type: 'checkbox',
		name: 'empanadas',
		message: '¿Que gusto de empanadas queres?',
		choices: ['Carne', 'Pollo', 'Jamón y queso', 'Zapallito', 'Verdura'],
		when: function (rtas) {
			return rtas.clienteHabitual === true;
		},
		validate: rta => {
			if (rta.length != 3) {
				return 'Elegí 3 empanadas';
			}
			return true;
		}
	},
];

inquirer
.prompt(preguntasDelivery)
.then(function(respuestas){
    let contenidoAgregado;
    let fecha = new Date();
    let fechaPedido = fecha.toLocaleDateString();
    let horaPedido = fecha.toLocaleTimeString();
    //console.log(respuestas);
    //Reporte del pedido para la/el cliente
    console.log('----------------------------------------------------------------------------------------');
    console.log(' ********************************   PIZZAS DH   ***************************************');    
    console.log('----------------------------------------------------------------------------------------');
    console.log('');
    console.log('=== Resumen de tu pedido ===');
    console.log('Tus datos son - Nombre: ' + respuestas.nombreCliente + ' / Teléfono: ' + respuestas.telefonoCliente );
    
    if(respuestas.paraDelivery){
        console.log('Tu pedido será entregado en: ' + respuestas.direccionCliente);        
    }
    else {
        console.log('Nos indicaste que pasarás a retirar tu pedido');
    }
    

    //Productos solicitados
    let totalProd = 0;
    console.log('');    
    console.log('=== Productos solicitados ===');
    console.log('Pizza:  ' + respuestas.gustoPizza);
    console.log('Tamaño: ' + respuestas.tamanioPizza);
    console.log('');
    
    if(respuestas.conBebida){
        console.log('Bebida: ' + respuestas.gustoBebida);
        console.log('');
       
        
    }
    if(respuestas.clienteHabitual){
        console.log('Tus tres empanadas de regalo serán de: ');
        console.log('Gusto empanada 1: ' + respuestas.empanadas[0]);
        console.log('Gusto empanada 2: ' + respuestas.empanadas[1]);
        console.log('Gusto empanada 3: ' + respuestas.empanadas[2]);
        console.log('');
               
    }

    //Calculos Precios
    let precio = 0;
    let totalDescuento = 0;
    let totalDelivery = 0;

    if (respuestas.paraDelivery){
        precio = precio + 20;
        totalDelivery = 20;
    }

    if(respuestas.conBebida){
        precio = precio + 80;
        totalProd = precio;
    }

    switch(respuestas.tamanioPizza){
        case 'Personal':
            if(precio >= 80){
                totalProd = totalProd + 430;
                precio = precio + 430 * 0.3;
                totalDescuento = 3;
            }            
            else{
                precio = precio + 430;
            }
            break;
        case 'Mediana':
            if(precio >= 80){
                totalProd = totalProd + 560;
                precio = precio + 560 * 0.5;
                totalDescuento = 5;
            }
            else{
                precio = precio + 560;
            }
            break;
        case 'Grande':
            if(precio >= 80){
                totalProd = totalProd + 650;
                precio = precio + 650 * 0.8;
                totalDescuento = 8;
            }
            else{
                precio = precio + 650;
            }
            break;
    }
    
    //Mostrando precios
    console.log('===============================');
    console.log('Total Productos: ' + totalProd);
    console.log('Total delivery: ' + totalDelivery);
    console.log('Descuentos: ' + totalDescuento + '%');
    console.log('Total: ' + precio);
    console.log('===============================');
    console.log('');
    console.log('Gracias por comprar en DH Pizzas. Esperamos que disfrutes tu pedido');
    console.log('');

    //Agragamos la info adicional al obj literal respuestas
    let infoAdcicional = {
        fecha: fechaPedido,
        hora: horaPedido,
        totalProductos: precio,
        descuento: totalDescuento
    }        

    respuestas = {
        ...respuestas,
        ...infoAdcicional
    }
    //console.log('\n\n\n');
   // console.log(respuestas);

   //Construcion del archivo json
   const RUTADELARCHIVO = __dirname + '/pedidos.json';
   
   //leo el archivo para saber si tiene datos
   let contenidoPedidos = fs.readFileSync(RUTADELARCHIVO, 'utf8');
   let arrayPedidos = contenidoPedidos.length == 0 ? [] : JSON.parse(contenidoPedidos);
   
  
   
   arrayPedidos.push(respuestas);
   fs.writeFileSync(RUTADELARCHIVO, JSON.stringify(arrayPedidos, null, ' ')); 

    
   
   /*
   // Leo el archivo para saber si tiene algo
	let infoArchivo = fs.readFileSync(rutaDelArchivo, 'utf8');

	let arrayPedidos = infoArchivo.length == 0 ? [] : JSON.parse(infoArchivo);

	// ¿como agregamos esto al objeto respuestas? con Spread Operator
	respuestas = {
		numeroPedido: arrayPedidos.length + 1,
		...respuestas,
		...dataAdicional,
	};

	arrayPedidos.push(respuestas);

	fs.writeFileSync(rutaDelArchivo, JSON.stringify(arrayPedidos, null, ' '));
   */ 
            
    
});