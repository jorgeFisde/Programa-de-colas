const socket = io();


let searchParams = new URLSearchParams( window.location.search); 

if ( !searchParams.has('escritorio') ) {

    window.location = 'index.html';
    throw new Error(`El escritorio es necesario.`)

}

let escritorio = searchParams.get('escritorio');

$('h1').text(`Escritorio ${ escritorio }`);

$('button').on('click', function ( ) {

    socket.emit('atenderTicket', {escritorio}, function ( resp ) {

        if ( resp === `No hay tickets para atender.` ) {
            
            alert(resp);

            return;
        }

        $('small').text(resp.numero);

        console.log(resp);

    });

});



