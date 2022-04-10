export class ClientError extends Error {

    /**
     *
     */
    constructor(msg: string) {
        super();
        this.message = msg
    }

    public message: string = ''
}