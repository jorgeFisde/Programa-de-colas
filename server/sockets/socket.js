const { TicketControl } = require('../../server/classes/ticket-control');
const { io } = require('../server');

let ticket = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticket.siguiente();

        console.log(`Siguiente ticket: ${ siguiente }`);
    
        callback(siguiente);

    });

    client.emit( 'estadoActual', {
        actual: ticket.getEstadoActual,
        ultimos4: ticket.getUltimos4
    });

    client.on( 'atenderTicket', ( data, callback ) => {

        if ( !data.escritorio ) {
            
            return {
                ok: false,
                err: {
                    message: `El escritorio es necesario`
                }
            }

        }

        let atenderTicket = ticket.atenderTicket( data.escritorio );

        callback( atenderTicket );

        client.broadcast.emit( 'ultimos4', {
            ultimos4: ticket.getUltimos4
        });

    });


});


