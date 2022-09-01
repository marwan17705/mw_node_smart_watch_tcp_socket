
const Net = require('net');
const EventEmitter = require('events');
const APXX_format = require('./submodule/APXX_format')
// The port on which the server is listening.
// const port = 8080;

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
// server = new Net.Server();

//flow connection ต้องเช็คในฐาน ข้อมูล
var APXX = new APXX_format();


class mw_health_bracelet extends EventEmitter {

    // var list_client = [];
    constructor(port) {
        super();

        this.server = new Net.Server();
        // this.eventEmitter = new EventEmitter();
        this.server.listen(port, function () {
            var ip_server = this.server ? this.server.address() : "server";
            console.log(`Server listening for connection requests on socket ${ip_server}:${port}`);
        });
        var client_list_info = []

        this.server.on('connection', (socket) => this.tcp_scoket_server(socket, client_list_info));
    }

    get_client_list() {
        return client_list_info;
    };
    async tcp_scoket_server(socket, client_list_info) {
        var ip = socket.remoteAddress;
        var port = socket.remotePort;
        var self = this;

        client_list_info.push(
            {
                remote_client: socket,
                IMEI: "",
            }
        );
        // console.log("tcp_scoket_server");

        // get_client_list;
        self.wait_IMEI(5000, ip, port, client_list_info)

        socket.on('data', async function (chunk) {

            // console.log('Data received from client: \n' + chunk.toString());
            var raw_payload = chunk.toString();
            raw_payload = raw_payload.slice(0, -1)
            var type = raw_payload.substring(2, 6);
            // console.log(type);
            switch (type) {
                case "AP00":
                    self.AP00_process(raw_payload, socket, client_list_info);
                    break;
                case "AP01":
                    var data_formated = await APXX.C2json_AP01(raw_payload);
                    self.emit("data", { type: type, payload: data_formated});                    
                    self.tcp_reply(type, socket);
                    break;

                case "AP03":
                    var data_formated = await APXX.C2json_AP03(raw_payload);
                    self.emit("data", { type: type, payload: data_formated});                    
                    self.tcp_reply(type, socket);
                    break;

                case "AP10":
                    var data_formated = await APXX.C2json_AP10(raw_payload);
                    self.emit("data", { type: type, payload: data_formated});                    
                    self.tcp_reply_AP10(type, socket);
                    break;

                case "AP50":
                    var data_formated = await APXX.C2json_AP50(raw_payload);
                    self.emit("data", { type: type, payload: data_formated});                    
                    self.tcp_reply(type, socket);
                    break;

                case "APHP":
                    var data_formated = await APXX.C2json_APHP(raw_payload);
                    self.emit("data", { type: type, payload: data_formated});                    
                    self.tcp_reply(type, socket);
                    break;

                case "APHT":
                    var data_formated = await APXX.C2json_APHT(raw_payload);
                    self.emit("data", { type: type, payload: data_formated});                    
                    self.tcp_reply(type, socket);
                    break;
                    
                default:
                    // var data_formated = location_update_to_json(array_payload);
                    // var callback_data = data_to_callback(array_header);                   
                    // console.log("---->  other");
                    break;
            }



            // console.log(data_formated);
        });
        socket.on('end', function () {
            console.log('Closing connection with the client');
        });

        socket.on('close', async function () {
            var objIndex = await client_list_info.findIndex(x => (x.remote_client.remoteAddress === socket.remoteAddress
                && x.remote_client.remotePort === socket.remotePort));
            // var result_port = client_list_info.filter(x => x.socket.remotePort === port);
            if (objIndex != -1)
            {
                if (client_list_info[objIndex].IMEI !== "") {
                    //emit disconnect
                    self.emit("disconnect", { type: "disconnect", IMEI: client_list_info[objIndex].IMEI });
                    // 
                    console.log("disconnection by client");
                }
                client_list_info.splice(objIndex, 1);
            }
            console.log(`${socket.remoteAddress}:${socket.remotePort} Connection closed`);

        });
        // Don't forget to catch error, for your own sake.
        socket.on('error', function (err) {
            console.log(`Error: ${err}`);
        });
    }
    // wait(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    async wait_IMEI(ms, ip, port, client_list_info) {
        await new Promise(resolve => setTimeout(resolve, ms));
        var objIndex = client_list_info.findIndex(x => (x.remote_client.remoteAddress === ip
            && x.remote_client.remotePort === port));
        // console.log(objIndex);
        if (objIndex != -1)
            if (client_list_info[objIndex].IMEI == "") {
                client_list_info[objIndex].remote_client.destroy()
                // console.log("disconncetion " + ip + ':' + port );
                // client_list_info.splice(objIndex,1);
            }
        // console.log(client_list_info)
        // else
        // {
        //     console.log("conncetion success" + ip + ':' + port );
        // }

    }

    async AP00_process(raw_payload, socket, client_list_info) {
        // var get_socket = client_list_info.filter(x => (x.remote_client.remoteAddress === socket.remoteAddress
        //     &&x.remote_client.remotePort === socket.remotePort ));
        var self = this;
        var data_formated = await APXX.C2json_AP00(raw_payload);
        var objIndex = await client_list_info.findIndex(x => (x.remote_client.remoteAddress === socket.remoteAddress
            && x.remote_client.remotePort === socket.remotePort));
        // console.log(objIndex);

        if (objIndex != -1)
            client_list_info[objIndex].IMEI = data_formated.IMEI;
        else
            console.log("not have socket");
        // var callback_data = data_to_callback(array_header);

        // console.log(JSON.stringify(data_formated));
        await socket.write(JSON.stringify(data_formated));
        //emit connect data_formated
        self.emit("connect", { type: "connect", IMEI: data_formated.IMEI });
    }

    async tcp_reply(type,socket)
    {
        var response = "IWBP" + type.slice(2,4);
        await socket.write(response);
        return response ;
    }

    async tcp_reply_AP10(type,socket)
    {

        var unicode_raw = "0e2d0e320e040e320e230e270e340e080e310e220e270e340e280e270e010e230e230e210e1b0e230e300e220e380e010e150e4c\
        0e2a0e340e230e340e190e180e23000a00680074007400700073003a002f002f007700770077002e0067006f006f0067006c0065002e0063006f006d002\
        f006d006100700073002f0070006c006100630065002f0e2d0e320e040e320e230e270e340e080e310e220e270e340e280e270e010e230e230e210e1b0e\
        230e300e220e380e010e150e4c0e2a0e340e230e340e190e180e23002f00400037002e0030003000360032003000390039002c003100300030002e00350\
        03000320032003800340032002c00320030007a";
        var response = "IWBP" + type.slice(2,4) + unicode_raw +'#';
        await socket.write(response);
        return response ;
    }

};



module.exports = mw_health_bracelet;


/**
 * socket
 * remote_id
 * device_id
 * 
 */