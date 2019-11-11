const fs = require ('fs');
var fecha = new Date();
let fechaRepo = fecha.toLocaleDateString();
let horaRepo = fecha.toLocaleTimeString();


//Construcion del archivo json
   const RUTADELARCHIVO = __dirname + '/pedidos.json';
   
   //leo el archivo para saber si tiene datos
   let pedidos = fs.readFileSync(RUTADELARCHIVO, 'utf8');
   let arrayPedidos = pedidos.length == 0 ? [] : JSON.parse(pedidos);
   
   if (arrayPedidos.length == 0){
       console.log ("Actualmente el sistema no tiene pedidos para generar el reporte");
   }
   else{
       console.log ("¡Reporte generado con éxito!");
       console.log (" ");
       console.log ("|===*** Reporte de ventas ***====|");
       console.log("Fecha de generación: " + fechaRepo);
       console.log ("Hora: " + horaRepo);
       console.log(" ");
       console.log("|===*** Cantidad de pedidos realizados ***====|");
       console.log("Total: " + arrayPedidos.length);
       console.log("|===*** Cantidad de pedidos para delivery ***====|");
       let delivery = () => arrayPedidos.filter(pedido => pedido.paraDelivery == true).length;
       console.log("Total: " + delivery);
       let filtrarPorGusto = gusto => arrayPedidos.filter(pedido => pedido.gustoPizza == gusto).length;
	   let gustoMuzzarela = filtrarPorGusto('Muzza');
	   let gustoCalabresa = filtrarPorGusto('Calabresa');
       let gustoNapolitana = filtrarPorGusto('Napo');
       let gustoFugazzeta = filtrarPorGusto('Fugazzeta');       
       console.log("|===*** Cantidad de pizzas vendidas por gusto ***====|");
       console.log("Total Muzzarella: " + gustoMuzzarela);
       console.log("Total Calabresa: " + gustoCalabresa);
       console.log("Total Napoliotana: " + gustoNapolitana);
       console.log("Total Fugazzeta: " + gustoFugazzeta); 
       console.log("|===*** Cantidad de pizzas vendidas por tamaño ***====|");
       let filtrarPorTam = gusto => arrayPedidos.filter(pedido => pedido.tamanioPizza == gusto).length;
       let grande = filtrarPorTam('Grande');
	   let personal = filtrarPorTam('Personal');
	   let mediana = filtrarPorTam('Mediana');
       console.log("Total Personal: " + personal);
       console.log("Total Mediana: " + mediana);
       console.log("Total Grande: " + grande);
       console.log("|===*** Cantidad de pedidos con bebida ***====|");
       let bebida = () => arrayPedidos.filter(pedido => pedido.conBebida == true).length;
       console.log("Total: " + bebida());
       console.log("|===*** Cantidad de clientes habituales ***====|");
       let habitue = () => arrayPedidos.filter(pedido => pedido.clienteHabitual== true).length;
       console.log("Total: " + habitue());
       console.log("|===*** Cantidad de empanadas regaladas ***====|");
       console.log("Total: " + habitue()*3);
       
   }    