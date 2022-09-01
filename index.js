


const smart_watch = require('./mw_health_bracelet');
const test = new smart_watch(40030);

test.on('disconnect', (input) => {
    console.log(input);
});
test.on('connect', (input) => {
    
    console.log(input);
});
test.on('data', (input) => {
    console.log(input);
});

console.log(test.get_client_list);
