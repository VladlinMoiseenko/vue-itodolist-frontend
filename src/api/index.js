import axios from 'axios';

const mainUrl = 'http://apitdlist.vladlin.ru/v1/';

const apiCall = ({url, method, token, ...args}) => new Promise((resolve, reject) => {
    setTimeout(() => {

        if (!!token) axios.defaults.headers.common['Authorization'] = token;

        try {
            JSON.stringify(args.data);

            resolve(axios({
                method: method,
                url: mainUrl+url,
                data: args.data,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
                ).then((response) => {
                    return response.data
                })
                .catch(function (error) {
                    return 'error'
                })
            );

        } catch (err) {
            reject(new Error(err))
        }
    }, 1000)
});

export default apiCall