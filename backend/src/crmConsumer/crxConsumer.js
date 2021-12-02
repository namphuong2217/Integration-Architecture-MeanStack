const axios = require('axios');

const header = {
    'Content-Type': 'application/json',
    auth: {
        username: 'guest',
        password: 'guest'
    }
}

const crxCreate = async(url, body) => {
    const res = await axios.post(url, body, header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}

const crxRead = async(url) => {
    const res = await axios.get(url, header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}

const crxUpdate = async(url,body) => {
    const res = await axios.put(url, body, header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}

const crxDelete = async(url) => {
    const res = await axios.delete(url, header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}