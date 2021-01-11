const socket = io();

let label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on( 'estadoActual', function(resp){

    label.text(resp.actual);

});


$('button').on('click', function () {
    console.log('Hice click con jquery');

    socket.emit('siguienteTicket', null, (siguiente) => {

        label.text(siguiente);

    })


})