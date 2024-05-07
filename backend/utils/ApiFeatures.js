class ApiFeatures {
    constructor(query,queryStr){  //? Here "query" is getting from the "getAllProducts" => Product.find()
        this.query = query;
        this.queryStr = queryStr; //? Here "queryStr" is keyword given by user for searching item in URL after "?", keyword value would be picked for use
    }

    searchItem(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword, //? Here we will use "Mongo_DB" regex expression for searching
                $options:"i"                   //?here "i"  means case insensitive search (if you type "car"), it will search car with Capital and Smaller letters.
                
            }
        }:{};
        console.log("Keyword: ",keyword);

        //? Now we will replace the "this.query"  with our new finded item/keyword.
        this.query = this.query.find({...keyword})
        return this
    }
    //! Now we will call this "searchItem()" function
}


module.exports = ApiFeatures;