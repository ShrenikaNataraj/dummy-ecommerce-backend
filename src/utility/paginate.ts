import { ProductOutput } from "../models/Product";

export const paginate = async (model, pageSize, pageLimit, search = {}, order = []) => {
    try {
        const limit = parseInt(pageLimit, 10) || 10;
        const page = parseInt(pageSize, 10) || 1;

        // create an options object
        let options:any = {
            offset: getOffset(page, limit),
            limit: limit,
        };

        // check if the search object is empty
        if (Object.keys(search).length) {
            options = {options, ...search};
        }

        // check if the order array is empty
        if (order && order.length) {
            options['order'] = order;
        }

        // take in the model, take in the options
        let {count, rows}:{count:number, rows:ProductOutput[]} = await model.findAndCountAll(options);

        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            limit: limit,
            data: rows
        }
    } catch (error) {
        console.log(error);
    }
}

const getOffset = (page:number, limit:number):number => {
 return (page * limit) - limit;
}

const getNextPage = (page:number, limit:number, total:number):number => {
    if ((total/limit) > page) {
        return page + 1;
    }

    return null
}

const getPreviousPage = (page:number):number => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}