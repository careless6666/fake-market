export interface Error {
    message: string
    details: string | null
}

export interface BaseResponse<T> {
    data: T | null,
    error: Error | null
}

type CallbackFunction = () => any;

export class ReponseHelper {
    public static createError(message: string, details: string | null = null) {
        return {
            data: null,
            error: {
                message,
                details
            }
        }
    }

    public static createSuccess<T>(data: T) {
        return {
            data: data,
            error: null
        }
    }

    public static safeCall = (res: any, callback: CallbackFunction)=>{
        try {
            var response = callback()
            res.status(200).json(response);
        } catch(e: any){
            res.status(500).json(ReponseHelper.createError(e.toString()));
        }
    }

    public static safeCallAsync = async (res: any, callback: CallbackFunction)=>{
        try {
            var response = await callback()
            res.status(200).json(response);
        } catch(e: any){
            res.status(500).json(ReponseHelper.createError(e.toString()));
        }
    }
}