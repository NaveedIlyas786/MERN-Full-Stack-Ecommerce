class ApiFeatures {
  constructor(query, queryStr) {
    //? Here "query" is getting from the "getAllProducts" => Product.find()
    this.query = query
    this.queryStr = queryStr //? Here "queryStr" is keyword given by user for searching item in URL after "?", keyword value would be picked for use
  }

  searchItem() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //? Here we will use "Mongo_DB" regex expression for searching
            $options: 'i', //?here "i"  means case-insensitive search (if you type "car"), it will search car with Capital and Smaller letters.
          },
        }
      : {}
    // console.log("Keyword: ",keyword); // for testing or we can say checking the searching

    //? Now we will replace the "this.query"  with our new finded item/keyword.
    this.query = this.query.find({ ...keyword })
    return this
  }
  //! Now we will call this "searchItem()" function in "ProductController.js"

  filterByCategory() {
    const queryCopy = { ...this.queryStr } //? we know that "this.queryStr" is an object, and in javascript all objects are passed through refernce. therefore we use spread operator to get actual value
    //    console.log("queryCopy",queryCopy); //Before
    // Removing some fields for category
    const removeFields = ['keyword', 'page', 'limit'] //? b/c keyword is used in url, there we don't need it
    removeFields.forEach((key) => delete queryCopy[key])
    // console.log("queryCopy", queryCopy); //After

    //? Filter For Price and Rating

    let queryToStr = JSON.stringify(queryCopy) //? converting object to string
    queryToStr = queryToStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

    //? converting again to object we follow (JSON.parse())
    // Now time to return

    this.query = this.query.find(JSON.parse(queryToStr)) //? queryCopy already is an object, so there is no need of using spread operator, pass it directly
    // console.log("queryToStr", queryToStr); //After convert to object
    return this

    //! Here it is case-sensitive, which is right b/c at frontend side we are providing this category name directly to users for choice
  }

  pagenation(ItemsPerPage) {
    //? Here "queryStr" means the extra address appears in URL page
    const currentPage = Number(this.queryStr.page) || 1 //? Here we set default page 1 if user not give page number, and here "this.queryStr.page" we convert this string digit to number

    const skipedItems = ItemsPerPage * (currentPage - 1)
    this.query = this.query.limit(ItemsPerPage).skip(skipedItems) //? Here first items would be skipped "skip" function is mentioning this functionality
    return this
  }
}

module.exports = ApiFeatures
