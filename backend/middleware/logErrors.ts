export function logErrors(err:any, req: any, res: any) {
    /*
    res.status(500).send({ 
        error: err,
        stack: err.stack
    });
    */

    res.status(500).send({ 
            error: err,
            errorStack: err.stack
        });
      
  }