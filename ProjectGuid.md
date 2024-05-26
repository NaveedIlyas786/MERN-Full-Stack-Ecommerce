<!-- TODO: *** Setting up the backend in backend folder *** -->

*******************   Setup  & Product Routing     *******************

1) set Server settings (*Server.js*,*App.js*)

2) add additional things in Scripts in package.json file ==>
  "start":"node backend/Server.js",  // for server starting at production time
  "dev":"nodemon backend/Server.js"  // Automatically server starting for development time

3) Add "controller" & "routes" folders and related files for controlling the routes

4) import all routes in App.js file

5) Connect MongoDB with Server, Create  *Mydatabase.js* (You can give him any file_name) in config folder

6) import *connectDatabase()* from *Mydatabase.js* file and call it after *dotenv.config* line

7) Start Making Product Api's now, means *Product Model or Product Schema*, So create folder "models" and  "ProductModel.js" file into it, after it import it in "ProductController.js" then "createProduct" there and then import it in "ProductRoute"

8) Till Now we build CRUD Apis of product, and also test them. 

*******************   Error Handling For Backend    *******************
Q: Why we need it ?
Ans: look we have to set the condition (once yaani 1 bar) for error handling in just one file, and we can use it everywhere for same errors.
doing this, we don't need to set same condition again and again in file. it will handle backend error itself.

9) 1st type error *("ErrorHandler")*: Make folder for it *utils* in backend folder and "ErrorHandler" file into it, We set their "class" for settlement of errors and import it in "middleware" folder *error.js* file, and after that finally we set the *Middleware for Error* in app.js file

10) Now we are replacing *ErrorHandler* with others if else condition for specific error in *ProductController* file

11) 2nd type error *("catchAsyncErrors")*:  Now We shall also set enviroment for *async* error handling, because it is said whenever you used *async* then you should must use "try-catch" b/c it is good practice

12) Create file *catchAsyncErrors* and wrap async functions with it in *ProductController* file like *catchAsyncErrors(async ()=>{})*

13) 3rd type error *("unhandled promise rejection")*:  There is also an error exist, suppose if we change string in "config.env" file, so here we also hand;e this error
    this type of error called *unhandled promise rejection*, and it is related to "MongoDB" connection
    such as: *Connection Error is:  MongoParseError: Invalid connection string* in this case our server didn't crash completely,
    So we have to crash our server completely in this case, taky insult na ho hamari(hahahaha)

14) so, goto *Server.js* file at the very bottom and create the logic code for shutting down the server.

15) 4th type error (unCaught Error): It occurs when we use that variable which is not defined!

16) For it goto *Server.js* file at the very top

17) 5th type error (MongoDB Error => Cast to ObjectId failed for value \"66255de2cb2dde\"): It occurs when we give the id inappropriate means uncomplete for getting specific product

18) So, goto *error.js* file and create logic there "Wrong MongoDB id Error"


   <!-- TODO: *** Search, Filter & Pagination at backend side *** -->

                    <!-- TODO: *** Search *** -->

19) Make file in *utils* with name *ApiFeatures.js*, where we define the class for searching and import it in *ProductController.js* file

20) Make *searchItem()* function in *ApiFeatures.js*, for searching and called it in *ProductController.js* file right after new object creation of class *ApiFeatures(Product.find(), req.query)*

21) Now test it on Postman giving *keyword and value* using params option there, After Confirm move on

                <!-- TODO: *** Filter *** -->

21) Make *filterByCategory()* function in *ApiFeatures.js*, for Filering and called it in *ProductController.js* file right after new object creation of class *ApiFeatures(Product.find(), req.query)* 

22) Now in *filterByCategory()* function we also apply the Filtering system by *Price and Rating* also, using this approach we can filter products base on price and rating, and checked on postman
                                
                               
                <!-- TODO: *** Pagenation *** -->

Now we also apply the pagenation to set limited count of items on page,

23) Now in *ApiFeatures* class we also apply pagenation system by defining *pagenation* function

