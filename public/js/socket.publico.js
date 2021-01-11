const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');


const lblTickets     = [ lblTicket1, lblTicket2, lblTicket3, lblTicket4 ];
const lblEscritorios = [ lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4 ];

socket.on( 'estadoActual', function( data ){

    console.log(data);
    actualizarHtml(data.ultimos4);

});

socket.on('ultimos4', function(data){
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHtml(data.ultimos4)

});


function actualizarHtml(ultimos4) {
    let cont = 0;
    for (const ultimo of ultimos4) {
        
        lblTickets[cont].text('Ticket: ' + ultimo.numero);
        lblEscritorios[cont].text('Escritorio: ' + ultimo.escritorio);

        cont++;
    }

}



