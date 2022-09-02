class mw_health_bracelet 
--------------
@ตัวอย่างclass

class mw_health_bracelet {

    // var list_client = [];
    constructor(port) {
        ....
        this.server.on('connection', function (socket) {
            socket.on('data', function (chunk) {
                ...
                emit("connect");
                ...
                emit("data");
            });
            socket.on('close', function () {
                ...
            });
            socket.on('error', function (err) {
                ...
            });
        });
    }

    get_client_list();<br>
    disconnect(index); <br>
    disconnect(ip:port);<br>
    write(ip:port,);

};    


--------------
method
---------

**********
disconnect(index); <br>
disconnect(ip:port); <br>
@description
-   ตัดการเชื่อมต่อกับ device ตาม input ที่ระบุ

@argument
-   index:
-   ip:port

@response (type string)
-   ok : ตัดสำเร็จ
-   no_device : ไม่เจออุปกรณ์ในรายการที่เก็บไว้
-   error : 
**********


**********
get_list_client() <br>
@description
-   แสดงรายการของอุปกรณ์ (client) ที่กำลังเชื่อมต่อกับ Server

@argument


@response (type array json)
-   array json : ข้อมูล array json ดังนี้ <br>
[
    {
        socket:  socket, //(class) <br>
        remote_client: "{ip:port}", //(string)<br>
        device_id: "{device_id}", //(string)<br>
    },
    {
        ...
    }
]

**********

--------------
event
---------

**********

on("connect") (device_info) <br>
@description
-   callback เกิดขึ้นเมื่ออุปกรณ์เชื่อมต่อกับ server


@description(เชิงเทคนิค)
-   ใน constructor ของ TCP จะมี event (socket.on("connect")) ที่รอรับการเชื่อมต่อ TCP socket connection จากโหนด client 
    เมื่อโหนด client เชื่อมกับ server  server จะเก็บ class ของ socket ลงใน json ในรูปแบบ  {socket : socket (class) ,remote_client : "ip:port",device_id : ""} และเก็บก้อน json นี้ลงในรายการ array ของ socket ที่กำลังเชื่อมต่อ
-   เมื่อ server ได้รับข้อมูลแนะนำตนเองจาก device  server จะอัพเดท device_id ลงในรายการ list_client ตาม ip:port ที่ได้รับ

@argument
-   device_info: ข้อมูลชนิด json มีรูปแบบข้อมูลเังนี้ <br>
    {
        socket:  socket, //(class)<br>
        remote_client: "{ip:port}", //(string)<br>
        device_id: "{device_id}", //(string)<br>
    }

**********

**********
on("disconnect") (device_info) <br>
@description
-   callback เกิดขึ้นเมื่อ server ทราบว่า Client หลุดจากการเชื่อมต่อ

@argument
-   device_info: ข้อมูลชนิด json มีรูปแบบข้อมูลเังนี้ <br>
    {
        remote_client: "{ip:port}", //(string)<br>
        device_id: "{device_id}", //(string)<br>
    }

**********


**********
on("data") (payload) <br>

@description
-   callback เกิดขึ้นเมื่อ server ได้รับข้อมูลของ ตำแหน่ง GPS  ข้อมูลค่า sensor การล้ม และ SOS

@argument
-   payload: ข้อมูลชนิด json มีรูปแบบข้อมูลดังนี้ 

**********



<!-- **********

@description

@argument
-   

@response (type string)
-   
********** -->


