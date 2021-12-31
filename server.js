const express = require('express'),
    app = express(),
    fs = require('fs'),
    orderData = require('./orders');
    PORT = process.env.PORT || 3000;
    swaggerUi = require('swagger-ui-express');
    apiDocumentation = require('./api-doc.json');


app.get('/',(request,response)=>{
 response.send('Welcome to our simple online order managing web app!');
});

// API Documentation
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(apiDocumentation));

//Add the /orders code here!
app.get('/orders',(request,response)=>{
 response.json(orderData);
});

//Add the /neworder code here!
app.post('/neworder', express.json(), (request,response)=>{
 orderData.orders.push(request.body);
 fs.writeFileSync('orders.json', JSON.stringify(orderData));
 response.send("Success")
 console.log("Success");
});

//Add the /update/:id code here!
app.put('/update/:id', express.text({type: '*/*'}), (request,response)=>{
    var items = orderData.orders

    items.forEach(function(o) {
        console.log(o)
        if (o.id == request.params.id){
        console.log('Modifying order!')
        o.state = request.body; 
        }  
        });

    fs.writeFileSync('orders.json', JSON.stringify(orderData));

    response.send('Success');
    console.log('Success');
});

//Add the /delete/:id code here!
app.delete('/delete/:id', (request,response)=>{
    var items = orderData.orders
    var newData = {"orders": []}
    items.forEach(function(o) {
    console.log(o)
        if (o.id == request.params.id){
        console.log('Deleting order!') 
        } else{
        newData.orders.push(o)
        }
    });
    
    fs.writeFileSync('orders.json', JSON.stringify(newData));
    response.send('Success');
    console.log('Success');
});

app.listen(PORT,()=>{
 console.log(`Express server started at port ${PORT}`);
});