24) define *ItemsPerPage* variable in *ProductController.js* file in *getAllProducts* function, and pass it in pagenation function as argument where *pagenation* function in *ProductController.js* is called !

              
         <!-- TODO: *** Authentication Admin Routes (User & Password Authentication) *** -->
             
25) first in *models* folder we have to make "UserModels" file with name *UserModels.js* where user model would be defined

26) After it, in *controllers* folder we shall define the Controller with file name *UserController.js*, where user would be controlled

27) then finally, in "routes" folder we set the User routes in  *UserRoutes.js* file,

28) And in *utils* folder we also define the jwtToken function in *jwtToken.js* file to send the jwt token where it is reuired

29) Now we are going to implement a user that would access the specific actions or items when he would logged in, So make file with name *auth.js* in middleware folder 

30) In (UserController, UserModels, UserRoutes) we implement there 29 point,still here we set the law for loginUser(a user can be anyone) to do somthing in just mentioned routed in *ProductRoutes.js* file, but now we are going to implement for Admin, means what what the Admin can do?

31) we define the function *authorizedRole(admin)* in *auth.js* file to set which autrized things we want to assign to user with *userRole* => *admin*, (create product, delete , update etc), and set it in ProductRoutes

32) So, Now if you have partners with *userRole* admin, then it is necessary to know which admin created the product, so we have to pass that id of admin who created the product in new product created object

33) We passed the the *user id* in new created "product" object by creating new property "user" in *ProductModel* and setting it before sending the request of creating the product in *ProductController.js* file


                      <!-- TODO: *** Reset password Token *** -->

34) in *userModel.js* file make function *getResetPasswordToken* for Password Reset, and sending the token through *Node Mailor*

35) in *userController.js* file make function of *forgotPassword*, in this we have to find the *user* from *database* using his/her email, and then we get the *reset Token* by calling the *getResetPasswordToken* function, and save it.

36) After this, we have to prepare the link using *NodeMailor*, which has to be sent at the email for *password reset*, and options, means required structure information for sending email such as (email, subject, message) etc.

37) Then we have to make function *sendEmail* in utils *sendEmail.js* file, and there we set the *all Credentials* and configurations to send email, most important is that use *App password* of that email which is set *from* section, means from which person email has to be sent, email of that person.

38) After testing it on postman, our email is sending successfully, Now we have obtained our *Reset Password Token* , and now we will make *request* on this token to proceed, so we shall make method for it.

39) Ofcourse we shall get this link from URL bar means from params, And we shall *hash* it first after getting from params. and then we shall find the *user* from *mongoDb* database, and change its password with requested password, and save it, then also loggedin the user at the same by calling the function *sendToken* function. Now we shall set its route path also for its utilization. and then check it in postman

40) Now one thing is remaining, if user try to *register* with the *same email* again, then he get the message unusual, So we have to set the response message to understand in a better way. So, goto folder *middleware* in *error.js* file: and set there the logic for duplication email registeration.

41) Till here we have *completed* the *Backend User Authentication* in all cases


                        <!-- TODO: *** Backend User Routes Api's Start*** -->
   ***Means If user want to check his profile info, update it or password Update etc***

42) Here we shall make function "getUserDetails" to get user details and set the route in userRoutes (for logged in user)

43) After this we shall make function "UpdatePassword" to update user password and set the route in userRoutes (for logged in user)

44) Now we make function *UpdateProfile* for update the user Profile (all information except password) and set the route in *userRoutes*

    ***Handover the authority to Admin to take action over "Users and Products" also***

 Means we add the *admin* word in api of create new,update,delete product, which means only admin can do this.

45) We make functions like *UpdateUserRole* and *DeleteUser* and set their route paths in *UserRoutes.js* file and this action only can do the Admin, means Only through Admin

  ***Make function that any user can (add,update) the Reviews of products and Avergae of all reviews***

46) Make functions *creatProductReview, getAllProductReviews, deleteUserReviews* in *ProductController.js* file and set their routes in *ProductRoutes.js* and finally done.


                      <!-- TODO: *** Backend User Routes Api's End*** -->

              <!-- TODO: *** Backend Controller Order Routes Api's Start*** -->

























              