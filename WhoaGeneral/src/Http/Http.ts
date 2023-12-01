import axios, { AxiosInstance } from 'axios';

export default class Http {
    private static instance: Http;
    private http: AxiosInstance;
    private Authorization: string | undefined;

    private constructor() {
        this.http = axios.create({
            baseURL: 'https://liuyulvv.com/whoa/api/'
        });
        if (this.Authorization) {
            this.http.defaults.headers.Authorization = this.Authorization;
        }
    }

    public static get(): Http {
        if (!Http.instance) {
            Http.instance = new Http();
        }
        return Http.instance;
    }

    public GetToken() {}

    public Get(url: string, params: object) {
        return this.http.get(url, params);
    }

    public Post(url: string, params: object) {
        return this.http.post(url, params);
    }
}
