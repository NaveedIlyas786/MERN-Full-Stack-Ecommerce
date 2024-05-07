class ApiFeatures {
  constructor(query, queryStr) {
    //? Here "query" is getting from the "getAllProducts" => Product.find()
    this.query = query;
    this.queryStr = queryStr; //? Here "queryStr" is keyword given by user for searching item in URL after "?", keyword value would be picked for use
  }

  searchItem() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //? Here we will use "Mongo_DB" regex expression for searching
            $options: "i", //?here "i"  means case insensitive search (if you type "car"), it will search car with Capital and Smaller letters.
          },
        }
      : {};
    // console.log("Keyword: ",keyword); // for testing or we can say checking the searching

    //? Now we will replace the "this.query"  with our new finded item/keyword.
    this.query = this.query.find({ ...keyword });
    return this;
  }
  //! Now we will call this "searchItem()" function in "ProductController.js"

  filterByCategory() {
    const queryCopy = { ...this.queryStr }; //? we know that "this.queryStr" is an object, and in javascript all objects are passed through refernce. therefore we use spread operator to get actual value
    //    console.log("queryCopy",queryCopy); //Before
    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"]; //? b/c keyword is used in url, there we don't need it
    removeFields.forEach((key) => delete queryCopy[key]);
       console.log("queryCopy",queryCopy);  //After

    // Now time to return

    this.query = this.query.find(queryCopy); //? queryCopy already is an object, so there is no need of using spread operator, pass it directly
    return this;

    //! Here it is case-sensitive, which is right b/c at frontend side we are providing this category name directly to users for choice
  }
}

module.exports = ApiFeatures;
