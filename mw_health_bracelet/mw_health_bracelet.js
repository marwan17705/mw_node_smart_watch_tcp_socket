
const Net = require('net');
const EventEmitter = require('events');
const APXX_format = require('./submodule/APXX_format')


//IWAP00353456789012345
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
        this.client_list_info = []

        this.server.on('connection', (socket) => this.tcp_scoket_server(socket, this.client_list_info));
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
                    var raw_IMEI = await self.AP00_process(raw_payload, socket, client_list_info);
                    await self.tcp_reply_AP00(socket)


                    break;
                case "AP01":
                    var data_formated = await APXX.C2json_AP01(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit("data", { type: type, payload: data_formated, IMEI: client_list_info[client_index].IMEI });
                    await self.tcp_reply(type, socket);

                    break;
                case "AP02": //test
                    // var processHubPromise =self.start_monitor_heartrate(raw_IMEI);
                    // processHubPromise.then(function(result) {
                    //     console.log(result)
                    //     console.log("wait1234")

                    //   // do something with 'result' when complete
                    // });
                    console.log(await self.start_monitor_heartrate("123456"))

                    break;
                case "AP03":
                    var data_formated = await APXX.C2json_AP03(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit("data", { type: type, payload: data_formated, IMEI: client_list_info[client_index].IMEI });
                    await self.tcp_reply(type, socket);
                    break;

                case "AP10":
                    var data_formated = await APXX.C2json_AP10(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit("data", { type: type, payload: data_formated, IMEI: client_list_info[client_index].IMEI });
                    await self.tcp_reply_AP10(type, socket);
                    break;

                case "AP50":
                    var data_formated = await APXX.C2json_AP50(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit("data", { type: type, payload: data_formated, IMEI: client_list_info[client_index].IMEI });
                    await self.tcp_reply(type, socket);
                    break;

                case "APHP":
                    var data_formated = await APXX.C2json_APHP(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit("data", { type: type, payload: data_formated, IMEI: client_list_info[client_index].IMEI });
                    await self.tcp_reply(type, socket);
                    break;

                case "APHT":
                    var data_formated = await APXX.C2json_APHT(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit("data", { type: type, payload: data_formated, IMEI: client_list_info[client_index].IMEI });
                    await self.tcp_reply(type, socket);
                    break;

                case "APXL":
                    var data_formated = await APXX.C2json_APXL(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit(data_formated.journal_no, { type: type, payload: data_formated, socket_index: client_index });
                    break;
                case "APXZ":
                    var data_formated = await APXX.C2json_APXZ(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit(data_formated.journal_no, { type: type, payload: data_formated, socket_index: client_index });
                    break;
                case "APXT":
                    var data_formated = await APXX.C2json_APXT(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit(data_formated.journal_no, { type: type, payload: data_formated, socket_index: client_index });
                    break;
                case "AP12":
                    var data_formated = await APXX.C2json_AP12(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit(data_formated.journal_no, { type: type, payload: data_formated, socket_index: client_index });
                    break;
                case "AP14":
                    var data_formated = await APXX.C2json_AP14(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit(data_formated.journal_no, { type: type, payload: data_formated, socket_index: client_index });
                    break;
                case "AP33":
                    var data_formated = await APXX.C2json_AP33(raw_payload);
                    var client_index = await self.find_socket_index(socket);
                    if (client_index === -1)
                        break;
                    await self.emit(data_formated.journal_no, { type: type, payload: data_formated, socket_index: client_index });
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
            if (objIndex != -1) {
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

    async AP00_process(raw_payload, socket /*, client_list_info*/) {
        // var get_socket = client_list_info.filter(x => (x.remote_client.remoteAddress === socket.remoteAddress
        //     &&x.remote_client.remotePort === socket.remotePort ));
        var self = this;
        var data_formated = await APXX.C2json_AP00(raw_payload);
        var objIndex = await this.client_list_info.findIndex(x => (x.remote_client.remoteAddress === socket.remoteAddress
            && x.remote_client.remotePort === socket.remotePort));
        // console.log(objIndex);

        if (objIndex != -1)
            this.client_list_info[objIndex].IMEI = data_formated.IMEI;
        else
            console.log("not have socket");
        // var callback_data = data_to_callback(array_header);

        // console.log(JSON.stringify(data_formated));
        // await socket.write(JSON.stringify(data_formated));
        //emit connect data_formated
        self.emit("connect", { type: "connect", IMEI: data_formated.IMEI });
        return data_formated.IMEI;
    }

    async tcp_reply(type, socket) {
        var response = "IWBP" + type.slice(2, 4) + '#';
        await socket.write(response);
        return response;
    }

    async tcp_reply_AP10(type, socket) {

        var unicode_raw = "0e2d0e320e040e320e230e270e340e080e310e220e270e340e280e270e010e230e230e210e1b0e230e300e220e380e010e150e4c\
        0e2a0e340e230e340e190e180e23000a00680074007400700073003a002f002f007700770077002e0067006f006f0067006c0065002e0063006f006d002\
        f006d006100700073002f0070006c006100630065002f0e2d0e320e040e320e230e270e340e080e310e220e270e340e280e270e010e230e230e210e1b0e\
        230e300e220e380e010e150e4c0e2a0e340e230e340e190e180e23002f00400037002e0030003000360032003000390039002c003100300030002e00350\
        03000320032003800340032002c00320030007a";
        var response = "IWBP" + type.slice(2, 4) + unicode_raw + '#';
        await socket.write(response);
        return response;
    }
    async tcp_reply_AP00(socket) {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let second = today.getSeconds();

        function toStrFrm(dt_num) {
            if (dt_num < 10) {
                return `0${dt_num}`;
            }
            else {
                return `${dt_num}`;
            }
        }
        year = toStrFrm(year);
        month = toStrFrm(month);
        date = toStrFrm(date);
        hour = toStrFrm(hour);
        minute = toStrFrm(minute);
        second = toStrFrm(second);

        let dt = `IWBP00,${year}${month}${date}${hour}${minute}${second},7#`;

        await socket.write(dt);
        return dt;
    }

    async start_monitor_heartrate(IMEI) {
        var self = this;
        var journal_no =  self.generate_journal_no()
        var data = 'IWBPXL,' + IMEI + ',' + journal_no + '#';
        self.write_custom(IMEI, data)
        console.log(journal_no)
        // var promise = Promise.resolve();
        return new Promise(function(resolve) {
            var timeout = 10000;
            setTimeout(() => {
                self.removeAllListeners(journal_no);
                resolve({type : 'error' , info : 'timeout'});
            }, timeout);

            self.on(journal_no, async function  (data){
                self.removeAllListeners(journal_no);
                resolve(data);
            })
        });

    }

    async start_monitor_SPO2(IMEI) {
        var self = this;
        var journal_no =  self.generate_journal_no()
        var data = 'IWBPXZ,' + IMEI + ',' + journal_no + '#';
        self.write_custom(IMEI, data)
        // return journal_no;
        return new Promise(function(resolve) {
            var timeout = 10000;
            setTimeout(() => {
                self.removeAllListeners(journal_no);
                resolve({type : 'error' , info : 'timeout'});
            }, timeout);

            self.on(journal_no, async function  (data){
                self.removeAllListeners(journal_no);
                resolve(data);
            })
        });
    }

    async start_monitor_body_temp(IMEI) {
        var self = this;
        var journal_no = self.generate_journal_no()
        var data = 'IWBPXT,' + IMEI + ',' + journal_no + '#';
        self.write_custom(IMEI, data)
        return new Promise(function(resolve) {
            var timeout = 10000;
            setTimeout(() => {
                self.removeAllListeners(journal_no);
                resolve({type : 'error' , info : 'timeout'});
            }, timeout);

            self.on(journal_no, async function  (data){
                self.removeAllListeners(journal_no);
                resolve(data);
            })
        });
    }
    //[sos1,sos2,...]
    async send_alert_SOS(IMEI, sos_number) {
        var self = this;
        var journal_no =  self.generate_journal_no()
        var data = 'IWBP12,' + IMEI + ',' + journal_no + ',' + sos_number.join(',') + '#';
        self.write_custom(IMEI, data)
        return new Promise(function(resolve) {
            var timeout = 10000;
            setTimeout(() => {
                self.removeAllListeners(journal_no);
                resolve({type : 'error' , info : 'timeout'});
            }, timeout);

            self.on(journal_no, async function  (data){
                self.removeAllListeners(journal_no);
                resolve(data);
            })
        });
    }

    // [{phone :"",name: ""},{phone :"",name: ""},...]
//แก้ เป็น unicode 

    async create_phonebook(IMEI, phone_list) {
        var self = this;
        var journal_no =  self.generate_journal_no()
        var join = [];// Object.values(obj[0]).join(',');
        for (let index = 0; index < phone_list.length; index++) { // add all sizes to string
            phone_list[index].contact_name = toUnicode(phone_list[index].contact_name);
            join[index] = phone_list[index].contact_name + "|" +phone_list[index].phone_num
            // Object.values(phone_list[index]).join('|');
        };
        var data = 'IWBP14,' + IMEI + ',' + journal_no + ',' + join.join(',') + '#';
        self.write_custom(IMEI, data)
        return new Promise(function(resolve) {
            var timeout = 10000;
            setTimeout(() => {
                self.removeAllListeners(journal_no);
                resolve({type : 'error' , info : 'timeout'});
            }, timeout);

            self.on(journal_no, async function  (data){
                self.removeAllListeners(journal_no);
                resolve(data);
            })
        });
    }

    async setting_working_mode(IMEI,mode,mode8_interval_GPS,mode8_flag_GPS) {
        var self = this;
        var journal_no = self.generate_journal_no()
        if(mode != 8)
            var data = 'IWBP33,' + IMEI + ',' + journal_no + ',' + mode.toString() + '#';
        else
            var data = 'IWBP33,' + IMEI + ',' + journal_no + ',' + mode.toString() + ',' + mode8_interval_GPS + ',' + mode8_flag_GPS + '#';
        self.write_custom(IMEI, data)
        
        return new Promise(function(resolve) {
            var timeout = 10000;
            setTimeout(() => {
                self.removeAllListeners(journal_no);
                resolve({type : 'error' , info : 'timeout'});
            }, timeout);

            self.on(journal_no, async function  (data){
                self.removeAllListeners(journal_no);
                resolve(data);
            })
        });
    }



    async write_custom(IMEI, data) {
        // var self = this;//IWAP00353456789012345#
        console.log(this.client_list_info)
        var objIndex = await this.client_list_info.findIndex(x => (x.IMEI === IMEI));
        if (objIndex == -1) {
            console.log("IMEI incurrect");
            return -1;
        }
        else {
            var write = data;
            this.client_list_info[objIndex].remote_client.write(write);
            return objIndex;
        }
    }

    async find_socket_index(socket) {
        var objIndex = await this.client_list_info.findIndex(x => (x.remote_client.remoteAddress === socket.remoteAddress
            && x.remote_client.remotePort === socket.remotePort));
        return objIndex;
    }

    generate_journal_no () {
        var number = 1000000 * Math.random().toFixed(6);
        return ("000000" + number.toString()).substr(-6)
    }

    toUnicode(str) {
        return str.split('').map(function (value, index, array) {
            var temp = value.charCodeAt(0).toString(16).padStart(4, '0');
            if (temp.length > 2) {
                return /*'\\u' + */temp;
            }
            return value;
        }).join('');
    }
    
};



module.exports = mw_health_bracelet;


/**
 * socket
 * remote_id
 * device_id
 * 
 */