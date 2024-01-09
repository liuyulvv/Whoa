import axios, { AxiosInstance } from 'axios';

export default class Http {
    private static instance_: Http;
    private http_: AxiosInstance;

    private constructor() {
        this.http_ = axios.create({
            // baseURL: 'https://liuyulvv.com/whoa/api/'
            baseURL: 'http_://localhost:8080'
        });
    }

    public static GetInstance(): Http {
        if (!Http.instance_) {
            Http.instance_ = new Http();
        }
        return Http.instance_;
    }

    public GetToken() {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        } else {
            this.Post('/user/login', {
                username: 'liuyulvv',
                password: 'admin'
            })
                .then((res) => {
                    this.http_.defaults.headers.Authorization = `Bearer ${res.data.token}`;
                    localStorage.setItem('token', res.data.token);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    public Get(url: string, params: object) {
        return this.http_.get(url, params);
    }

    public Post(url: string, params: object) {
        return this.http_.post(url, params);
    }
}
