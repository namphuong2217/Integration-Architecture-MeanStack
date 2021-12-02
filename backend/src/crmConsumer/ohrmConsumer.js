const axios = require('axios');

const getToken = () => {
    return axios({
        method: 'post',
        url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken',
        data: {
            client_id: 'api_oauth_id',
            client_secret: 'oauth_secret',
            grant_type: 'password',
            username: 'demouser',
            password: '*Safb02da42Demo$'
        }
    });
}

const makeHeader = async() => {
    const body = await getToken();
    const token = await body.data.access_token;
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
}

const header = makeHeader();

const hrmCreate = async(url, body) => {
    const res = await axios.post(url, body, await header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}

exports.hrmRead = async(url) => {
    const res = await axios.get(url, await header)
        .catch((error) => {
            console.log(error);
        })
    /* TESTCOMMENT*/
    return res;
}

const hrmUpdate = async(url, body) => {
    const res = await axios.put(url, body, await header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}

const hrmDelete = async(url) => {
    const res = await axios.delete(url, await header)
        .catch((error) => {
            console.log(error);
        })

    return res.data;
}