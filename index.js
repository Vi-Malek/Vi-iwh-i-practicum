const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.MY_HUBSPOT_ACCESS_TOKEN;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req, res) => {
    const id = req.query.id;
    console.log("id", id)
    const lostSocks = `https://api.hubspot.com/crm/v3/objects/p_lost_socks?properties=name,sock_color,time_lost,sock_pair_status`;

    console.log("lostSocks", lostSocks)

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(lostSocks, { headers });
        const data = resp.data.results;
        data.id = id;
        console.log("data", JSON.stringify(data))
        console.log("PRIVATE_APP_ACCESS", PRIVATE_APP_ACCESS)
        res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data});      
    } catch (error) {
        console.error(error);
    }
});



// app.get('/contacts', async (req, res) => {
//     const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
//     const headers = {
//         Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
//         'Content-Type': 'application/json'
//     }
//     try {
//         const resp = await axios.get(contacts, { headers });
//         const data = resp.data.results;
//         res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
//     } catch (error) {
//         console.error(error);
//     }
// });


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            "name":req.body.name, 
            "sock_color":req.body.sock_color, 
            "time_lost":req.body.time_lost, 
            "sock_pair_status":req.body.sock_pair_status,  
        }
    }

    const id = req.body.sockid; // TODO: Create ID in case it is undefined
    console.log("id", id)
    const updatelostSocks = `https://api.hubspot.com/crm/v3/objects/p_lost_socks/${id}`;
   //const updatelostSocks = `https://api.hubspot.com/crm/v3/objects/p_lost_socks/${id}?properties=name,sock_color,time_lost,sock_pair_status&idProperty=hs_object_id`;


    // `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updatelostSocks, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});




/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));