

class APXX_format {
    constructor() { }
    C2json_AP00(data) {
        return {
            type: data.substring(2, 6),
            IMEI: data.substring(6, 21)
        };
    };

    C2json_AP01(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            date: a_data[0].substring(6, 12),
            GPS_state: a_data[0].substring(12, 13),
            lat: {
                degree: a_data[0].substring(13, 15),
                point: a_data[0].substring(15, 22),
                direction: a_data[0].substring(22, 23),
            },
            long: {
                degree: a_data[0].substring(23, 26),
                point: a_data[0].substring(26, 33),
                direction: a_data[0].substring(33, 34),
            },
            speed: a_data[0].substring(34, 39),
            time: a_data[0].substring(39, 45),
            direction: a_data[0].substring(45, 51),
            GSM_signal: a_data[0].substring(51, 54),
            satellites_number: a_data[0].substring(54, 57),
            battery_level: a_data[0].substring(57, 60),
            remaining_space: a_data[0].substring(60, 61),
            fortification_state: a_data[0].substring(61, 63),
            working_mode: a_data[0].substring(63, 65),
            // LBS,
            MCC: a_data[1],
            MNC: a_data[2],
            LAC: a_data[3],
            CID: a_data[4],
            wifi_info: []
        };
        a_data[5] = a_data[5].slice(0, -1)
        var a_wifi = a_data[5].split('&')
        for (let index = 0; index < a_wifi.length; index++) {
            var a_info = a_wifi[index].split('|');
            json["wifi_info"][index] = {
                ssid: a_info[0],
                mac: a_info[1],
                rssi: a_info[2],

            }
        }
        return json;
    };

    C2json_AP02(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            language_notice: a_data[1],
            reply_flag: a_data[2],
            sets_of_bases: parseInt(a_data[3]),
            MCC: a_data[4],
            MNC: a_data[5],
            base_info: [],
            sets_of_wifi: 0,
            wifi_info: []
        };
        for (let index = 0; index < json.sets_of_bases; index++) {
            var a_info = a_data[6 + index].split('|');
            json["base_info"][index] = {
                LAC: a_info[0],
                CID: a_info[1],
                rssi: a_info[2],

            }
            // json["base_info"][index] = a_data[6 + index]
        }
        // json["wifi_info"] = a_data
        json.sets_of_wifi = parseInt(a_data[6 + json.sets_of_bases]);
        var a_wifi = a_data[7 + json.sets_of_bases].split('&')
        for (let index = 0; index < a_wifi.length; index++) {
            var a_info = a_wifi[index].split('|');
            json["wifi_info"][index] = {
                ssid: a_info[0],
                mac: a_info[1],
                rssi: a_info[2],

            }
        }
        return json;
    };

    C2json_AP03(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            GSM_signal: a_data[1].substring(0, 3),
            satellites_number: a_data[1].substring(3, 6),
            battery_level: a_data[1].substring(6, 9),
            remaining_space: a_data[1].substring(9, 10),
            fortification_state:
            {
                device_is_invalid: a_data[1][10],
                night_light: a_data[1][11],
            },
            working_mode: a_data[1].substring(12, 14),
            counting_steps: a_data[2],
            rolls_frequency: a_data[3],
        };


        return json;
    };

    C2json_AP07(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            datetime: a_data[1],
            number_of_audio_data: parseInt(a_data[2]),
            sequence: parseInt(a_data[3]),
            length: parseInt(a_data[4]),
            data: a_data[5],
        };


        return json;
    };

    C2json_AP10(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            date: a_data[0].substring(6, 12),
            GPS_state: a_data[0].substring(12, 13),
            lat: {
                degree: a_data[0].substring(13, 15),
                point: a_data[0].substring(15, 22),
                direction: a_data[0].substring(22, 23),
            },
            long: {
                degree: a_data[0].substring(23, 26),
                point: a_data[0].substring(26, 33),
                direction: a_data[0].substring(33, 34),
            },
            speed: a_data[0].substring(34, 39),
            time: a_data[0].substring(39, 45),
            direction: a_data[0].substring(45, 51),
            GSM_signal: a_data[0].substring(51, 54),
            satellites_number: a_data[0].substring(54, 57),
            battery_level: a_data[0].substring(57, 60),
            remaining_space: a_data[0].substring(60, 61),
            fortification_state: a_data[0].substring(61, 63),
            working_mode: a_data[0].substring(63, 65),
            // LBS,
            MCC: a_data[1],
            MNC: a_data[2],
            LAC: a_data[3],
            CID: a_data[4],
            alarm_state: a_data[5],

            language: a_data[6],
            flag_reply: parseInt(parseInt(a_data[7]) / 10),
            mobile_hyperlink_is_contained: parseInt(a_data[7]) % 10,
            wifi_info: []
        };
        var a_wifi = a_data[8].split('&')
        for (let index = 0; index < a_wifi.length; index++) {
            var a_info = a_wifi[index].split('|');
            json["wifi_info"][index] = {
                ssid: a_info[0],
                mac: a_info[1],
                rssi: a_info[2],

            }

            // json["wifi_info"][index] = a_info
            // json["wifi_info"][index] = a_wifi[index]
        }
        return json;
    };

    C2json_AP49(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            heart_rate: a_data[1],
        };

        return json;
    };

    C2json_APHT(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            heart_rate: a_data[1],
            bp: {
                systolic: a_data[2],
                diastolic: a_data[3],
            }
        };

        return json;
    }

    C2json_APHP(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            heart_rate: a_data[1],
            bp: {
                systolic: a_data[2],
                diastolic: a_data[3],
            },
            SPO2: a_data[4],
            blood_sugar: a_data[5],


        };

        return json;
    }

    C2json_AP50(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            body_temp: a_data[1],
            battery_level: a_data[2],


        };

        return json;
    }

    C2json_ECG(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            datetime: a_data[1],
            number_of_packets: a_data[2],
            gain: a_data[4],
            point_voltage: a_data[5],
            lead_number: a_data[6],
            sampling_rate: a_data[7],
            data_length: a_data[8],
            sequence: a_data[3],
            data: a_data[9],


        };

        return json;
    }

    C2json_BP12(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
            SOS_number1: (a_data[2]),
            SOS_number2: (a_data[3]),
            SOS_number3: (a_data[4]),
        };


        return json;
    }

    C2json_AP14(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
            phone_book: [],
        };
        for (let index = 2; index < a_data.length - 2; index++) {
            var info_phone = a_data[index].split('|');
            json["phone_book"][index - 2] = {
                name: info_phone[0],
                phone_number: info_phone[1],
            }
        }

        return json;
    }

    C2json_AP16(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

    C2json_BP12(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
            SOS_number1: (a_data[2]),
            SOS_number2: (a_data[3]),
            SOS_number3: (a_data[4]),
        };


        return json;
    }

    C2json_AP14(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
            phone_book: [],
        };
        for (let index = 2; index < a_data.length - 2; index++) {
            var info_phone = a_data[index].split('|');
            json["phone_book"][index - 2] = {
                name: info_phone[0],
                phone_number: info_phone[1],
            }
        }

        return json;
    }

    C2json_AP16(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

    C2json_AP28(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            UNICODE: a_data[1],
            add_data: a_data[2],
            number_of_packet: a_data[3],
            sequence: a_data[4],
            flag_received: a_data[5], //is device have received the audio data，

        };

        return json;
    }

    C2json_AP33(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
            flag_GPS: a_data[2], //1: is mean GPS is ON and if it is 0 mean GPS off

        };

        return json;
    }

    C2json_AP84(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
            flag_white_list: a_data[2], //1: white list on 0: white list off

        };

        return json;
    }

    C2json_AP85(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            UNICODE: a_data[1],
            master_sw_for_all_alarm: a_data[2], //1 is on，0 is off
            total_alarm: a_data[3],
            info_alarm: []
            // list_alarm:data.substring(20, data.length)
        };
        let list_alarm = data.substring(20, data.length);
        list_alarm = list_alarm.split('@')
        for (let index = 0; index < json.total_alarm; index++) {
            let element = list_alarm[index].split(',');
            json.info_alarm[index] = {
                reminder_time: element[0],
                reminder_day: element[1], //135 mean Monday,Wednesday,Friday ，24 hour system
                reminder_switch: element[2],
                reminder_type: element[3],
                /*
                1 Take the medicine reminder
                2 Drink water reminder
                3 A sedentary reminder*/

            }

        }
        return json;
    }

    C2json_AP86(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

    C2json_APXL(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

    C2json_APXY(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

    C2json_APXT(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

    C2json_APXT(data) {
        var a_data = data.split(',');
        var json = {
            type: a_data[0].substring(2, 6),
            journal_no: a_data[1],
        };

        return json;
    }

}

module.exports = APXX_format;
