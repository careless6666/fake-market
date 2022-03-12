import {Adapter, AdapterConstructor, AdapterFactory, AdapterPayload} from "oidc-provider";

const AuthPostgresAdapter: AdapterConstructor = class AuthPostgresAdapter implements Adapter {

    public name: string;

    constructor(name: string) {
        this.name = name;
        return this;
    }

    upsert(id: string, payload: AdapterPayload, expiresIn: number): Promise<void | undefined> {
        return Promise.resolve(undefined);
    }

    find(id: string): Promise<AdapterPayload | void | undefined> {
        return Promise.resolve(undefined);
    }

    findByUserCode(userCode: string): Promise<AdapterPayload | void | undefined> {
        return Promise.resolve(undefined);
    }

    findByUid(uid: string): Promise<AdapterPayload | void | undefined> {
        return Promise.resolve(undefined);
    }

    consume(id: string): Promise<void | undefined> {
        return Promise.resolve(undefined);
    }

    destroy(id: string): Promise<void | undefined> {
        return Promise.resolve(undefined);
    }

    revokeByGrantId(grantId: string): Promise<void | undefined> {
        return Promise.resolve(undefined);
    }
}

export default AuthPostgresAdapter;