export const ExecuteQuery = async (ctx, q) => {
    const { vars, query, returnFn, errorFn } = q;
    if (!query || !returnFn) {
        return undefined;
    }

    const client = ctx.apolloClient;
    const res = await client.query({
        query: query,
        variables: vars ? vars :{},
    }).catch(error => {return errorFn(error)});

    return returnFn(res.data, res.error);
}
export const ExecuteQueryAsync = async (ctx, q) => {
    const { vars, query, returnFn, errorFn } = q;

    if (!query || !returnFn) {
        return undefined;
    }

    const client = ctx.apolloClient;
    return client.query({
        query: query,
        variables: vars ? vars :{},
    })
    .then(res => returnFn(res.data, res.error))
    .catch(error => {return errorFn(error)});
}

const DefaultReturnFn = (data, error) => { return data ? data.result : undefined; }
const DefaultErrorFn = (error) => { console.log(error); return error; }

// PrepareQuery prepares the query to be feed in "Execute..." function 
export const PrepareQuery = (vars, query, returnFn = DefaultReturnFn, errorFn = DefaultErrorFn) => {
    return {
        vars: vars,
        query: query,
        returnFn: returnFn,
        errorFn: errorFn,
    };
}

// PrepareQuery prepares the query with a key to be feed in "Execute..." function 
export const PrepareKeyQuery = (key, vars, query, returnFn = DefaultReturnFn, errorFn = DefaultErrorFn) => {
    let q = PrepareQuery(vars, query, returnFn, errorFn);
    q.key = key;
    return q
}

// ExecuteQueryBatch executes a batch of query identified by keys
// the returned object maps each query result to the provided key
// input: Array<{ key, vars, query, returnFn, errorFn }>
// output: Object{key: result} 
export const ExecuteQueryBatch = async (ctx, queries) => {
    let results = {};
    (await ExecuteQueries(ctx, queries)).forEach((r, i) => { 
        results[queries[i]["key"]] = r;
    });
    return results;
}

// ExecuteQueries executes a batch of query and returns an array of responses
// input: Array<{ vars, query, returnFn, errorFn }>
// output: Array<result> 
export const ExecuteQueries = async (ctx, queries) => {
    const promises = queries.map( q => {
        return ExecuteQueryAsync(ctx, q);
    });
    return await Promise.all(promises);
}