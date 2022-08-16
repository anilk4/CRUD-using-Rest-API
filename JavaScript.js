const express = require('express');  //Import Express
const Joi = require('joi'); //Import Joi
const app = express(); //Create Express Application on the app variable
app.use(express.json()); //used json file


//Give data to the server
const customers = [
    {title: 'Anil', id: 1},
    {title: 'Shahul', id: 2},
    {title: 'Gowrav', id: 3},
    {title: 'Manoj', id: 4},
    {title: 'Jyothi', id: 5},
    {title: 'Pavan', id: 6}
]

//Read Request handlers
// Display the messagae when URL consist of '/'
app.get('/',(req, res) => {
    res.send('Welcome to REST API!');
});
// display the list of customers when the URL consists of api customers
app.get('/api/customers', (req, res)=> {
    res.send(customers);
});

// display the information of specific customer when you mentiin the id
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
// if there is no valid customer ID, then display error with following
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops..we cant find what you RE LOOKING for!</h2>');
    res.send(customer);
});

//create request handler
//create new customer information
app.post('/api/customers', (req, res)=> {

    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    //Increment the customer ID
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    req.send(customer);
});

//update request handler
//update existing customer information
app.put('/api/customers/:id', (req, res)=> {
    const customer = customers.find(c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!</h2>');

    const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    customer.title = req.body.title;
    res.send(customer);
});

//delete request handler
//delete customer details
app.delete('/api/customers/:id', (req, res)=> {

    const customer = customer.find( c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!</h2>');

    const index = customers.indexOf(customer);
    customers.splice(index,1);

    res.send(customer);
});

//Validate information
function validateCustomer(customer) {
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}

//Port environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}...`));
